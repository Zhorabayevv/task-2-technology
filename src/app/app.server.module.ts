import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { LocalStorageService } from '@services/storage/local-storage.service';
import { ServerLocalStorageService } from '@services/storage/server-local-storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UniversalInterceptor } from '@core/interceptors/universal.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UniversalDeviceDetectorService } from '@services/universal-device-detector.service';

@NgModule({
    imports: [AppModule, ServerModule],
    bootstrap: [AppComponent],
    providers: [
        { provide: LocalStorageService, useClass: ServerLocalStorageService },
        { provide: CookieService, useClass: SsrCookieService },
        { provide: HTTP_INTERCEPTORS, useClass: UniversalInterceptor, multi: true },
        {
            provide: DeviceDetectorService,
            useClass: UniversalDeviceDetectorService,
        },
    ],
})
export class AppServerModule {}
