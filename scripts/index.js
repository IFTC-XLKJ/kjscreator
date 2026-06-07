const { Logger } = iftc;
const sober = globalThis.sober;
const { Dialog } = sober;
TemplateHTML.baseUrl = "file://" + iftc.__dirname + "/templates/";

async function main() {
    await TemplateHTML.getTemplate("choose_kubejs_dir");
    Logger.info("App initialized");

    add_project.addEventListener("click", () => {
        const choose_kubejs_dir = TemplateHTML.templates.choose_kubejs_dir;
        const target_kubejs_dir = choose_kubejs_dir.querySelector("#target_kubejs_dir");
        target_kubejs_dir.addEventListener("click", async () => {
            const result = await iftc.chooseDirectory({ title: "请选择KubeJS目录" });
            Logger.info("chooseDirectory result: " + result);
            target_kubejs_dir.textContent = result || "未选择";
            choose_kubejs_dir.dataset.directory = result || "";
        });
        const dialog = Dialog.builder({ headline: '添加项目', view: choose_kubejs_dir });
    });

    function checkIsKubeJSDir(path) {
        const dir = iftc.File(path);
    }
}
main();