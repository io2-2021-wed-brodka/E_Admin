import {Injectable} from '@angular/core';

@Injectable()
export class CommonService {

    private thousandRegex: RegExp = new RegExp(/\B(?=(\d{3})+(?!\d))/g);

    constructor() {
    }

    extractAttribute(row: any, field: string): string {
        const result = field ? field.indexOf('.') > -1 ? this.getNestedAttribute(row, field) : row[field] : '';
        return result ? result : '';
    }


    getNestedAttribute(object: object, path: string, separator: string = ''): any {
        try {
            separator = separator || '.';
            return path.replace('[', separator)
                .replace(']', '')
                .split(separator)
                .reduce(function (obj, property) {
                    return obj[property];
                }, object);
        } catch (err) {
            return undefined;
        }
    }

    isNotNull(val: any): boolean {
        return val != null;
    }

}
