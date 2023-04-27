// Generated from BlockLang.g4 by ANTLR 4.12.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
// @ts-nocheck

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import BlockLangListener from "./BlockLangListener.js";
import BlockLangVisitor from "./BlockLangVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class BlockLangParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly NUMBER = 11;
	public static readonly WHITESPACE = 12;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_program = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_loopStatement = 2;
	public static readonly RULE_moveStatement = 3;
	public static readonly RULE_actionStatement = 4;
	public static readonly RULE_grabAction = 5;
	public static readonly RULE_releaseAction = 6;
	public static readonly literalNames: (string | null)[] = [ null, "'loop'", 
                                                            "'endloop'", 
                                                            "'up'", "'down'", 
                                                            "'left'", "'right'", 
                                                            "'grab'", "'close'", 
                                                            "'release'", 
                                                            "'open'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, "NUMBER", 
                                                             "WHITESPACE" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "statement", "loopStatement", "moveStatement", "actionStatement", 
		"grabAction", "releaseAction",
	];
	public get grammarFileName(): string { return "BlockLang.g4"; }
	public get literalNames(): (string | null)[] { return BlockLangParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return BlockLangParser.symbolicNames; }
	public get ruleNames(): string[] { return BlockLangParser.ruleNames; }
	public get serializedATN(): number[] { return BlockLangParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, BlockLangParser._ATN, BlockLangParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let localctx: ProgramContext = new ProgramContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, BlockLangParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 15;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 14;
				this.statement();
				}
				}
				this.state = 17;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2042) !== 0));
			this.state = 19;
			this.match(BlockLangParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let localctx: StatementContext = new StatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, BlockLangParser.RULE_statement);
		try {
			this.state = 24;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 21;
				this.loopStatement();
				}
				break;
			case 3:
			case 4:
			case 5:
			case 6:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 22;
				this.moveStatement();
				}
				break;
			case 7:
			case 8:
			case 9:
			case 10:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 23;
				this.actionStatement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public loopStatement(): LoopStatementContext {
		let localctx: LoopStatementContext = new LoopStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, BlockLangParser.RULE_loopStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 26;
			this.match(BlockLangParser.T__0);
			this.state = 27;
			this.match(BlockLangParser.NUMBER);
			this.state = 29;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 28;
				this.statement();
				}
				}
				this.state = 31;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2042) !== 0));
			this.state = 33;
			this.match(BlockLangParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public moveStatement(): MoveStatementContext {
		let localctx: MoveStatementContext = new MoveStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, BlockLangParser.RULE_moveStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 35;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 120) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public actionStatement(): ActionStatementContext {
		let localctx: ActionStatementContext = new ActionStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, BlockLangParser.RULE_actionStatement);
		try {
			this.state = 39;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 7:
			case 8:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 37;
				this.grabAction();
				}
				break;
			case 9:
			case 10:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 38;
				this.releaseAction();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public grabAction(): GrabActionContext {
		let localctx: GrabActionContext = new GrabActionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, BlockLangParser.RULE_grabAction);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 41;
			_la = this._input.LA(1);
			if(!(_la===7 || _la===8)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public releaseAction(): ReleaseActionContext {
		let localctx: ReleaseActionContext = new ReleaseActionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, BlockLangParser.RULE_releaseAction);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 43;
			_la = this._input.LA(1);
			if(!(_la===9 || _la===10)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,12,46,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,1,0,4,0,16,8,0,11,0,12,0,
	17,1,0,1,0,1,1,1,1,1,1,3,1,25,8,1,1,2,1,2,1,2,4,2,30,8,2,11,2,12,2,31,1,
	2,1,2,1,3,1,3,1,4,1,4,3,4,40,8,4,1,5,1,5,1,6,1,6,1,6,0,0,7,0,2,4,6,8,10,
	12,0,3,1,0,3,6,1,0,7,8,1,0,9,10,43,0,15,1,0,0,0,2,24,1,0,0,0,4,26,1,0,0,
	0,6,35,1,0,0,0,8,39,1,0,0,0,10,41,1,0,0,0,12,43,1,0,0,0,14,16,3,2,1,0,15,
	14,1,0,0,0,16,17,1,0,0,0,17,15,1,0,0,0,17,18,1,0,0,0,18,19,1,0,0,0,19,20,
	5,0,0,1,20,1,1,0,0,0,21,25,3,4,2,0,22,25,3,6,3,0,23,25,3,8,4,0,24,21,1,
	0,0,0,24,22,1,0,0,0,24,23,1,0,0,0,25,3,1,0,0,0,26,27,5,1,0,0,27,29,5,11,
	0,0,28,30,3,2,1,0,29,28,1,0,0,0,30,31,1,0,0,0,31,29,1,0,0,0,31,32,1,0,0,
	0,32,33,1,0,0,0,33,34,5,2,0,0,34,5,1,0,0,0,35,36,7,0,0,0,36,7,1,0,0,0,37,
	40,3,10,5,0,38,40,3,12,6,0,39,37,1,0,0,0,39,38,1,0,0,0,40,9,1,0,0,0,41,
	42,7,1,0,0,42,11,1,0,0,0,43,44,7,2,0,0,44,13,1,0,0,0,4,17,24,31,39];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!BlockLangParser.__ATN) {
			BlockLangParser.__ATN = new ATNDeserializer().deserialize(BlockLangParser._serializedATN);
		}

		return BlockLangParser.__ATN;
	}


	static DecisionsToDFA = BlockLangParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ProgramContext extends ParserRuleContext {
	constructor(parser?: BlockLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(BlockLangParser.EOF, 0);
	}
	public statement_list(): StatementContext[] {
		return this.getTypedRuleContexts(StatementContext) as StatementContext[];
	}
	public statement(i: number): StatementContext {
		return this.getTypedRuleContext(StatementContext, i) as StatementContext;
	}
    public get ruleIndex(): number {
    	return BlockLangParser.RULE_program;
	}
	public enterRule(listener: BlockLangListener): void {
	    if(listener.enterProgram) {
	 		listener.enterProgram(this);
		}
	}
	public exitRule(listener: BlockLangListener): void {
	    if(listener.exitProgram) {
	 		listener.exitProgram(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BlockLangVisitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	constructor(parser?: BlockLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public loopStatement(): LoopStatementContext {
		return this.getTypedRuleContext(LoopStatementContext, 0) as LoopStatementContext;
	}
	public moveStatement(): MoveStatementContext {
		return this.getTypedRuleContext(MoveStatementContext, 0) as MoveStatementContext;
	}
	public actionStatement(): ActionStatementContext {
		return this.getTypedRuleContext(ActionStatementContext, 0) as ActionStatementContext;
	}
    public get ruleIndex(): number {
    	return BlockLangParser.RULE_statement;
	}
	public enterRule(listener: BlockLangListener): void {
	    if(listener.enterStatement) {
	 		listener.enterStatement(this);
		}
	}
	public exitRule(listener: BlockLangListener): void {
	    if(listener.exitStatement) {
	 		listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BlockLangVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LoopStatementContext extends ParserRuleContext {
	constructor(parser?: BlockLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NUMBER(): TerminalNode {
		return this.getToken(BlockLangParser.NUMBER, 0);
	}
	public statement_list(): StatementContext[] {
		return this.getTypedRuleContexts(StatementContext) as StatementContext[];
	}
	public statement(i: number): StatementContext {
		return this.getTypedRuleContext(StatementContext, i) as StatementContext;
	}
    public get ruleIndex(): number {
    	return BlockLangParser.RULE_loopStatement;
	}
	public enterRule(listener: BlockLangListener): void {
	    if(listener.enterLoopStatement) {
	 		listener.enterLoopStatement(this);
		}
	}
	public exitRule(listener: BlockLangListener): void {
	    if(listener.exitLoopStatement) {
	 		listener.exitLoopStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BlockLangVisitor<Result>): Result {
		if (visitor.visitLoopStatement) {
			return visitor.visitLoopStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MoveStatementContext extends ParserRuleContext {
	constructor(parser?: BlockLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return BlockLangParser.RULE_moveStatement;
	}
	public enterRule(listener: BlockLangListener): void {
	    if(listener.enterMoveStatement) {
	 		listener.enterMoveStatement(this);
		}
	}
	public exitRule(listener: BlockLangListener): void {
	    if(listener.exitMoveStatement) {
	 		listener.exitMoveStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BlockLangVisitor<Result>): Result {
		if (visitor.visitMoveStatement) {
			return visitor.visitMoveStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ActionStatementContext extends ParserRuleContext {
	constructor(parser?: BlockLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public grabAction(): GrabActionContext {
		return this.getTypedRuleContext(GrabActionContext, 0) as GrabActionContext;
	}
	public releaseAction(): ReleaseActionContext {
		return this.getTypedRuleContext(ReleaseActionContext, 0) as ReleaseActionContext;
	}
    public get ruleIndex(): number {
    	return BlockLangParser.RULE_actionStatement;
	}
	public enterRule(listener: BlockLangListener): void {
	    if(listener.enterActionStatement) {
	 		listener.enterActionStatement(this);
		}
	}
	public exitRule(listener: BlockLangListener): void {
	    if(listener.exitActionStatement) {
	 		listener.exitActionStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BlockLangVisitor<Result>): Result {
		if (visitor.visitActionStatement) {
			return visitor.visitActionStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GrabActionContext extends ParserRuleContext {
	constructor(parser?: BlockLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return BlockLangParser.RULE_grabAction;
	}
	public enterRule(listener: BlockLangListener): void {
	    if(listener.enterGrabAction) {
	 		listener.enterGrabAction(this);
		}
	}
	public exitRule(listener: BlockLangListener): void {
	    if(listener.exitGrabAction) {
	 		listener.exitGrabAction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BlockLangVisitor<Result>): Result {
		if (visitor.visitGrabAction) {
			return visitor.visitGrabAction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReleaseActionContext extends ParserRuleContext {
	constructor(parser?: BlockLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return BlockLangParser.RULE_releaseAction;
	}
	public enterRule(listener: BlockLangListener): void {
	    if(listener.enterReleaseAction) {
	 		listener.enterReleaseAction(this);
		}
	}
	public exitRule(listener: BlockLangListener): void {
	    if(listener.exitReleaseAction) {
	 		listener.exitReleaseAction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: BlockLangVisitor<Result>): Result {
		if (visitor.visitReleaseAction) {
			return visitor.visitReleaseAction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
