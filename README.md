# JsonScript

This is the custom programming language JsonScript, which is designed with a syntax specified in JSON format. The compiler compiles JsonScript code into WebAssembly for efficient execution.

![OIG-removebg](https://github.com/Muvels/JsonScript/assets/58641436/78230939-f7ae-4b77-8b96-b75994d16cfd)


## JsonScript Syntax

JsonScript code is structured like a JSON array, where each element represents a language construct. The current syntax supports the following elements:

1. **Function Definition:**
    ```json
    {
        "function<int>": {
            "functionName": "must be a string, give the Function a name",
            "parameters": {
                "parameter1": "<int>",
                "parameter2": "<float>",
                "Define as many parameters as you want."
            },
            "code": [ "CodeBlock" ]
        }
    }
    ```

2. **Comments:**
    ```json
    {
        "comment": "Must be a string. This Code wont be compiled, its just a comment"
    }
    ```

3. **Variable Declaration:**
    ```json
    {
        "declare": {
            "type": "can be <int> | <float> | <char> | <string>",
            "scope": "can be public | private",
            "name": "must be a string",
            "value": "can be a Literal | CodeBlock | Variable"
        }
    }
    ```

4. **Math Operations:**
    ```json
    {
        "math": {
            "left": "can be a Literal | CodeBlock | Variable",
            "op": " `+` | `-` | `*` | `/` | `==` | `<` | `>` | `&&` ",
            "right": "can be a Literal | CodeBlock | Variable"
        }
    }
    ```

5. **Assignment:**
    ```json
    {
        "assign": {
            "to": "Variable you want to Assign to.",
            "value": "can be a Literal | CodeBlock | Variable"
    }
    ```

6. **While-Loop:**
    ```json
    {
        "while": {
            "condition": { "In here you have to provide a `math:` expression (4)"},
            "loop": ["Loop requires a Code Block, so here you can use any CodeBlock from above."]
        }
    }
    ```
7. **If-Statements:**
    ```json
    {
        "Comming Soon :)"
    }
    ```

## Compilation Process

The compiler takes a valid JsonScript input and generates WebAssembly code for fast execution.

## Example Usage

To compile a JsonScript file named `example.lng`:

```bash
$ jsonscript-compiler example.lng -o output.wasm
```
This will produce a WebAssembly binary file named output.wasm that can be executed in a compatible runtime.

## Dependencies
### The compiler relies on the following dependencies:
Nothing, you can just start with the online version, or download the compiler and write some code... happy Coding :)
