import { Inject, Injectable, Optional } from '@angular/core';
import { ThemeApiService } from '@app/node-api/services/theme-api.service';
import { ThemeType } from '@app/node-api/models/theme-type';
import { BehaviorSubject, Observable } from 'rxjs';
import { COOKIES_TOKEN } from '@tokens/cookies.token';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@env/environment';
import { PropsKey } from '@core/constants/props-key';
import { THEME_CLASS } from '@tokens/running-port.token';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    public constructor(
        private _themeApiService: ThemeApiService,
        private _cookieService: CookieService,
        @Optional()
        @Inject(COOKIES_TOKEN)
        protected _cookies: Readonly<Map<string, string>>,
        @Optional() @Inject(THEME_CLASS) private _themeClass: string,
    ) {
        this._currentTheme$ = new BehaviorSubject<ThemeType>(this.getTheme());
    }

    private readonly _currentTheme$: BehaviorSubject<ThemeType>;

    public get currentTheme$(): Readonly<Observable<string>> {
        return this._currentTheme$;
    }

    public setTheme(theme: ThemeType): void {
        this._themeApiService.setTheme({ theme }).subscribe(_ => {
            this._currentTheme$.next(theme);
        });
    }

    public getTheme(): Readonly<ThemeType> {
        let theme: string;

        if (environment.isServer) {
            theme = this._themeClass;
        } else {
            theme = this._cookieService?.get(PropsKey.THEME_COOKIE_NAME);
        }

        return this._getTheme(theme);
    }

    private _getTheme(theme: string | undefined): Readonly<ThemeType> {
        if (theme === 'owner-light-theme') {
            return ThemeType.OwnerLightTheme;
        }

        return ThemeType.OwnerDarkTheme;
    }

    public get isLight(): boolean {
        return this._currentTheme$.value === 'owner-light-theme';
    }
}
