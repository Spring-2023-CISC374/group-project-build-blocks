import { ParserRuleContext } from 'antlr4';
import BlockLangVisitor from '../../ANTLR4/generated/BlockLangVisitor';

export default class BlockVisitor extends BlockLangVisitor<void> {
	// https://github.com/Microsoft/TypeScript/issues/9722

	output?: HTMLElement | null;
	indent: number;

	constructor(output?: HTMLElement | null) {
		super();
		this.indent = 0;
		this.output = output;
	}

	visitProgram = (ctx: ParserRuleContext) => {
		this.indent = 0;
		if (this.output) {
			this.output.innerHTML = '';
		}
		// console.log('visitProgram', ctx);
		return this.visitChildren(ctx);
	}

	visitStatement = (ctx: ParserRuleContext) => {
		if (this.output) {
			this.output.innerHTML += `${'&nbsp;'.repeat(this.indent * 4)}visitStatement ${ctx.getText()}<br>`;
		}
		// console.log('visitStatement', ctx);
		return this.visitChildren(ctx);
	}

	visitLoopStatement = (ctx: ParserRuleContext) => {
		if (this.output) {
			this.output.innerHTML += `${'&nbsp;'.repeat(this.indent * 4)}visitLoopStatement ${ctx.getText()}<br>`;
		}

		// console.log('visitLoopStatement', ctx);
		return this.visitChildren(ctx);
	}

	visitMoveStatement = (ctx: ParserRuleContext) => {
		if (this.output) {
			this.output.innerHTML += `${'&nbsp;'.repeat(this.indent * 4)}visitMoveStatement ${ctx.getText()}<br>`;
		}
		// console.log('visitMoveStatement', ctx);
		return this.visitChildren(ctx);
	}
}