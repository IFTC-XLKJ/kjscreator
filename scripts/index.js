const { Logger } = iftc;
const sober = globalThis.sober;
const { Dialog, Snackbar } = sober;
TemplateHTML.baseUrl = "file://" + iftc.__dirname + "/templates/";

async function main() {
    await TemplateHTML.getTemplate("choose_kubejs_dir");
    await TemplateHTML.getTemplate("kubejs_project_item");
    Logger.info("App initialized");

    add_project.addEventListener("click", () => {
        const choose_kubejs_dir = TemplateHTML.templates.choose_kubejs_dir;
        const dialog = Dialog.builder({ headline: '添加项目', view: choose_kubejs_dir });
        const target_kubejs_dir = choose_kubejs_dir.querySelector("#target_kubejs_dir");
        target_kubejs_dir.addEventListener("click", async () => {
            const result = await iftc.chooseDirectory({ title: "请选择KubeJS目录" });
            Logger.info("chooseDirectory result: " + result);
            target_kubejs_dir.textContent = result || "未选择";
            choose_kubejs_dir.dataset.directory = result || "";
            if (!result) return target_kubejs_dir.style.color = "black";
            if (await checkIsKubeJSDir(result)) {
                target_kubejs_dir.style.color = "green";
            } else {
                target_kubejs_dir.style.color = "red";
            }
        });
        const kubejs_project_name = choose_kubejs_dir.querySelector("#kubejs_project_name");
        const confirmButton = choose_kubejs_dir.querySelector("#confirm");
        confirmButton.addEventListener("click", async () => {
            const dir = choose_kubejs_dir.dataset.directory;
            if (!dir) {
                Logger.warn("未选择KubeJS目录");
                Snackbar.builder({ type: "warning", text: "请选择KubeJS目录" });
                return;
            }
            if (!kubejs_project_name.value) {
                Logger.warn("请输入项目名");
                Snackbar.builder({ type: "warning", text: "请输入项目名" });
                return;
            }
            if (await checkIsKubeJSDir(dir)) {
                try {
                    const projectsFile = iftc.File("projects.json");
                    const projects = JSON.parse(await projectsFile.readText());
                    if (projects.some(p => p.path === dir)) {
                        Logger.warn("项目已存在");
                        Snackbar.builder({ type: "warning", text: "项目已存在" });
                        return;
                    }
                    projects.push({
                        name: kubejs_project_name.value,
                        path: dir,
                        uuid: iftc.uuidv4()
                    });
                    await projectsFile.write(JSON.stringify(projects, null, 2));
                    Logger.info("添加项目成功");
                    Snackbar.builder({ type: "success", text: "添加项目成功" });
                    dialog.showed = false;
                    setTimeout(() => {
                        dialog.remove();
                    }, 1000);
                    // const projects = await getProjectList();
                    renderProjectList(projects);
                } catch (error) {
                    Logger.error("Error writing projects.json: " + error);
                    Snackbar.builder({ type: "error", text: "添加项目失败" });
                    return;
                }
            } else {
                Logger.warn("添加项目失败");
                Snackbar.builder({ type: "error", text: "选择的目录不是KubeJS目录" });
            }
        });
    });

    const projects = await getProjectList();
    renderProjectList(projects);

    async function checkIsKubeJSDir(path) {
        const dir = iftc.File(path);
        const kubejsDirs = [
            'assets',
            'client_scripts',
            'config',
            'data',
            'server_scripts',
            'startup_scripts'
        ];
        for (const subdir of kubejsDirs) {
            const subDirPath = path + '/' + subdir;
            const subDir = iftc.File(subDirPath);
            try {
                const exists = await subDir.exists();
                console.log(`Checking directory ${subDirPath}: ${exists}`);
                if (!exists) {
                    return false;
                }
            } catch (error) {
                Logger.error(`Error checking directory ${subDirPath}: ${error}`);
                return false;
            }
        }
        return true;
    }
    async function getProjectList() {
        const projectsFile = iftc.File("projects.json");
        if (!await projectsFile.exists()) {
            Logger.warn("projects.json not found, creating a new one");
            await projectsFile.write(JSON.stringify([], null, 2));
            return [];
        }
        try {
            const projects = JSON.parse(await projectsFile.readText());
            Logger.info("projects.json loaded");
            return projects;
        } catch (error) {
            Logger.error("Error loading projects.json: " + error);
            return [];
        }
    }

    async function renderProjectList(list) { }
}
main();