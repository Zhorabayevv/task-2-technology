import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { BasePageComponent } from '@core/classes/base-page-component';

@Component({
    selector: 'owner-page-base',
    standalone: true,
    imports: [CoreModule, SharedModule],
    templateUrl: './page-base.component.html',
    styleUrls: ['./page-base.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageBaseComponent extends BasePageComponent {

}
