export const makeAdjacentTilesMap = ({ height, width }: { height: number; width: number }) => {
	return Array.from({ length: height * width }).map((value, index) => {
		const adjacentTiles = [
			index - width,
			index % width !== 0 && index - 1,
			index % width !== width - 1 && index + 1,
			index + width
		].filter((value) => value !== false && value > -1 && value < height * width);

		return adjacentTiles;
	}) as number[][];
};
