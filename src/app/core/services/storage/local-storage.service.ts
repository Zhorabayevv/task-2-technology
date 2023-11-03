import { Injectable } from '@angular/core';
import { AppConfigService } from '@services/configuration/app-config.service';
import { IStorage } from '@app/core/interfaces/storage.interface';
import { ObjectUtil } from '@utils/object-util';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService implements IStorage {
    private readonly _key: string;
    private readonly _version: string;

    public constructor() {
        this._key = AppConfigService.storagePrefix;
        this._version = AppConfigService.dynamicConfig.storageVersion;
        this._checkVersion();
    }

    public get length(): number {
        return localStorage.length;
    }

    public getItem(key: string): string | null {
        return localStorage.getItem(`${this._key}${key}`);
    }

    public setItem(key: string, value: string): void {
        localStorage.setItem(`${this._key}${key}`, value);
    }

    public clear(): void {
        localStorage.clear();
    }

    public key(index: number): string | null {
        return localStorage.key(index);
    }

    public removeItem(key: string): void {
        localStorage.removeItem(`${this._key}${key}`);
    }

    public getItemParsed<T>(key: string): T | null {
        return ObjectUtil.parse<T>(this.getItem(key));
    }

    public setItemParsed<T>(key: string, value: T): void {
        if (key && value) {
            this.setItem(key, JSON.stringify(value));
        }
    }

    private _checkVersion(): void {
        const version = this.getItem(`${this._key}storageVersion`);

        if (!version || (version && version < this._version)) {
            // Remove storage
            this._removeStorage(!version);
            this._setVersion();
        }
    }

    private _removeStorage(force?: boolean): void {
        if (force) {
            localStorage.clear();

            return;
        }

        const keys = Object.keys(localStorage);

        for (const key of keys) {
            if (key.startsWith(this._key)) {
                localStorage.removeItem(key);
            }
        }
    }

    private _setVersion(): void {
        this.setItem(`${this._key}storageVersion`, this._version);
    }

    [name: string]: any;
}
