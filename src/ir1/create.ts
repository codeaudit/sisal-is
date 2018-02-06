import * as AST from "../ast";
import * as ASTTypes from "../ast/types";
import { Node } from "./node";
import { Identifier } from "./identifier";
import { ArrayValue } from "./array";
import { BinaryExpression } from "./binary";
import { StreamValue } from "./stream";
import { Literal } from "./literal";
import { Scope } from "./scope";

export function nodeFromPostfix(postfix: AST.Postfix, scope: Scope): Node {
  // TODO: add operationList
  return nodeFromExpression(postfix.base, scope);
}

export function nodeFromExpression(expression: AST.Expression, scope: Scope): Node {
  if (typeof expression === "string") {
    return new Identifier(expression, scope);
  }
  if (AST.isLiteral(expression)) {
    return new Literal(expression);
  }
  if (AST.isArrayValue(expression)) {
    return new ArrayValue(expression, scope);
  }
  if (AST.isStreamValue(expression)) {
    return new StreamValue(expression);
  }
  if (AST.isRecordValue(expression)) {
    return new RecordValue(expression);
  }
  if (ASTTypes.isTypeValue(expression)) {
    return new TypeValue(expression);
  }
  if (AST.isBinaryExpression(expression)) {
    return new BinaryExpression(expression);
  }
  if (AST.isUnaryExpression(expression)) {
    return new UnaryExpression(expression);
  }
  if (AST.isPostfix(expression)) {
    return nodeFromPostfix(expression, scope);
  }
  if (AST.isOldValue(expression)) {
    return new OldValue(expression);
  }
  if (AST.isLetExpression(expression)) {
    return new LetExpression(expression);
  }
  if (AST.isLoopExpression(expression)) {
    return new LoopExpression(expression);
  }
  if (AST.isIfExpression(expression)) {
    return new IfExpression(expression);
  }

  throw new Error("Unexpected expression type in create " + JSON.stringify(expression));
}