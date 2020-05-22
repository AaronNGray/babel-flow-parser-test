const fs = require("fs");
const babel = require("@babel/core");
const parser  = require('@babel/parser');
const generate = require('@babel/generator').default;

if (process.argv.length == 3) {

    const filename = process.argv[2];
    
    const sourceCode = fs.readFileSync(filename).toString();
    
    console.log("sourceCode = ", sourceCode);

    var options = {
        "sourceType": "module", // parse in strict mode and allow module declarations
        "presets": [["@babel/preset-flow", {all: true}]]
    };
    
    const parsedAst = parser.parse(sourceCode, options);
    
    
    console.log("parsedAst = ", parsedAst)
    
    const { codeOutput, map, ast } = babel.transformFromAstSync(parsedAst, sourceCode, { ast: true } );
    
    console.log("ast = ", JSON.stringify(ast, 2, 2))
    
    
    const output = generate(ast, { /* options */ }, sourceCode);
    
    console.log("codeOutput = ", codeOutput);
    console.log("output = ", output);
};

