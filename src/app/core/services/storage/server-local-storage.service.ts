import { Injectable } from '@angular/core';
import { IStorage } from '@app/core/interfaces/storage.interface';

@Injectable({
    providedIn: 'root',
})
export class ServerLocalStorageService implements IStorage {
    private readonly _storage = new Map<string, string>();

    public get length(): number {
        return this._storage.size;
    }

    public getItem(key: string): string | null {
        return this._storage.get(key) ?? null;
    }

    public setItem(key: string, value: string): void {
        this._storage.set(key, value);
    }

    public clear(): void {
        this._storage.clear();
    }

    public key(index: number): string | null {
        return index < this._storage.size ? [...this._storage.keys()][index] : null;
    }

    public removeItem(key: string): void {
        this._storage.delete(key);
    }

    public getItemParsed<T>(key: string): T | null {
        const item = this.getItem(key);

        if (item) {
            return JSON.parse(item) as T;
        }

        return null;
    }

    public setItemParsed<T>(key: string, value: T): void {
        if (key && value) {
            this.setItem(key, JSON.stringify(value));
        }
    }
}
