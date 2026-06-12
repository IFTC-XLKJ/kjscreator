// Blockly Toolbox
const toolbox = {
    kind: "categoryToolbox",
    contents: [
        {
            kind: "category",
            name: "通用",
            contents: [
                {
                    kind: "block",
                    type: "inline_comment",
                    input: {
                        name: "text",
                        type: "field",
                        text: "注释"
                    }
                },
                {
                    kind: "block",
                    type: "multiline_comment",
                    input: {
                        name: "text",
                        type: "field",
                        text: "注释"
                    }
                },
                {
                    kind: "block",
                    type: "console"
                },
            ],
        },
    ]
};