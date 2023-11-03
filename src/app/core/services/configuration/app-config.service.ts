import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { log } from '@services/logger/app-console-logger.service';

import { ISettingsConfig } from '@interfaces/settings-config.interface';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { slog } from '@services/logger/app-console-server-logger.service';

export const APP_INITIALIZER_FN = (configService: AppConfigService) => (): Observable<ISettingsConfig> =>
    configService.loadAppConfig();

@Injectable()
export class AppConfigService {
    public static readonly storagePrefix = 'esim_';
    private static _dConfig: ISettingsConfig;
    private readonly _isServer;
    private readonly _defaultConfig: ISettingsConfig;
    private _configuration: ISettingsConfig;

    public constructor(private _http: HttpClient) {
        this._isServer = environment.isServer;

        this._configuration = this._defaultConfig = {
            ...environment.dynamicConfig,
            baseUrl: this._isServer ? environment.dynamicConfig.serverBaseUrl : environment.dynamicConfig.baseUrl,
        };

        AppConfigService._dConfig = this._configuration;
    }

    public loadAppConfig(): Observable<ISettingsConfig> {
        return this._http.get(environment.configURL).pipe(
            map((configuration: any) => {
                return { ...configuration } as ISettingsConfig;
            }),
            tap((configuration: ISettingsConfig) => {
                this._setConfiguration({ ...this._defaultConfig, ...configuration });
            }),
            catchError(() => of(this._defaultConfig)),
        );
    }

    public config(): Readonly<ISettingsConfig> {
        return this._configuration;
    }

    public static get dynamicConfig(): Readonly<ISettingsConfig> {
        return this._dConfig;
    }

    private static set _dynamicConfig(config: ISettingsConfig) {
        this._dConfig = config;
    }

    private _setConfiguration(config: ISettingsConfig): void {
        const localConfig = {
            ...config,
            baseUrl: this._isServer ? config.serverBaseUrl : config.baseUrl,
        };

        this._configuration = localConfig;
        log.logging = localConfig.logging;
        slog.logging = localConfig.logging;
        AppConfigService._dynamicConfig = localConfig;
    }
}
