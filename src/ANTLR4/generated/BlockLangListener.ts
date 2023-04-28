// Generated from BlockLang.g4 by ANTLR 4.12.0
// @ts-nocheck

import {ParseTreeListener} from "antlr4";


import { ProgramContext } from "./BlockLangParser";
import { StatementContext } from "./BlockLangParser";
import { LoopStatementContext } from "./BlockLangParser";
import { MoveStatementContext } from "./BlockLangParser";
import { ActionStatementContext } from "./BlockLangParser";
import { GrabActionContext } from "./BlockLangParser";
import { ReleaseActionContext } from "./BlockLangParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `BlockLangParser`.
 */
export default class BlockLangListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `BlockLangParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `BlockLangParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;
	/**
	 * Enter a parse tree produced by `BlockLangParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `BlockLangParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;
	/**
	 * Enter a parse tree produced by `BlockLangParser.loopStatement`.
	 * @param ctx the parse tree
	 */
	enterLoopStatement?: (ctx: LoopStatementContext) => void;
	/**
	 * Exit a parse tree produced by `BlockLangParser.loopStatement`.
	 * @param ctx the parse tree
	 */
	exitLoopStatement?: (ctx: LoopStatementContext) => void;
	/**
	 * Enter a parse tree produced by `BlockLangParser.moveStatement`.
	 * @param ctx the parse tree
	 */
	enterMoveStatement?: (ctx: MoveStatementContext) => void;
	/**
	 * Exit a parse tree produced by `BlockLangParser.moveStatement`.
	 * @param ctx the parse tree
	 */
	exitMoveStatement?: (ctx: MoveStatementContext) => void;
	/**
	 * Enter a parse tree produced by `BlockLangParser.actionStatement`.
	 * @param ctx the parse tree
	 */
	enterActionStatement?: (ctx: ActionStatementContext) => void;
	/**
	 * Exit a parse tree produced by `BlockLangParser.actionStatement`.
	 * @param ctx the parse tree
	 */
	exitActionStatement?: (ctx: ActionStatementContext) => void;
	/**
	 * Enter a parse tree produced by `BlockLangParser.grabAction`.
	 * @param ctx the parse tree
	 */
	enterGrabAction?: (ctx: GrabActionContext) => void;
	/**
	 * Exit a parse tree produced by `BlockLangParser.grabAction`.
	 * @param ctx the parse tree
	 */
	exitGrabAction?: (ctx: GrabActionContext) => void;
	/**
	 * Enter a parse tree produced by `BlockLangParser.releaseAction`.
	 * @param ctx the parse tree
	 */
	enterReleaseAction?: (ctx: ReleaseActionContext) => void;
	/**
	 * Exit a parse tree produced by `BlockLangParser.releaseAction`.
	 * @param ctx the parse tree
	 */
	exitReleaseAction?: (ctx: ReleaseActionContext) => void;
}

