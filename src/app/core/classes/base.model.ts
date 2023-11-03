import { log } from '@services/logger/app-console-logger.service';

export abstract class BaseModel {
    protected _logger = log;

    private static _getClassName(object: object): string {
        return object.constructor.name;
    }

    private static _getHash(str: string): number {
        let h = 0;

        for (let i = 0; i < str.length; i++) {
            h = 31 * h + str.charCodeAt(i);
        }

        // tslint:disable-next-line:no-bitwise
        return h & 0xFFFFFFFF;
    }

    protected getClass(): string {
        return BaseModel._getClassName(this);
    }

    protected toString(): string {
        return `${this.getClass()}@`;
    }

    protected hashCode(): number | undefined {
        try {
            return BaseModel._getHash(JSON.stringify(this));
        } catch (err) {
            this._logger.error('Object argument required.');
        }

        return undefined;
    }
}
