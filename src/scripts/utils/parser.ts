import { CharStream, CommonTokenStream }  from 'antlr4';
import BlockLangLexer from '../../ANTLR4/generated/BlockLangLexer';
import BlockLangParser from '../../ANTLR4/generated/BlockLangParser';
import BlockVisitor from './BlockVisitor';


const input = "up down left right"
const chars = new CharStream(input);
const lexer = new BlockLangLexer(chars);
const tokens = new CommonTokenStream(lexer);
const parser = new BlockLangParser(tokens);
parser.buildParseTrees = true;
const tree = parser.program();
const visitor = new BlockVisitor();
visitor.visit(tree);