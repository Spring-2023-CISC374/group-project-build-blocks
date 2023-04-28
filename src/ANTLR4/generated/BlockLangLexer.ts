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
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly NUMBER = 11;
	public static readonly WHITESPACE = 12;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
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
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
		"T__9", "NUMBER", "WHITESPACE",
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

	public static readonly _serializedATN: number[] = [4,0,12,93,6,-1,2,0,7,
	0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,
	9,2,10,7,10,2,11,7,11,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,1,2,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,
	5,1,5,1,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,
	8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,10,4,10,83,8,10,11,10,12,10,84,1,11,4,11,
	88,8,11,11,11,12,11,89,1,11,1,11,0,0,12,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,
	8,17,9,19,10,21,11,23,12,1,0,2,1,0,48,57,3,0,9,10,13,13,32,32,94,0,1,1,
	0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,
	1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,
	0,1,25,1,0,0,0,3,30,1,0,0,0,5,38,1,0,0,0,7,41,1,0,0,0,9,46,1,0,0,0,11,51,
	1,0,0,0,13,57,1,0,0,0,15,62,1,0,0,0,17,68,1,0,0,0,19,76,1,0,0,0,21,82,1,
	0,0,0,23,87,1,0,0,0,25,26,5,108,0,0,26,27,5,111,0,0,27,28,5,111,0,0,28,
	29,5,112,0,0,29,2,1,0,0,0,30,31,5,101,0,0,31,32,5,110,0,0,32,33,5,100,0,
	0,33,34,5,108,0,0,34,35,5,111,0,0,35,36,5,111,0,0,36,37,5,112,0,0,37,4,
	1,0,0,0,38,39,5,117,0,0,39,40,5,112,0,0,40,6,1,0,0,0,41,42,5,100,0,0,42,
	43,5,111,0,0,43,44,5,119,0,0,44,45,5,110,0,0,45,8,1,0,0,0,46,47,5,108,0,
	0,47,48,5,101,0,0,48,49,5,102,0,0,49,50,5,116,0,0,50,10,1,0,0,0,51,52,5,
	114,0,0,52,53,5,105,0,0,53,54,5,103,0,0,54,55,5,104,0,0,55,56,5,116,0,0,
	56,12,1,0,0,0,57,58,5,103,0,0,58,59,5,114,0,0,59,60,5,97,0,0,60,61,5,98,
	0,0,61,14,1,0,0,0,62,63,5,99,0,0,63,64,5,108,0,0,64,65,5,111,0,0,65,66,
	5,115,0,0,66,67,5,101,0,0,67,16,1,0,0,0,68,69,5,114,0,0,69,70,5,101,0,0,
	70,71,5,108,0,0,71,72,5,101,0,0,72,73,5,97,0,0,73,74,5,115,0,0,74,75,5,
	101,0,0,75,18,1,0,0,0,76,77,5,111,0,0,77,78,5,112,0,0,78,79,5,101,0,0,79,
	80,5,110,0,0,80,20,1,0,0,0,81,83,7,0,0,0,82,81,1,0,0,0,83,84,1,0,0,0,84,
	82,1,0,0,0,84,85,1,0,0,0,85,22,1,0,0,0,86,88,7,1,0,0,87,86,1,0,0,0,88,89,
	1,0,0,0,89,87,1,0,0,0,89,90,1,0,0,0,90,91,1,0,0,0,91,92,6,11,0,0,92,24,
	1,0,0,0,3,0,84,89,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!BlockLangLexer.__ATN) {
			BlockLangLexer.__ATN = new ATNDeserializer().deserialize(BlockLangLexer._serializedATN);
		}

		return BlockLangLexer.__ATN;
	}


	static DecisionsToDFA = BlockLangLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}
