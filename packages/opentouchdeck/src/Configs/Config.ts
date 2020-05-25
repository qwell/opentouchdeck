import ConfigData from './ConfigData';

export default class Config {
	data: ConfigData;

	constructor(data: ConfigData) {
		this.data = data;
	}

	protected read() {
	}

	protected write() {
	}
}
