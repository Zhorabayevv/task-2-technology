import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { BaseModel } from '@core/classes/base.model';

@Component({
    template: '',
})
export abstract class BaseComponent extends BaseModel implements OnDestroy {
    protected _onDestroy$: Subject<void> = new Subject<void>();

    public ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }
}
