Blockly.defineBlocksWithJsonArray([
    {
        type: "StartupEvents_registry",
        message0: "启动事件注册 %1",
        args0: [
            {
                type: "input_value",
                name: "FUNCTION",
                check: "function"
            }
        ],
        colour: "#26B36C",
        helpUrl: "",
        inputsInline: true,
        nextStatement: null,
        previousStatement: null,
        tooltip: "启动事件注册",
    }
]);

Blockly.JavaScript['StartupEvents_registry'] = function (block) {
    var value_function = Blockly.JavaScript.valueToCode(block, 'FUNCTION', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `StartupEvents.registry(${value_function});\n`;
    return code;
};