const params = new URLSearchParams(window.location.search);
const uuid = params.get('uuid');
const name = params.get('name');
const path = params.get('path');

console.log("Editor Window Params:", { uuid, name, path });

const { Logger } = iftc;

Logger.info("Editor Window Started");
// 初始化Blockly
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
    scrollbars: true,
    trashcan: true,
    media: 'media/',
});