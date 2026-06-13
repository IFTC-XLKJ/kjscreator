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
    {
        type: "function_anonymous",
        message0: "匿名函数 %1 %2 %3 返回 %4",
        args0: [
            {
                type: "input_value",
                name: "PARAMS",
                check: "Array"
            },
            {
                type: "input_dummy"
            },
            {
                type: "input_statement",
                name: "STACK"
            },
            {
                type: "input_value",
                name: "RETURN"
            }
        ],
        output: "function",
        colour: "#68CDFF",
        tooltip: "定义一个匿名函数",
        helpUrl: ""
    },
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

Blockly.JavaScript.forBlock["function_anonymous"] = function (block) {
    var params = Blockly.JavaScript.valueToCode(block, "PARAMS", Blockly.JavaScript.ORDER_ATOMIC) || "[]";
    var stack = Blockly.JavaScript.statementToCode(block, "STACK");
    var return_value = Blockly.JavaScript.valueToCode(block, "RETURN", Blockly.JavaScript.ORDER_ATOMIC) || "''";
    return `function(${params}) {\n${stack}\nreturn ${return_value};\n}`;
}