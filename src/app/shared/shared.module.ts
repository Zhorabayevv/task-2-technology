import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HamburgerComponent } from './components/hamburger/hamburger.component';
import { TurnOverComponent } from './components/turn-over/turn-over.component';
import { IfIsBrowserDirective } from '@shared/directives/if-is-browser.directive';
import { NgZorroAntdModule } from './ng-zorro-antd/ng-zorro-antd.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
    ApplicabilitySectionComponent
} from '@shared/components/applicability-section/applicability-section.component';

const OWNER_MODULES_EXPORT = [CommonModule];

@NgModule({
    declarations: [
        HeaderComponent,
        HamburgerComponent,
        TurnOverComponent,

        IfIsBrowserDirective,
        ApplicabilitySectionComponent
    ],
    imports: [...OWNER_MODULES_EXPORT, NgOptimizedImage, NgZorroAntdModule, FormsModule, ReactiveFormsModule],
    exports: [
        HeaderComponent,
        ApplicabilitySectionComponent,
        TurnOverComponent,

        IfIsBrowserDirective,

        ...OWNER_MODULES_EXPORT,
    ],
})
export class SharedModule {
}
