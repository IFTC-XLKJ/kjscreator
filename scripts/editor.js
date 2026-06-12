const params = new URLSearchParams(window.location.search);
const uuid = params.get('uuid');
const name = params.get('name');
const path = params.get('path');

console.log("Editor Window Params:", { uuid, name, path });

const { Logger } = iftc;
const workspaceEditors = {};

Logger.info("Editor Window Started");
const workspaceOptions = {
    toolbox: toolbox,
    collapse: true,
    css: true,
    grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        includeInstructions: false,
    },
    modalInputs: false,
    move: {
        scrollbars: {
            horizontal: true,
            vertical: true,
        },
        drag: true,
        wheel: true,
    },
    scrollbars: true,
    trashcan: false,
    renderer: 'zelos',
    media: 'scripts/blockly/media/',
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 4,
        minScale: 0.25,
        scaleSpeed: 1.1,
    },
};
// 初始化Blockly
// const workspace = Blockly.inject('blocklyDiv', workspaceOptions);

function newEditor() {
    if (!workspaces) {
        Logger.error("Workspaces container not found!");
        return;
    }

    const workspaceDiv = document.createElement('div');
    workspaces.appendChild(workspaceDiv);
    workspaceDiv.className = 'workspace';
    // workspaceDiv.style.width = '100vw';
    // workspaceDiv.style.height = 'calc(100vh - 64px)';
    const uuid = iftc.uuidv4();
    workspaceDiv.id = `workspace_${uuid}`;
    const workspace = Blockly.inject(`workspace_${uuid}`, workspaceOptions);
    workspaceEditors[uuid] = workspace;
    Logger.info(`New Editor Created: ${uuid}`);
    return { uuid, workspace };
}

newEditor();