import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    Inject,
    Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from '@services/theme.service';
import { ThemeType } from '@app/node-api/models/theme-type';
import { BaseComponent } from '@core/classes/base-component';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'owner-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends BaseComponent {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public ThemeType = ThemeType;
    public currentTheme: string | null | undefined = null;
    public isLight = this._themeService.isLight;
    public isOpenMenu = false;
    public hideLine = false;
    public hideHeader = false;
    private _isFullscreen = false;

    private readonly _body;

    public constructor(
        private _renderer: Renderer2,
        private _themeService: ThemeService,
        @Inject(DOCUMENT) private _document: Document,
        private _changeDetector: ChangeDetectorRef,
    ) {
        super();
        this._body = _document.querySelector('body');

        this._themeService.currentTheme$
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(theme => {
                this._setTheme(theme);
                this.isLight = this._themeService.isLight;
                this._changeDetector.markForCheck();
            });
    }

    @HostListener('window:scroll', ['$event']) // for window scroll events
    public onScroll(_: Event): void {
        this.hideLine = this._document.documentElement.scrollTop > 0;

        if (this._isFullscreen)
            this.hideHeader = this._document.documentElement.scrollTop <= 0;
    }

    @HostListener('window:fullscreenchange', ['$event'])
    public publicOnFullscreenChange(_: Event): void {
        const value = !!document.fullscreenElement;

        this._isFullscreen = value;

        if (value) {
            this.hideHeader = true;

            window.scrollTo({
                top: 0,
            });
        } else
            this.hideHeader = false;
    }

    public changeTheme(theme: ThemeType): void {
        this._themeService.setTheme(theme);
        this._setTheme(theme.toString());
    }

    private _setTheme(theme: string): void {
        if (this.currentTheme !== theme) {
            if (this.currentTheme) {
                this._renderer.removeClass(this._body, this.currentTheme);
            }

            this.currentTheme = theme;
            this._renderer.addClass(this._body, this.currentTheme);
        }
    }
}
