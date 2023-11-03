/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class NodeApiConfiguration {
  rootUrl: string = '';
}

/**
 * Parameters for `NodeApiModule.forRoot()`
 */
export interface NodeApiConfigurationParams {
  rootUrl?: string;
}
