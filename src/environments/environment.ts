import { defaultConfig } from '@env/default.configuration';
import { IEnvironmentInterface } from '@interfaces/environment-interface';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const environment: IEnvironmentInterface = {
    production: false,
    isServer: false,
    configURL: '/assets/data/config_dev.json',
    dynamicConfig: defaultConfig,
};
