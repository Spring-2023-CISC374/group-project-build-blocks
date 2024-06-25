import { LevelObject } from "../types/LevelObject";

export interface GridData {
    width: number;

    height: number;

    gridObjects: LevelObject[][];

    gridObjectives: LevelObject[][];

    start_blocks: number;
    loop_blocks: number;
    endloop_blocks: number;
    left_blocks: number;
    right_blocks: number;
    down_blocks: number;
    up_blocks: number;
    grab_blocks: number;
    release_blocks: number;
    number_blocks: number[];
}