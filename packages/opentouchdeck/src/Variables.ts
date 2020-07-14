export default class Variables {
    private static storage: Variable[] = [];

    static getVariables(): string[] {
        return this.storage.map(variable => variable.name);
    }

    static getVariable(variableName: string): any {
        var found = this.storage.find(item => item.name === variableName);
        if (found !== undefined) {
            return found.data;
        }
        
        return null;
    }

    static setVariable(variableName: string, variableData: any): boolean {
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

        return true;
    }

    static deleteVariable(variableName: string) {
        this.storage = this.storage.filter(item => item.name !== variableName)
    }
}
export interface Variable {
    name: string;
    data: any;
}