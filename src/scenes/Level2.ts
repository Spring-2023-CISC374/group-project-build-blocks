import { GridData } from '../interfaces/GridData';
import Level from '../objects/Level';

export default class Level2 extends Level {

    private blockCount = "left: unlimited\nright: unlimited\nup: unlimited \ndown: unlimited\nclose: unlimited\nopen: unlimited\nloops: unlimited\nnumbers: unlimited\n\nsample program:\n\nloop 3\nup\nup\nright\nendloop";
    private goal = "GOAL\nE E E E C\nE E E E E\nB R G E E\nB R G E E\nB R G E E\n\nE = empty\nC = crane\nT = tan\nR = Red\nG = green\nB = blue";

    /* ESSENTIAL FUNCTIONS */
    constructor() {
        const GRIDDATA: GridData = { width: 5, height: 5, 
            gridObjects: [
                ["none", "none", "none", "none", "crane"],
                ["none", "none", "none", "none", "none"],
                ["none", "none", "none", "none", "crate-red"],
                ["crate-green", "crate-red", "crate-blue", "none", "crate-blue"],
                ["crate-red", "crate-blue", "crate-green", "none", "crate-green"]
            ],
            gridObjectives: [
                ["none", "none", "none", "none", "none"],
                ["none", "none", "none", "none", "none"],
                ["crate-blue", "crate-red", "crate-green", "none", "none"],
                ["crate-blue", "crate-red", "crate-green", "none", "none"],
                ["crate-blue", "crate-red", "crate-green", "none", "none"]
            ]
        }
        

		super(1, GRIDDATA, 9);
	}

    create() {
        this.createLevel();

        this.add.text(550, 0, this.blockCount, {color: "black"});
        this.add.text(350, 0, this.goal, {color: "black"});
    }
}