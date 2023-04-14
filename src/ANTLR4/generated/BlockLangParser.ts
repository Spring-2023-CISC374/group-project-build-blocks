// Generated from BlockLang.g4 by ANTLR 4.12.0
// @ts-nocheck
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

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
	public static readonly NUMBER = 9;
	public static readonly WHITESPACE = 10;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_program = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_loopStatement = 2;
	public static readonly RULE_moveStatement = 3;
	public static readonly RULE_actionStatement = 4;
	public static readonly literalNames: (string | null)[] = [ null, "'loop'", 
                                                            "'endloop'", 
                                                            "'up'", "'down'", 
                                                            "'left'", "'right'", 
                                                            "'open'", "'close'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, "NUMBER", 
                                                             "WHITESPACE" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "statement", "loopStatement", "moveStatement", "actionStatement",
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
			this.state = 11;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 10;
				this.statement();
				}
				}
				this.state = 13;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 506) !== 0));
			this.state = 15;
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
			this.state = 20;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 17;
				this.loopStatement();
				}
				break;
			case 3:
			case 4:
			case 5:
			case 6:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 18;
				this.moveStatement();
				}
				break;
			case 7:
			case 8:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 19;
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
			this.state = 22;
			this.match(BlockLangParser.T__0);
			this.state = 23;
			this.match(BlockLangParser.NUMBER);
			this.state = 25;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 24;
				this.statement();
				}
				}
				this.state = 27;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 506) !== 0));
			this.state = 29;
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
			this.state = 31;
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
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 33;
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

	public static readonly _serializedATN: number[] = [4,1,10,36,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,1,0,4,0,12,8,0,11,0,12,0,13,1,0,1,0,1,1,1,
	1,1,1,3,1,21,8,1,1,2,1,2,1,2,4,2,26,8,2,11,2,12,2,27,1,2,1,2,1,3,1,3,1,
	4,1,4,1,4,0,0,5,0,2,4,6,8,0,2,1,0,3,6,1,0,7,8,34,0,11,1,0,0,0,2,20,1,0,
	0,0,4,22,1,0,0,0,6,31,1,0,0,0,8,33,1,0,0,0,10,12,3,2,1,0,11,10,1,0,0,0,
	12,13,1,0,0,0,13,11,1,0,0,0,13,14,1,0,0,0,14,15,1,0,0,0,15,16,5,0,0,1,16,
	1,1,0,0,0,17,21,3,4,2,0,18,21,3,6,3,0,19,21,3,8,4,0,20,17,1,0,0,0,20,18,
	1,0,0,0,20,19,1,0,0,0,21,3,1,0,0,0,22,23,5,1,0,0,23,25,5,9,0,0,24,26,3,
	2,1,0,25,24,1,0,0,0,26,27,1,0,0,0,27,25,1,0,0,0,27,28,1,0,0,0,28,29,1,0,
	0,0,29,30,5,2,0,0,30,5,1,0,0,0,31,32,7,0,0,0,32,7,1,0,0,0,33,34,7,1,0,0,
	34,9,1,0,0,0,3,13,20,27];

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
