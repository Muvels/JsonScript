import { readFileSync } from "fs";
import { runtime } from "./compiler";

var argv = (process.argv.slice(2));

if (argv.length < 1) {
    ReferenceError('Bitte eine Pfad angeben')
}
const path: string = argv[0];

const executeCode = async (code: string) => {
    const output: any[] = [];
    const display = new Uint8Array(10000);
    const pixels: any[] = [];
  
    try {
      const tick = await runtime(code, {
        print: d =>  {output.push(d); console.log(d)},
        display
      });
      tick();

      // find any pixels that have been written to
      display.forEach((value, index) => {
        if (value !== 0) {
          pixels.push([index, value]);
        }
      });
      return { output, pixels };
    } catch (e) {
      console.error(e);
    }
  };

(async () => {
    console.log('Output');
    const returnValue = await executeCode(readFileSync(path, 'utf-8'));
    return returnValue;
})();