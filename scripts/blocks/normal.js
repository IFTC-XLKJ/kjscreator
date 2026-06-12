Blockly.defineBlocksWithJsonArray([
    {
        type: "inline_comment",
        message0: "单行注释 %1",
        args0: [
            {
                type: "field_input",
                name: "TEXT",
                text: "这里是注释"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#68CDFF",
        tooltip: "添加单行注释",
        helpUrl: ""
    },
    {
        type: "multiline_comment",
        message0: "多行注释 %1",
        args0: [
            {
                type: "field_multilinetext",
                name: "TEXT",
                text: "这里是多行\n注释"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#68CDFF",
        tooltip: "添加多行注释",
        helpUrl: ""
    },
    {
        type: "console",
        message0: "在控制台输出 %1 %2",
        args0: [
            {
                type: "field_dropdown",
                name: "TYPE",
                options: [
                    ["信息", "info"],
                    ["警告", "warn"],
                    ["错误", "error"]
                ]
            },
            {
                type: "input_value",
                name: "TEXT"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#68CDFF",
        tooltip: "输出日志到控制台",
        helpUrl: ""
    },
    // {
    //     type: "variable_declaration",
    //     message0: "声明变量 %1 = %2",
    //     args0: [
    //         {
    //             // 【修复】补充完整的字段定义
    //             type: "field_input",
    //             name: "VAR_NAME",
    //             text: "myVar"
    //         },
    //         {
    //             type: "input_value",
    //             name: "VALUE",
    //             check: null
    //         }
    //     ],
    //     previousStatement: null,
    //     nextStatement: null,
    //     colour: "#68CDFF",
    //     tooltip: "声明一个变量",
    //     helpUrl: ""
    // }
]);

Blockly.JavaScript.forBlock["inline_comment"] = function (block) {
    var text = block.getFieldValue("TEXT");
    text = text.replace(/\n/g, ' ');
    return `// ${text}\n`;
};

Blockly.JavaScript.forBlock["multiline_comment"] = function (block) {
    var text = block.getFieldValue("TEXT");
    return `/* ${text} */\n`;
};

Blockly.JavaScript.forBlock["console"] = function (block) {
    var type = block.getFieldValue("TYPE");
    var value = Blockly.JavaScript.valueToCode(block, "TEXT", Blockly.JavaScript.ORDER_ATOMIC) || "''";
    return `console.${type}(${value});\n`;
};