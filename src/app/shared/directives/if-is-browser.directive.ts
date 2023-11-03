import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { environment } from '@env/environment';
import { NgIfContext } from '@angular/common';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[ifIsBrowser]',
})
export class IfIsBrowserDirective<T = unknown> {
    public constructor(private _templateRef: TemplateRef<NgIfContext<T>>, private _viewContainer: ViewContainerRef) {
        if (!environment.isServer) {
            _viewContainer.createEmbeddedView(_templateRef);
        }
    }
}
