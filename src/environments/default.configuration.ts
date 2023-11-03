import { ISettingsConfig } from '@interfaces/settings-config.interface';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const defaultConfig: ISettingsConfig = {
    logging: false,
    timeoutRequest: 30000,
    baseUrl: 'http://localhost:4200',
    storageVersion: '0.0.0',
    serverBaseUrl: 'http://localhost:4200',
};
