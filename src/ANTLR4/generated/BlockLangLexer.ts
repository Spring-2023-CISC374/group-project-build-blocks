// Generated from BlockLang.g4 by ANTLR 4.12.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
// @ts-nocheck
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class BlockLangLexer extends Lexer {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly NUMBER = 7;
	public static readonly WHITESPACE = 8;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: (string | null)[] = [ null, "'loop'", 
                                                            "'endloop'", 
                                                            "'up'", "'down'", 
                                                            "'left'", "'right'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, "NUMBER", 
                                                             "WHITESPACE" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "NUMBER", "WHITESPACE",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, BlockLangLexer._ATN, BlockLangLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "BlockLang.g4"; }

	public get literalNames(): (string | null)[] { return BlockLangLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return BlockLangLexer.symbolicNames; }
	public get ruleNames(): string[] { return BlockLangLexer.ruleNames; }

	public get serializedATN(): number[] { return BlockLangLexer._serializedATN; }

	public get channelNames(): string[] { return BlockLangLexer.channelNames; }

	public get modeNames(): string[] { return BlockLangLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,8,61,6,-1,2,0,7,
	0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,1,0,1,0,1,0,1,
	0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,
	4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,1,6,4,6,51,8,6,11,6,12,6,52,1,
	7,4,7,56,8,7,11,7,12,7,57,1,7,1,7,0,0,8,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,
	8,1,0,2,1,0,48,57,3,0,9,10,13,13,32,32,62,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,
	0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,1,
	17,1,0,0,0,3,22,1,0,0,0,5,30,1,0,0,0,7,33,1,0,0,0,9,38,1,0,0,0,11,43,1,
	0,0,0,13,50,1,0,0,0,15,55,1,0,0,0,17,18,5,108,0,0,18,19,5,111,0,0,19,20,
	5,111,0,0,20,21,5,112,0,0,21,2,1,0,0,0,22,23,5,101,0,0,23,24,5,110,0,0,
	24,25,5,100,0,0,25,26,5,108,0,0,26,27,5,111,0,0,27,28,5,111,0,0,28,29,5,
	112,0,0,29,4,1,0,0,0,30,31,5,117,0,0,31,32,5,112,0,0,32,6,1,0,0,0,33,34,
	5,100,0,0,34,35,5,111,0,0,35,36,5,119,0,0,36,37,5,110,0,0,37,8,1,0,0,0,
	38,39,5,108,0,0,39,40,5,101,0,0,40,41,5,102,0,0,41,42,5,116,0,0,42,10,1,
	0,0,0,43,44,5,114,0,0,44,45,5,105,0,0,45,46,5,103,0,0,46,47,5,104,0,0,47,
	48,5,116,0,0,48,12,1,0,0,0,49,51,7,0,0,0,50,49,1,0,0,0,51,52,1,0,0,0,52,
	50,1,0,0,0,52,53,1,0,0,0,53,14,1,0,0,0,54,56,7,1,0,0,55,54,1,0,0,0,56,57,
	1,0,0,0,57,55,1,0,0,0,57,58,1,0,0,0,58,59,1,0,0,0,59,60,6,7,0,0,60,16,1,
	0,0,0,3,0,52,57,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!BlockLangLexer.__ATN) {
			BlockLangLexer.__ATN = new ATNDeserializer().deserialize(BlockLangLexer._serializedATN);
		}

		return BlockLangLexer.__ATN;
	}


	static DecisionsToDFA = BlockLangLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}
