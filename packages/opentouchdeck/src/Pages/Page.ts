import Button from '../Buttons/Button';

export default class Page {
	title: string = "";
	buttons: Button[] = [];

	static fromJSON(data: any = {}): Page {
		let page: Page = new Page();
		page.title = data.title;

		if (data.buttons) {
			data.buttons.forEach(function (item: any) {
				let button: Button = Button.fromJSON(item);
				page.buttons.push(button);
			});
		}
		return page;
	}
}
