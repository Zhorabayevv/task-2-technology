import { noop } from 'rxjs';
import { environment } from '@env/environment';
import { TypeConsole } from '@core/types/console.type';

// eslint-disable-next-line @typescript-eslint/naming-convention
export class log {
    private static _isBrowser = !environment.isServer ?? false;
    private static _isDebugMode = false;
    private static _isInitial = false;

    public static set logging(l: boolean) {
        if (!this._isInitial) {
            this._isDebugMode = l;
            this._isInitial = true;
        }
    }

    public static get info(): TypeConsole {
        if (this._isDebugMode && this._isBrowser) {
            // eslint-disable-next-line no-console
            return console.info.bind(console, log._getPrefix('INFO'));
        } else {
            return noop;
        }
    }

    public static get warn(): TypeConsole {
        if (this._isDebugMode && this._isBrowser) {
            // eslint-disable-next-line no-console
            return console.warn.bind(console, log._getPrefix('WARN'));
        } else {
            return noop;
        }
    }

    public static get error(): TypeConsole {
        if (this._isDebugMode && this._isBrowser) {
            // eslint-disable-next-line no-console
            return console.error.bind(console, log._getPrefix('ERROR'));
        } else {
            return noop;
        }
    }

    private static _getPrefix(logLevel: string): string {
        return `[${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}.${new Date().getMilliseconds()} ${logLevel}]`;
    }
}
