// Generated from BlockLang.g4 by ANTLR 4.12.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
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
	public static readonly NUMBER = 9;
	public static readonly WHITESPACE = 10;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
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
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "NUMBER", 
		"WHITESPACE",
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

	public static readonly _serializedATN: number[] = [4,0,10,76,6,-1,2,0,7,
	0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,
	9,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,3,1,
	3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,1,6,1,6,1,6,1,
	6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,1,8,4,8,66,8,8,11,8,12,8,67,1,9,4,9,71,8,
	9,11,9,12,9,72,1,9,1,9,0,0,10,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,
	10,1,0,2,1,0,48,57,3,0,9,10,13,13,32,32,77,0,1,1,0,0,0,0,3,1,0,0,0,0,5,
	1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,
	0,17,1,0,0,0,0,19,1,0,0,0,1,21,1,0,0,0,3,26,1,0,0,0,5,34,1,0,0,0,7,37,1,
	0,0,0,9,42,1,0,0,0,11,47,1,0,0,0,13,53,1,0,0,0,15,58,1,0,0,0,17,65,1,0,
	0,0,19,70,1,0,0,0,21,22,5,108,0,0,22,23,5,111,0,0,23,24,5,111,0,0,24,25,
	5,112,0,0,25,2,1,0,0,0,26,27,5,101,0,0,27,28,5,110,0,0,28,29,5,100,0,0,
	29,30,5,108,0,0,30,31,5,111,0,0,31,32,5,111,0,0,32,33,5,112,0,0,33,4,1,
	0,0,0,34,35,5,117,0,0,35,36,5,112,0,0,36,6,1,0,0,0,37,38,5,100,0,0,38,39,
	5,111,0,0,39,40,5,119,0,0,40,41,5,110,0,0,41,8,1,0,0,0,42,43,5,108,0,0,
	43,44,5,101,0,0,44,45,5,102,0,0,45,46,5,116,0,0,46,10,1,0,0,0,47,48,5,114,
	0,0,48,49,5,105,0,0,49,50,5,103,0,0,50,51,5,104,0,0,51,52,5,116,0,0,52,
	12,1,0,0,0,53,54,5,111,0,0,54,55,5,112,0,0,55,56,5,101,0,0,56,57,5,110,
	0,0,57,14,1,0,0,0,58,59,5,99,0,0,59,60,5,108,0,0,60,61,5,111,0,0,61,62,
	5,115,0,0,62,63,5,101,0,0,63,16,1,0,0,0,64,66,7,0,0,0,65,64,1,0,0,0,66,
	67,1,0,0,0,67,65,1,0,0,0,67,68,1,0,0,0,68,18,1,0,0,0,69,71,7,1,0,0,70,69,
	1,0,0,0,71,72,1,0,0,0,72,70,1,0,0,0,72,73,1,0,0,0,73,74,1,0,0,0,74,75,6,
	9,0,0,75,20,1,0,0,0,3,0,67,72,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!BlockLangLexer.__ATN) {
			BlockLangLexer.__ATN = new ATNDeserializer().deserialize(BlockLangLexer._serializedATN);
		}

		return BlockLangLexer.__ATN;
	}


	static DecisionsToDFA = BlockLangLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}