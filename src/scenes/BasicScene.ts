import { GridData } from '../interfaces/GridData';
import Level from './Level';

export default class BasicScene extends Level {

    private blockCount = "left: unlimited\nright: unlimited\nup: unlimited \ndown: unlimited\nclose: unlimited\nopen: unlimited\nloops: unlimited\nnumbers: unlimited\n\nsample program:\n\nloop 3\nup\nup\nright\nendloop";
    private goal = "GOAL\nE E E E E\nE E C E E\nE E T E E\nE E T E E\nE E T E E\n\nE = empty\nC = crane\nT = tan\nR = Red\nG = green\nB = blue";

    /* ESSENTIAL FUNCTIONS */
    constructor() {
        const GRIDDATA: GridData = { width: 5, height: 5, 
            gridObjects: [
                ["none", "none", "none", "none", "crane"],
                ["none", "none", "none", "none", "none"],
                ["none", "none", "none", "none", "none"],
                ["none", "none", "none", "none", "none"],
                ["crate-brown", "crate-brown", "crate-brown", "none", "none"]
            ],
            gridObjectives: [
                ["none", "none", "none", "none", "none"],
                ["none", "none", "none", "none", "none"],
                ["none", "none", "crate-brown", "none", "none"],
                ["none", "none", "crate-brown", "none", "none"],
                ["none", "none", "crate-brown", "none", "none"]
            ]
        }
        

		super(1, GRIDDATA, 3);
	}

    create() {
        this.createLevel();

        this.add.text(550, 0, this.blockCount, {color: "black"});
        this.add.text(350, 0, this.goal, {color: "black"});
    }
}