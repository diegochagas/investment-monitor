
export class SymbolValue {
    [index: string]: number;

    constructor(data: any) {
        Object.keys(data).forEach((key) => {
            this[key] = data[key];
        });
    }
}