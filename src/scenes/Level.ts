import { GridData } from './../interfaces/GridData';
import Phaser from 'phaser'
import Crane from '../objects/Crane';
import { CharStream, CommonTokenStream } from 'antlr4';
import BlockLangLexer from '../ANTLR4/generated/BlockLangLexer';
import BlockLangParser from '../ANTLR4/generated/BlockLangParser';
import BlockVisitor from '../scripts/utils/BlockVisitor';
import Crate from '../objects/Crate';
import Instruction from '../objects/Instruction';
import Grid from '../objects/Grid';
import { InstructionType } from '../types/InstructionType';

export default class Level extends Phaser.Scene {
    
    /* SCENE CONSTANTS */
    protected grid: Grid;
    protected secondaryGrid: Grid;

    public static readonly P_GRID_START_BOTTOM = 16;
    public static readonly P_GRID_START_LEFT = 16;
    public static readonly P_GRID_SQUARE_SIZE = 32;    

    
    public static readonly S_GRID_START_BOTTOM = 16;
    public static readonly S_GRID_START_LEFT = 300;
    public static readonly S_GRID_SQUARE_SIZE = 32;

    protected left_blocks = 0;
    protected right_blocks = 0;
    protected up_blocks = 0;
    protected down_blocks = 0;
    protected grab_blocks = 0;
    protected release_blocks = 0;
    protected loop_blocks = 0;
    protected endloop_blocks = 0;
    protected number_blocks = [0];

    /* SCENE VARIABLES */
    protected crates?: Phaser.Physics.Arcade.Group
    protected endCrates?: Phaser.Physics.Arcade.Group
    protected crane: Crane;
    protected start_instruction?: Instruction;

    // protected toggleVisibleButton?: Phaser.GameObjects.Text;
    protected score = 0;
    public Instructions?: Phaser.GameObjects.Container;
    public currentInstruction?: Instruction;

    //the background of the scene
    protected background?: Phaser.GameObjects.Image


    /* ESSENTIAL FUNCTIONS */

    constructor(key = "LevelScene"){
		super(key);
    }

    get getCrane(){
        return this.crane;
    }
    init(data:{levelNumber: number, gridData: GridData}) {
        this.Instructions = new Phaser.GameObjects.Container(this)
        this.grid = new Grid(data.gridData, true, this);
        this.secondaryGrid = new Grid(data.gridData, false, this);

        this.up_blocks = data.gridData.up_blocks;
        this.left_blocks = data.gridData.left_blocks;
        this.right_blocks = data.gridData.right_blocks;
        this.down_blocks = data.gridData.down_blocks;
        this.grab_blocks = data.gridData.grab_blocks;
        this.release_blocks = data.gridData.release_blocks;
        this.loop_blocks = data.gridData.loop_blocks;
        this.endloop_blocks = data.gridData.endloop_blocks;
        this.number_blocks = data.gridData.number_blocks;
        this.createLevel()
        this.input.on("drag",this.handleDrag,this);
        this.input.on("drop",this.handleDrop,this);
	}

