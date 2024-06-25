import { GridData } from './GridData';

export interface GridVars {
    GRID_START_BOTTOM: number;
    GRID_START_LEFT: number;
    GRID_SQUARE_SIZE: number;

    GRID_END_RIGHT: number;
    GRID_END_TOP: number

    GRID_MID_HORIZONTAL: number;
    GRID_MID_VERTICAL: number;
}

export function fillGridVars(bottom: number, left: number, sqsize: number, gridData: GridData): GridVars {
    const newVars: GridVars = {
        GRID_START_BOTTOM: bottom,
        GRID_START_LEFT: left,
        GRID_SQUARE_SIZE: sqsize,

        GRID_END_RIGHT: left + sqsize * gridData.width,
        GRID_END_TOP: bottom + sqsize * gridData.height,

        GRID_MID_HORIZONTAL: ( left + sqsize * gridData.width + left ) / 2,
        GRID_MID_VERTICAL: ( bottom + sqsize * gridData.height  + bottom ) / 2
    };
    return newVars;
}