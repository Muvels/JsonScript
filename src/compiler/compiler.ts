import { emitter } from "./emitter";
import { transformer } from "./transformer";
import * as parser from '../grammar/FunctionsGrammar';


export const compile: Compiler = src => {
  const ast = parser.parse(src);
  const transformedAst = transformer(ast);
  const wasm = emitter(transformedAst);
  return wasm;
};

export const runtime: Runtime = async (src, env) => {
  const wasm = compile(src);
  const memory = new WebAssembly.Memory({ initial: 1 });
  const result: any = await WebAssembly.instantiate(wasm, {
    env: { ...env, memory }
  });
  return () => {
    result.instance.exports.run();
    env.display.set(new Uint8Array(memory.buffer, 0, 10000));
  };
};