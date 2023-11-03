import { IEnvironmentInterface } from '@interfaces/environment-interface';
import { defaultConfig } from '@env/default.configuration';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const environment: IEnvironmentInterface = {
    production: false,
    isServer: false,
    configURL: '/assets/data/config_dev.json',
    dynamicConfig: defaultConfig,
};
