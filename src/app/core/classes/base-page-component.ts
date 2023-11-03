import { BaseComponent } from '@core/classes/base-component';
import { Component, HostBinding } from '@angular/core';

@Component({
    template: '',
})
export abstract class BasePageComponent extends BaseComponent {
    @HostBinding('class') protected class = 'page-wrapper';
}
