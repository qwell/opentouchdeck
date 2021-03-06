import Variables, { Variable } from '../Variables';

export default class VariablesAPI {
    getVariables(): string[] {
        return Variables.getVariables();
    }
    getVariable(name: string): any {
        return Variables.getVariable(name);
    }
    setVariable(name: string, data: any) {
        Variables.setVariable(name, data);
    }
}