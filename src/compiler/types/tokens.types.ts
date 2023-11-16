type TokenType =
  | "number"
  | "keyword"
  | "whitespace"
  | "parens"
  | "operator"
  | "identifier"
  | "assignment";

interface Token {
  type: TokenType;
  value: string;
  line?: number;
  char?: number;
}