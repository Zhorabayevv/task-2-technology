import { ISettingsConfig } from './settings-config.interface';

export interface IEnvironmentInterface {
    production: boolean;
    isServer: boolean;
    configURL: string;
    dynamicConfig: ISettingsConfig;
}
