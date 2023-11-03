import { APP_INITIALIZER, NgModule } from '@angular/core';
import { APP_INITIALIZER_FN, AppConfigService } from '@services/configuration/app-config.service';
import { HttpClientModule } from '@angular/common/http';

export const APP_CONFIG_INITIALIZER = [
    AppConfigService,
    {
        provide: APP_INITIALIZER,
        useFactory: APP_INITIALIZER_FN,
        multi: true,
        deps: [AppConfigService],
    },
];

@NgModule({
    declarations: [],
    imports: [HttpClientModule],
    providers: [APP_CONFIG_INITIALIZER],
})
export class CoreModule {}
