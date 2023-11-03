import { ChangeDetectorRef, Component, HostListener, Inject } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DeviceInfo } from 'ngx-device-detector/lib/device-detector.service';
import { log } from '@services/logger/app-console-logger.service';
import { WINDOW } from '@tokens/window.token';
import { environment } from '@env/environment';

@Component({
    selector: 'owner-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public orientationChangeRequired = false;
    public deviceInfo: DeviceInfo | null = null;
    public isMobileDevice = false;

    public constructor(
        private _deviceService: DeviceDetectorService,
        private _changeDetector: ChangeDetectorRef,
        @Inject(WINDOW) private _window: Window,
    ) {
        this.deviceInfo = this._deviceService.getDeviceInfo();
        this.isMobileDevice = this.deviceInfo.deviceType === 'mobile';

        // if (environment.isServer) {
        //     this.orientationChangeRequired = false;
        // } else {
        //     this.orientationChangeRequired = this.isMobileDevice && this.deviceInfo.orientation === 'landscape';
        // }
    }

    @HostListener('window:orientationchange', ['$event'])
    public onOrientationChange(): void {
        this.orientationChangeRequired = this.isMobileDevice && ['landscape-primary', 'landscape-secondary'].includes(screen.orientation.type);
    }
}
