import Config from './Config';

export default class ConfigJSON extends Config {
	constructor(data: any) {
		super(data);
	}

	show() {
		console.log(JSON.stringify(this.data));
	}
}
