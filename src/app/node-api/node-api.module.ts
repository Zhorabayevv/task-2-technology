/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NodeApiConfiguration, NodeApiConfigurationParams } from './node-api-configuration';

import { ThemeApiService } from './services/theme-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ThemeApiService,
    NodeApiConfiguration
  ],
})
export class NodeApiModule {
  static forRoot(params: NodeApiConfigurationParams): ModuleWithProviders<NodeApiModule> {
    return {
      ngModule: NodeApiModule,
      providers: [
        {
          provide: NodeApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: NodeApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('NodeApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
