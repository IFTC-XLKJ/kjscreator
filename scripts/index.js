const Logger = iftc.Logger;
const sober = globalThis.sober;
const { Dialog } = sober;
TemplateHTML.baseUrl = "file://" + iftc.__dirname + "/templates/";

async function main() {
    await TemplateHTML.getTemplate("choose_kubejs_dir");
    Logger.info("App initialized");

    add_project.addEventListener("click", () => {
        const dialog = Dialog.builder({ headline: '添加项目', view: TemplateHTML.templates.choose_kubejs_dir });
    });
}
main();