    createLevel() {

        //create the background and set the scale
        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background');
        this.background.setScale(this.sys.game.canvas.width, this.sys.game.canvas.height);

        // Create Grid and pass handlers
        this.grid.makeGrid();
        this.crates = this.grid.crates;
        this.endCrates = this.grid.endCrates;
        this.crane = this.grid.crane;

        this.secondaryGrid.makeGrid();

        // create iframe and pass scene to it
        const iframe = document.getElementById('editor') as HTMLIFrameElement;
        console.log(iframe)
        const contentWnd = iframe.contentWindow as Window  & {scene: Level};
        contentWnd.scene = this;

        // makes drag and drop instructions
        this.generate_instructions();

        // create button to for executing instructions
        const executeButton = this.add.rectangle(this.sys.game.canvas.width-80, this.sys.game.canvas.height-130, 140, 30, 0x204060, 1);

        executeButton.setInteractive();
        executeButton.on('pointerover', () => {
            executeButton.setFillStyle(0x204060, 0.6);
        });
        executeButton.on('pointerout', () => {
            executeButton.setFillStyle(0x204060, 1);
        });
        const executeText = this.add.text(this.sys.game.canvas.width-80, this.sys.game.canvas.height-130, `execute!`, {
            fontSize: '18px',
            color: '#fff',
        });
        executeText.setOrigin(0.5);
        executeButton.on('pointerdown', () => {
            console.log(this.InstructionChainToString());
            this.execute(this.InstructionChainToString())
        });
        
        // create button to for going back to menu
        const levelSelectButton = this.add.rectangle(this.sys.game.canvas.width-80, this.sys.game.canvas.height-30, 140, 30, 0x204060, 1);

        levelSelectButton.setInteractive();
        levelSelectButton.on('pointerover', () => {
            levelSelectButton.setFillStyle(0x204060, 0.6);
        });
        levelSelectButton.on('pointerout', () => {
            levelSelectButton.setFillStyle(0x204060, 1);
        });
        const levelSelectText = this.add.text(this.sys.game.canvas.width-80, this.sys.game.canvas.height-30, `main menu`, {
            fontSize: '18px',
            color: '#fff',
        });
        levelSelectText.setOrigin(0.5);
        levelSelectButton.on('pointerdown', () => {
            this.scene.start(`MainMenuScene`);
        });

        // create button for reset level
        const resetButton = this.add.rectangle(this.sys.game.canvas.width-80, this.sys.game.canvas.height-80, 140, 30, 0x204060, 1);
        resetButton.setInteractive();
        resetButton.on('pointerover', () => {
            resetButton.setFillStyle(0x204060, 0.6);
        });
        resetButton.on('pointerout', () => {
            resetButton.setFillStyle(0x204060, 1);
        });
        const resetText = this.add.text(this.sys.game.canvas.width-80, this.sys.game.canvas.height-80, `reset`, {
            fontSize: '18px',
            color: '#fff',
        });
        resetText.setOrigin(0.5);
        resetButton.on('pointerdown', () => {
            this.grid.resetGrid();
            this.crates = this.grid.crates;
            this.crane = this.grid.crane;
        });
    }

    update(){
        if(this.crane !== undefined) {
            if(!this.physics.overlap(this.crane.PICKUP_BOX, this.crates, (_box, crate) => {
                    if(this.crane !== undefined) {
                        this.crane.toGrab = crate as Phaser.Physics.Arcade.Sprite;
                    }
                }
                )
            ) {
                this.crane.toGrab = undefined;
            }
        }
        this.checkWin();
    }

    /* HELPER FUNCTIONS */
    protected checkOverlap(c: Crate, ec:Crate) {
        if (c.getColor() !== ec.getColor()) {
            return false;
        }
        const xdiff = Math.abs( ec.body.position.x - c.body.position.x );
        const ydiff = Math.abs( ec.body.position.y - c.body.position.y );
        const diff = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
        return diff < 6;
    }

    protected getScore() {
        this.score = 0;
        this.crates?.getChildren().forEach((c) => {
            this.endCrates?.getChildren().forEach((ec) => {
                const crate = c as Crate
                const ecrate = ec as Crate
                if (this.checkOverlap(ecrate, crate)) {
                    this.score++;
                }
            })
        }, this)
    }

    protected checkWin() {
        this.getScore();
        const didWin = this.score === this.grid.maxScore;
        //console.log(this.score)
        if (didWin) {
            console.log("you win!")
            this.add.rectangle(400,300, 200,40, 0x000000);
            this.add.text(400,300,"YOU WIN!", {fontSize:"18px"}).setOrigin(0.5,0.5);
        }
        return didWin;
    }

    generate_instructions(){
        let currX = 100;
        let currY = 50;

        const fred = new Instruction(this, currX, currY, "start");
        // this.add.existing(fred);
        this.Instructions?.add([fred,fred.instructionText]);
        this.start_instruction = fred;

        currY += 50;

        const block_counts = [this.up_blocks, this.down_blocks, this.left_blocks, this.right_blocks, this.grab_blocks, this.release_blocks, this.loop_blocks, this.endloop_blocks];
        const block_types = ["up", "down", "left", "right", "grab", "release", "loop", "endloop"];

        for(let i = 0; i < block_counts.length; i ++) {
            for(let j = 0; j < block_counts[i]; j++) {
                const fred = new Instruction(this, currX, currY, block_types[i] as InstructionType);
                // this.add.existing(fred);
                this.Instructions?.add([fred,fred.instructionText]);
                currY += 50;
                if(currY >= 400) {
                    currX += 100;
                    currY = 50;
                }
            }
        }

        for(let i = 0; i < this.number_blocks.length; i++) {
            const fred = new Instruction(this, currX, currY, "number", this.number_blocks[i]);
            // this.add.existing(fred);
            this.Instructions?.add([fred,fred.instructionText]);
            currY += 50;
            if(currY >= 400) {
                currX += 100;
                currY = 50;
            }
        }
        this.add.existing(this.Instructions as Phaser.GameObjects.GameObject);
    }

