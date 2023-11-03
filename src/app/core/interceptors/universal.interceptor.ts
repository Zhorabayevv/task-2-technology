import { Inject, Injectable, Optional } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Request } from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Observable, timeout } from 'rxjs';
import { RUNNING_PORT } from '@tokens/running-port.token';
import { AppConfigService } from '@services/configuration/app-config.service';
import { environment } from '@env/environment';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
    public constructor(
        @Inject(RUNNING_PORT) private _port: number,
        @Optional() @Inject(REQUEST) protected _request: Request,
    ) {}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const baseUrl = AppConfigService.dynamicConfig.baseUrl;
        const defaultConfig = { ...environment.dynamicConfig };
        let serverReq: HttpRequest<any> = req;

        if (baseUrl === defaultConfig?.baseUrl || !serverReq.url.startsWith(baseUrl)) {
            if (this._request && !serverReq.url.startsWith('http')) {
                let url = `http://localhost:${this._port}`;

                if (!req.url.startsWith('/')) {
                    url += '/';
                }

                url += req.url;
                serverReq = req.clone({ url });
            }
        }

        if (environment.isServer && environment.production) {
            return next.handle(serverReq).pipe(timeout(6000));
        }

        return next.handle(serverReq);
    }
}
