import { noop } from 'rxjs';
import { environment } from '@env/environment';
import { TypeConsole } from '@core/types/console.type';

// eslint-disable-next-line @typescript-eslint/naming-convention
export class slog {
    private static _isServer = environment.isServer ?? false;
    private static _isDebugMode = false;
    private static _isInitial = false;

    public static set logging(l: boolean) {
        if (!this._isInitial) {
            this._isDebugMode = l;
            this._isInitial = true;
        }
    }

    public static get info(): TypeConsole {
        if (this._isDebugMode && this._isServer) {
            // eslint-disable-next-line no-console
            return console.info.bind(console, slog._getPrefix('INFO'));
        } else {
            return noop;
        }
    }

    public static get warn(): TypeConsole {
        if (this._isDebugMode && this._isServer) {
            // eslint-disable-next-line no-console
            return console.warn.bind(console, slog._getPrefix('WARN'));
        } else {
            return noop;
        }
    }

    public static get error(): TypeConsole {
        if (this._isDebugMode && this._isServer) {
            // eslint-disable-next-line no-console
            return console.error.bind(console, slog._getPrefix('ERROR'));
        } else {
            return noop;
        }
    }

    private static _getPrefix(logLevel: string): string {
        return `[${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}.${new Date().getMilliseconds()} ${logLevel}]`;
    }
}