    InstructionChainToString(){
        let currInstruction = this.start_instruction;
        if(this.start_instruction){
            let instructionString = "";
            while(currInstruction?.nextInstruction !== undefined){
                currInstruction = currInstruction.nextInstruction;
                instructionString += currInstruction.instructionType;
                if(currInstruction.instructionType === "loop") {
                    instructionString += " " + currInstruction.loopChild?.loopNumber;
                }
                instructionString += "\n"
            }
            console.log(instructionString)
            return instructionString;
        }
        return "";
    }

    execute(s: string) {
        const input = s;
        const chars = new CharStream(input);
        const lexer = new BlockLangLexer(chars);
        const tokens = new CommonTokenStream(lexer);
        const parser = new BlockLangParser(tokens);
        const tree = parser.program();
        const visitor = new BlockVisitor(null, this);
        console.log(visitor.visit(tree));
    }
    
    // when this is called from other scenes it will pass these values    
    handleDrag(_mouse: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, dragX: number, dragY: number) {

        if (!(gameObject instanceof Instruction)) {
            console.log(gameObject) // this should never happen as non of the other object are dragable
            return;
        }
        
        this.currentInstruction = gameObject;

        // bring gameobject (instruction) to bottom of all instructions
        this.Instructions?.sendToBack(gameObject);

        // console.log(gameObject)
        // removes parent relationship from the linked list segment when dragged
        if(gameObject.previousInstruction){
            if(gameObject.instructionType === "number"){
                gameObject.previousInstruction.loopChild = undefined;
            }
            else {
                gameObject.previousInstruction.nextInstruction = undefined;
            }
            
            gameObject.previousInstruction.dropArea = gameObject.previousInstruction.dropAreaLarge;
            gameObject.previousInstruction = undefined;
            
        }

        gameObject.moveInstruction(dragX, dragY);

        // gameObject.instructionText.depth = 999;
    }    
    
    handleDrop(_mouse: Phaser.Input.Pointer, dragTarget: Phaser.GameObjects.GameObject, dropTarget: Phaser.GameObjects.GameObject) {
        if(!(dropTarget instanceof Instruction) || !(dragTarget instanceof Instruction)){
            return;
        }
        
        //when im dropped on something that is an instruction, isn't me, and isn't a number
        if(dropTarget instanceof Instruction && dropTarget !== dragTarget && dropTarget.instructionType !== "number"){

                //number specific dropping
                if(dragTarget.instructionType === "number") {

                    //numbers can only be dropped into loops and loops should be empty
                    if(dropTarget.instructionType === "loop" && dropTarget.loopChild === undefined) {
                        
                        //adds it the list
                        dragTarget.previousInstruction = dropTarget;
                        dragTarget.previousInstruction.loopChild = dragTarget;

                        //moves the number that was dropped into place
                        dragTarget.moveInstruction(dragTarget.previousInstruction.x + 13, dragTarget.previousInstruction.y - 4);

                        //brings the number in the loop into place
                        this.Instructions?.bringToTop(dragTarget);
                        this.Instructions?.bringToTop(dragTarget.instructionText);
                        
                        // dropTarget.dropArea = dropTarget.dropAreaSmall;
                    }
                    
                    dragTarget.dropArea = dragTarget.dropAreaSmall;
                }
            
            //inserts this instruction into the linked list standard flow
            else if(dragTarget.previousInstruction === undefined && dropTarget.nextInstruction === undefined) {
                dragTarget.previousInstruction = dropTarget;
                dropTarget.nextInstruction = dragTarget;
                dragTarget.snapIntoPlace();
                dropTarget.dropArea = dropTarget.dropAreaSmall;
            }
        }
    }
}