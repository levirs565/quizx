import * as TJS from 'typescript-json-schema';
import fs from 'fs';
import path from 'path';
import { SymbolFlags } from 'typescript';

const rootPath = path.join(__dirname, '..');
const configPath = path.join(rootPath, '/tsconfig.json');
const includedFiles = ['src/types/game.ts', 'src/types/user.ts', 'src/types/quiz.ts'];
const program = TJS.programFromConfig(configPath, includedFiles);
const typeChecker = program.getTypeChecker();
const tjsArgs: TJS.PartialArgs = {
  required: true,
  noExtraProps: true,
  ref: true
};
const generator = TJS.buildGenerator(program, tjsArgs, includedFiles);

if (!generator) process.exit();

const userSymbols = generator.getUserSymbols();
const exportedSymbols: Array<string> = [];
const filesSchemaDefinition = new Map<string, Array<string>>();

for (const symbolName of userSymbols) {
  const symbolRef = generator.getSymbols(symbolName)[0];
  const symbol = symbolRef.symbol;
  const parentNode = symbol.declarations[0].parent;
  const parentSymbol = typeChecker.getSymbolAtLocation(parentNode)!;
  const isExported = parentSymbol.exports!.has(symbol.escapedName);

  if (symbol.flags === SymbolFlags.RegularEnum) continue;

  if (isExported) {
    let schemaDefinition = filesSchemaDefinition.get(parentSymbol.name);
    if (!schemaDefinition) schemaDefinition = [];

    schemaDefinition.push(
      `export const ${symbol.name}: SchemaDefinition<${symbol.name}> = {\n  name: "${symbol.name}"\n}`
    );
    filesSchemaDefinition.set(parentSymbol.name, schemaDefinition);
    exportedSymbols.push(symbolName);
  }
}

console.log('Generating JSON Schema...');
const jsonSchema = generator.getSchemaForSymbols(exportedSymbols);

console.log('Writing JSON Schema...');
const jsonSchemaFile = path.join(rootPath, 'src/validation/schema.json');
fs.writeFileSync(jsonSchemaFile, JSON.stringify(jsonSchema, null, 2));

console.log('Generating schema definition for types files...');

console.log('Writing schema definition for types files...');

const schemaBegin = '// Begin Generated Schema Definition';
const schemaEnd = '// End Generated Schema Definition';
filesSchemaDefinition.forEach((schemaDefinition, fileName) => {
  const filePath = path.join(rootPath, fileName.substr(1, fileName.length - 2)) + '.ts';
  const definitionStr = schemaBegin + '\n' + schemaDefinition.join('\n') + '\n' + schemaEnd;
  let text = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const oldBegin = text.indexOf(schemaBegin);
  if (oldBegin > -1) {
    // Also remove new line before definitionStr
    text = text.substring(0, oldBegin - 1);
  }
  text += '\n' + definitionStr;
  fs.writeFileSync(filePath, text);
});
