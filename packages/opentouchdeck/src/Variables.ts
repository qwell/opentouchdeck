export default class Variables {
    private static storage: Variable[] = [];

    static getVariable(variableName: string): any {
        var found = this.storage.find(item => item.name === variableName);
        if (found !== undefined) {
            return found.data;
        }
    }

    static setVariable(variableName: string, variableData: any) {
        var found: Variable | undefined = this.storage.find(item => item.name === variableName)
        if (found !== undefined) {
            found.data = variableData;
        } else {
            found = {
                name: variableName,
                data: variableData
            }
            this.storage.push(found);
        }
    }

    static deleteVariable(variableName: string) {
        this.storage = this.storage.filter(item => item.name !== variableName)
    }
}
export interface Variable {
    name: string;
    data: any;
}