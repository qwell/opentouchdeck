export default class Board {
	id : number = -1;

	static fromJSON(data : any) : Board {
		var board = new Board();
		if (data.id) {
			board.id = parseInt(data.id);
		}
		return board;
	}
}
