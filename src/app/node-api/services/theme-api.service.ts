/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { NodeApiConfiguration } from '../node-api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ThemeType } from '../models/theme-type';

@Injectable({
  providedIn: 'root',
})
export class ThemeApiService extends BaseService {
  constructor(
    config: NodeApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation setTheme
   */
  static readonly SetThemePath = '/node-api/set-theme';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setTheme()` instead.
   *
   * This method doesn't expect any request body.
   */
  setTheme$Response(params?: {

    /**
     * owner-light-theme
     */
    theme?: ThemeType;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ThemeApiService.SetThemePath, 'get');
    if (params) {
      rb.query('theme', params.theme, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setTheme$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setTheme(params?: {

    /**
     * owner-light-theme
     */
    theme?: ThemeType;
    context?: HttpContext
  }
): Observable<void> {

    return this.setTheme$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
