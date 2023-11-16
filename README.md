# JsonScript

This is the custom programming language JsonScript, which is designed with a syntax specified in JSON format. The compiler compiles JsonScript code into WebAssembly for efficient execution.

![OIG](https://github.com/Muvels/JsonScript/assets/58641436/db053829-993f-4936-8cd6-3a3215fa2c05)

## JsonScript Syntax

JsonScript code is structured like a JSON array, where each element represents a language construct. The current syntax supports the following elements:

1. **Function Definition:**
    ```json
    {
        "function<int>": {
            "functionName": "myFunction",
            "parameters": {
                "parameter1": "<int>",
                "abc": "<float>",
                "anotherParam": "<int>"
            },
            "code": [
                {
                    "comment": "Hello World"
                },
                {
                    "declare": {
                        "type": "<int>",
                        "scope": "private",
                        "name": "abc",
                        "value": 9
                    }
                },
                {
                    "comment": "This is a comment"
                },
                {
                    "->": {
                        "proc": "myFunction",
                        "parameters": [0]
                    }
                },
                {
                    "math": {
                        "left": 5,
                        "op": "+",
                        "right": 2
                    }
                }
            ]
        }
    }
    ```

2. **Comments:**
    ```json
    {
        "comment": "This is a comment"
    }
    ```

3. **Variable Declaration:**
    ```json
    {
        "declare": {
            "type": "<int>",
            "scope": "public",
            "name": "abc",
            "value": 1
        }
    }
    ```

4. **Math Operations:**
    ```json
    {
        "math": {
            "left": 5,
            "op": "+",
            "right": 2
        }
    }
    ```

5. **Assignment:**
    ```json
    {
        "assign": {
            "to": "a",
            "value": {
                "math": {
                    "left": 1,
                    "op": "+",
                    "right": 1
                }
            }
        }
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
