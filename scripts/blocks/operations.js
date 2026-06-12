Blockly.defineBlocksWithJsonArray([
    {
        type: "string",
        message0: "%1",
        args0: [
            {
                type: "field_input",
                name: "TEXT",
                text: ""
            }
        ],
        output: "String",
        colour: "#FEAE8A",
        tooltip: "字符串",
    }
])

Blockly.JavaScript.forBlock['string'] = function (block) {
    var text = block.getFieldValue('TEXT');
    return [`"${text.replaceAll("\"", "\\\"")}"`, Blockly.JavaScript.ORDER_ATOMIC];
};