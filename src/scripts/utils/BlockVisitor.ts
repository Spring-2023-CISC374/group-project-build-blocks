import { ParserRuleContext } from 'antlr4';
import BlockLangVisitor from '../../ANTLR4/generated/BlockLangVisitor';

export default class BlockVisitor extends BlockLangVisitor<void> {
	// https://github.com/Microsoft/TypeScript/issues/9722

	visitProgram = (ctx: ParserRuleContext) => {
		console.log('visitProgram', ctx);
	}

	visitStatement = (ctx: ParserRuleContext) => {
		console.log('visitStatement', ctx);
	}

	visitLoopStatement = (ctx: ParserRuleContext) => {
		console.log('visitLoopStatement', ctx);
	}

	visitMoveStatement = (ctx: ParserRuleContext) => {
		console.log('visitMoveStatement', ctx);
	}
}