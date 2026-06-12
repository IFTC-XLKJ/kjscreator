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

function newEditor(file) {
    if (!workspaces) {
        Logger.error("Workspaces container not found!");
        return;
    }
    const workspaceDiv = document.createElement('div');
    workspaces.appendChild(workspaceDiv);
    workspaceDiv.className = 'workspace';
    const uuid = iftc.uuidv4();
    workspaceDiv.id = `workspace_${uuid}`;
    const workspace = Blockly.inject(`workspace_${uuid}`, workspaceOptions);
    workspaceEditors[uuid] = {
        workspace: workspace,
        workspaceDiv: workspaceDiv
    };
    Logger.info(`New Editor Created: ${uuid}`);
    workspaceDiv.style.display = 'none';
    return { uuid, workspace, workspaceDiv };
}

async function renderFilesTree() {
    const startupFiles = await iftc.File(path + '/startup_scripts').list();
    startupfilestree.innerHTML = '';
    for (const file of startupFiles) {
        if (file.endsWith(".kjs")) {
            const fileDiv = document.createElement('s-menu-item');
            fileDiv.innerText = file.split('.').slice(0, -1).join('.');
            fileDiv.setAttribute('label', file);
            const editor = newEditor(file);
            fileDiv.addEventListener('click', () => {
                const uuids = Object.keys(workspaceEditors);
                for (const uuid of uuids) {
                    const e = workspaceEditors[uuid];
                    if (e && e.workspaceDiv) {
                        e.workspaceDiv.style.display = 'none';
                    }
                }
                if (editor && editor.workspaceDiv) {
                    editor.workspaceDiv.style.display = 'block';
                }
            });
            startupfilestree.appendChild(fileDiv);
        }
    }
}

renderFilesTree();
// newEditor();