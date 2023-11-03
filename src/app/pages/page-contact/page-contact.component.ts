import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasePageComponent } from '@core/classes/base-page-component';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

@Component({
    selector: 'owner-page-contact',
    standalone: true,
    imports: [CoreModule, SharedModule],
    templateUrl: './page-contact.component.html',
    styleUrls: ['./page-contact.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageContactComponent extends BasePageComponent {

}
