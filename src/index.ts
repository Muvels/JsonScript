import * as fs from 'fs';
import * as parser from './grammar/FunctionsGrammar';

console.log(JSON.stringify(parser.parse(fs.readFileSync('src/LngFiles/example2.lng', 'utf-8'))));