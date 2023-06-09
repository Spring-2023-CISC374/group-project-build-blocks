import { ParserRuleContext } from 'antlr4';
import BlockLangVisitor from '../../ANTLR4/generated/BlockLangVisitor';
import Crane from '../../objects/Crane';
import Level from '../../scenes/Level';


export default class BlockVisitor extends BlockLangVisitor<void> {
	// https://github.com/Microsoft/TypeScript/issues/9722

	output?: HTMLElement | null;
	indent: number;
	scene?: Level;
	timing: number;

	constructor(output?: HTMLElement | null, scene?: Level) {
		super();
		this.indent = 0;
		this.output = output;
		this.scene = scene;
		this.timing = 0;
	}
	
	// constructor(output?: HTMLElement | null) {
	// 	super();
	// 	this.indent = 0;
	// 	this.output = output;
	// }

	visitProgram = (ctx: ParserRuleContext) => {
		this.indent = 0;
		if (this.output) {
			this.output.innerHTML = '';
		}
		// console.log('visitProgram', ctx);
		this.visitChildren(ctx);
	}

	visitStatement = (ctx: ParserRuleContext) => {
		if (this.output) {
			this.output.innerHTML += `${'&nbsp;'.repeat(this.indent * 4)}visitStatement ${ctx.getText()}<br>`;
		}
		
		this.visitChildren(ctx);
	}

	visitLoopStatement = (ctx: ParserRuleContext) => {
		if (this.output) {
			this.output.innerHTML += `${'&nbsp;'.repeat(this.indent * 4)}visitLoopStatement ${ctx.getText()}<br>`;
			
		}
		// loop n number of times to execute the statements
		for (let i = 0; i < parseInt(ctx.getChild(1).getText()); i++) {
			// this.indent++;
			this.visitChildren(ctx);
			// this.indent--;
		}
		// console.log('visitLoopStatement', ctx);
		return;
	}

	visitActionStatement = (ctx: ParserRuleContext) => {
		if (this.output) {
			this.output.innerHTML += `${'&nbsp;'.repeat(this.indent * 4)}visitActionStatement ${ctx.getText()}<br>`;
		}
		// console.log('visitActionStatement', ctx);
		switch (ctx.getText()) {
			case 'open':
			case 'release':
				this.scene?.time.delayedCall(this.timing, () => {this.scene?.getCrane.release()});
				this.timing += Crane.MOVEMENT_TIME + 500;
				console.log('open', this.timing);
				break;
			case 'close':
			case 'grab':
				this.scene?.time.delayedCall(this.timing, () => {this.scene?.getCrane.grab()});
				this.timing += Crane.MOVEMENT_TIME + 500;
				console.log('close', this.timing);
				break;
			default:
				break;
		}
		return;
	}


	visitMoveStatement = (ctx: ParserRuleContext) => {
		
		if (this.output) {
			this.output.innerHTML += `${'&nbsp;'.repeat(this.indent * 4)}visitMoveStatement ${ctx.getText()}<br>`;
		}
		console.log(this.scene?.getCrane)
		switch (ctx.getText()) {
			case 'up':
				this.scene?.time.delayedCall(this.timing, () => {this.scene?.getCrane.moveUp()});
				this.timing += Crane.MOVEMENT_TIME + 500;
				console.log('move up', this.timing);
				break;
			case 'down':
				// this.crane?.moveDown();
				this.scene?.time.delayedCall(this.timing, () => {this.scene?.getCrane.moveDown()});
				this.timing += Crane.MOVEMENT_TIME + 500;
				console.log('move down', this.timing);
				break;
			case 'left':
				// this.crane?.moveLeft();
				this.scene?.time.delayedCall(this.timing, () => {this.scene?.getCrane.moveLeft()});
				this.timing += Crane.MOVEMENT_TIME + 500;
				console.log('move leftr', this.timing);
				break;
			case 'right':
				// this.crane?.moveRight();
				this.scene?.time.delayedCall(this.timing, () => {this.scene?.getCrane.moveRight()});
				this.timing += Crane.MOVEMENT_TIME + 500;
				console.log('move roigiht', this.timing);
				break;
			default:
				console.error("visitMoveStatement: invalid move statement", ctx.getText());
				break;
		}

		console.log('visitMoveStatement', ctx.getText());
		this.visitChildren(ctx);
	}
}