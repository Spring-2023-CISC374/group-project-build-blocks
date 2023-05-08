import { GridData } from "../interfaces/GridData";
import { LevelObject } from "../types/LevelObject";

let levelData: GridData = {
	width: 5, height: 5,
	gridObjects: [
		["none", "none", "none", "none", "crane"],
		["none", "none", "none", "none", "none"],
		["none", "none", "none", "none", "crate-red"],
		["crate-green", "crate-red", "crate-blue", "none", "crate-blue"],
		["crate-red", "crate-blue", "crate-green", "none", "crate-green"]
	] as LevelObject[][],
	gridObjectives: [
		["none", "none", "none", "none", "none"],
		["none", "none", "none", "none", "none"],
		["crate-blue", "crate-red", "crate-green", "none", "none"],
		["crate-blue", "crate-red", "crate-green", "none", "none"],
		["crate-blue", "crate-red", "crate-green", "none", "none"]
	] as LevelObject[][],
	start_blocks: 1,
	loop_blocks: 2,
	endloop_blocks: 2,
	left_blocks: 6,
	right_blocks: 6,
	down_blocks: 6,
	up_blocks: 6,
	grab_blocks: 3,
	release_blocks: 3,
	number_blocks: [1, 2, 3, 4],
};

let selectedCrateColor: LevelObject| undefined = undefined;
const CRATE_COLORS: LevelObject[] = ["none", "crate-red", "crate-blue", "crate-green", "crate-brown", "crane"];

function renderGrid(grid: HTMLElement, gridData: LevelObject[][]) {
	grid.className = "grid";
	// delete all children and reset grid template (this might be slow)
	grid.innerHTML = "";
	grid.style.gridTemplateColumns = `repeat(${levelData.width}, 25px)`;
	grid.style.gridTemplateRows = `repeat(${levelData.height}, 25px)`;

	for (let row = 0; row < levelData.height; row++) {
		for (let col = 0; col < levelData.width; col++) {
			const item = document.createElement("div");
			item.className = `grid-item ${gridData[row][col]}`;
			item.dataset.row = row.toString();
			item.dataset.col = col.toString();
			grid.appendChild(item);
		}
	}

	return grid;
}

document.getElementById("grids-container")!.addEventListener("click", e => {
	const item = e.target as HTMLElement;
	if (!item.classList.contains("grid-item")) return;
	const row = parseInt(item.dataset.row!);
	const col = parseInt(item.dataset.col!);

	if (selectedCrateColor) {
		if (item.parentElement!.id === "grid") {
			levelData.gridObjects[row][col] = selectedCrateColor;
			item.className = `grid-item ${selectedCrateColor}`;
		} else if (item.parentElement!.id === "objective-grid") {
			levelData.gridObjectives[row][col] = selectedCrateColor;
			item.className = `grid-item ${selectedCrateColor}`;
		}
	}
});

const resizeButton = document.getElementById("resize-button");
resizeButton!.addEventListener("click", () => {
	const width = parseInt((document.getElementById("width-input") as HTMLInputElement).value);
	const height = parseInt((document.getElementById("height-input") as HTMLInputElement).value);

	levelData.width = width;
	levelData.height = height;
	// levelData.gridObjects = Array(height).fill().map(() => Array(width).fill("none"));
	levelData.gridObjects = Array(height).fill(Array(width).fill("none"));
	levelData.gridObjectives = Array(height).fill(Array(width).fill("none"));

	renderGrid(document.getElementById("grid")!, levelData.gridObjects);
	renderGrid(document.getElementById("objective-grid")!, levelData.gridObjectives);
});

const cratePicker = document.getElementById("crate-picker");
for (let i = 0; i < CRATE_COLORS.length; i++) {
	const button = document.createElement("button");
	button.innerText = CRATE_COLORS[i];
	button.classList.add(CRATE_COLORS[i]);
	button.onclick = () => {
		selectedCrateColor = CRATE_COLORS[i];
	};
	cratePicker!.appendChild(button);
}

document.getElementById("save-btn")!.addEventListener("click", () => {
	const dataStr = JSON.stringify(levelData, null, 2);
	const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
	const exportFileDefaultName = "level.json";
	const linkElement = document.createElement("a");
	linkElement.setAttribute("href", dataUri);
	linkElement.setAttribute("download", exportFileDefaultName);
	linkElement.click();
});

document.getElementById("load-btn")!.addEventListener("click", () => {
	const input = document.createElement("input");
	input.type = "file";
	input.accept = "application/json";
	input.addEventListener("change", e => {
		const file = (e.target! as HTMLInputElement).files![0];
		const reader = new FileReader();
		reader.onload = () => {
			const dataStr = reader.result;
			levelData = JSON.parse(dataStr?.toString()!);
			renderGrid(document.getElementById("grid")!, levelData.gridObjects);
			renderGrid(document.getElementById("objective-grid")!, levelData.gridObjectives);
		};
		reader.readAsText(file);
	});
	input.click();
});

document.getElementById("clear-btn")!.addEventListener("click", () => {
	levelData.gridObjects = levelData.gridObjects.map(row => row.map(() => "none"));
	levelData.gridObjectives = levelData.gridObjectives.map(row => row.map(() => "none"));
	renderGrid(document.getElementById("grid")!, levelData.gridObjects);
	renderGrid(document.getElementById("objective-grid")!, levelData.gridObjectives);
});

// update block counts
function updateBlockCt() {
	["start", "loop", "endloop", "left", "right", "up", "down", "grab", "release"].forEach(blockType => {
		const input = document.getElementById(`${blockType}-blocks`) as HTMLInputElement;
		input.value = levelData[`${blockType}_blocks` as keyof GridData].toString();
	});
}

document.getElementById("block-counts")!.addEventListener("change", e => {
	const blockType = (e.target! as HTMLInputElement).id.split("-")[0];
	const count = parseInt((e.target! as HTMLInputElement).value);
	levelData[`${blockType}_blocks` as keyof GridData] = count as any;
});

renderGrid(document.getElementById("grid")!, levelData.gridObjects);
renderGrid(document.getElementById("objective-grid")!, levelData.gridObjectives);

updateBlockCt();
