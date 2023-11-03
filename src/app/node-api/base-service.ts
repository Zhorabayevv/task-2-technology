/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NodeApiConfiguration } from './node-api-configuration';

/**
 * Base class for services
 */
@Injectable()
export class BaseService {
  constructor(
    protected config: NodeApiConfiguration,
    protected http: HttpClient
  ) {
  }

  private _rootUrl: string = '';

  /**
   * Returns the root url for all operations in this service. If not set directly in this
   * service, will fallback to `NodeApiConfiguration.rootUrl`.
   */
  get rootUrl(): string {
    return this._rootUrl || this.config.rootUrl;
  }

  /**
   * Sets the root URL for API operations in this service.
   */
  set rootUrl(rootUrl: string) {
    this._rootUrl = rootUrl;
  }
}
