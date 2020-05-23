import Position from './Position';

export default class Page {
	title : string = "";
	positions : Position[] = [];

	static fromJSON(data : any = {}) : Page {
		let page : Page = new Page();
		page.title = data.title;

		if (data.positions) {
			data.positions.forEach(function(data : any) {
				let position : Position = Position.fromJSON(data);
				page.positions.push(position);
			});
		}
		return page;
	}
}
