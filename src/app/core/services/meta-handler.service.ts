import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class MetaHandlerService {
    private _title = inject(Title);
    private _meta = inject(Meta);

    public setTitle(title: string): void {
        this._title.setTitle(title);
    }

    public addTag(tag: { [key: string]: string }): void {
        this._meta.addTag(tag);
    }

    public removeTag(selector: string): void {
        this._meta.removeTag(selector);
    }

    public getTag(selector: string): HTMLMetaElement | null {
        return this._meta.getTag(selector);
    }
}
