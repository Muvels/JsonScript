import { runtime } from './compiler/compiler'
import * as fs from 'fs';
const output: any[] = [];
const display = new Uint8Array(10000);

(async () => {
    const result = await runtime(fs.readFileSync('src/LngFiles/example2.lng', 'utf-8'), 
        {
            print: d => output.push(d),
            display
        }
    );
    console.log(result);
});