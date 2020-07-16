import Config from './Config';
import { ConfigData } from '..';

export default class ConfigJSON extends Config {
	constructor(data: any) {
		super(data);
	}

	show() {
		console.log(JSON.stringify(ConfigData.getPages()));
	}
}
