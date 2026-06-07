const params = new URLSearchParams(window.location.search);
const uuid = params.get('uuid');
const name = params.get('name');
const path = params.get('path');

console.log("Editor Window Params:", { uuid, name, path });

const { Logger } = iftc;

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
const workspace = Blockly.inject('blocklyDiv', workspaceOptions);