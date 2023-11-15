import * as fs from 'fs';
import * as parser from './grammar/FunctionsGrammar';

console.log(parser.parse(fs.readFileSync('C:/Users/Matteo/Desktop/DEVELOP/Current/autoFiles/JSONLang/src/LngFiles/example.lng', 'utf-8')));