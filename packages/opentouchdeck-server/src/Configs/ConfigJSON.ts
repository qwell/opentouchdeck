import Config from './Config';
import ConfigData from './ConfigData';

export default class ConfigJSON extends Config {
	constructor(data: any) {
		super(data);
	}

	show() {
		console.log(JSON.stringify(ConfigData.getPages()));
	}
}
