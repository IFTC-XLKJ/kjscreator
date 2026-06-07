// 在 editor.html 的 script 中
const params = new URLSearchParams(window.location.search);
const uuid = params.get('uuid');
const name = params.get('name');
const path = params.get('path');

console.log("Editor Window Params:", { uuid, name, path });