import { LevelObject } from "../types/LevelObject";

export interface GridData {
    width: number;

    height: number;

    gridObjects: LevelObject[][];

    gridObjectives: LevelObject[][];
}