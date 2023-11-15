import * as fs from 'fs';
import * as parser from './grammar/FunctionsGrammar';

console.log(parser.parse(fs.readFileSync('src/LngFiles/example.lng', 'utf-8')));