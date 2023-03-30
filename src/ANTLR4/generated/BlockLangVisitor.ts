// Generated from BlockLang.g4 by ANTLR 4.12.0

import {ParseTreeVisitor} from 'antlr4';


import { ProgramContext } from "./BlockLangParser";
import { StatementContext } from "./BlockLangParser";
import { LoopStatementContext } from "./BlockLangParser";
import { MoveStatementContext } from "./BlockLangParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `BlockLangParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class BlockLangVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `BlockLangParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;
	/**
	 * Visit a parse tree produced by `BlockLangParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;
	/**
	 * Visit a parse tree produced by `BlockLangParser.loopStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoopStatement?: (ctx: LoopStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `BlockLangParser.moveStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMoveStatement?: (ctx: MoveStatementContext) => Result;
}

