import { InjectionToken } from '@angular/core';

export const COOKIES_TOKEN = new InjectionToken<Readonly<Map<string, string>>>('Get cookies from server side');
