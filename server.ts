import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { RUNNING_PORT, THEME_CLASS } from '@tokens/running-port.token';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import { AppServerModule } from './src/main.server';

import * as compression from 'compression';

import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { environment } from '@env/environment';
import { ISettingsConfig } from '@interfaces/settings-config.interface';
import { PropsKey } from '@core/constants/props-key';

(global as any).HTMLElement.prototype.getBoundingClientRect = (): any => {
    return { right: '', left: '', top: '', bottom: '' };
};

// The Express app is exported so that it can be used by serverless Functions.
export function app(port: number): express.Express {
    const server = express();
    const distFolder = join(process.cwd(), 'dist/owner/browser');
    // const logFolder = join(process.cwd(), 'dist/owner/log');
    const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
    // const browserConfig = JSON.parse(readFileSync(
    //     join(distFolder, 'assets', 'data', environment.production ? 'config.json' : 'config_dev.json'),
    // ).toString()) as ISettingsConfig;

    server.use(compression());

    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
    server.engine(
        'html',
        ngExpressEngine({
            bootstrap: AppServerModule,
        }),
    );

    server.set('view engine', 'html');
    server.set('views', distFolder);

    // Example Express Rest API endpoints
    // server.get('/api/**', (req, res) => { });
    // Serve static files from /browser
    server.get(
        '*.*',
        express.static(distFolder, {
            maxAge: '1y',
        }),
    );

    server.get(['/node-api/set-theme'], (req, res) => {
        if (req.query['theme']) {
            res.cookie(PropsKey.THEME_COOKIE_NAME, req.query['theme']);
        }

        res.send();
    });

    // All regular routes use the Universal engine
    server.get('*', (req, res) => {
        const cookies = getCookies(req.headers.cookie);
        const themeClass = cookies.get(PropsKey.THEME_COOKIE_NAME) || 'owner-dark-theme';

        res.render(indexHtml, {
            req,
            providers: [
                { provide: APP_BASE_HREF, useValue: req.baseUrl },
                { provide: RUNNING_PORT, useValue: port },
                { provide: REQUEST, useValue: req },
                { provide: RESPONSE, useValue: res },
                { provide: THEME_CLASS, useValue: themeClass },
            ],
        });
    });

    return server;
}

function getCookies(cookies: string | undefined): Readonly<Map<string, string>> {
    const cookiesMap = new Map<string, string>();

    if (!cookies) {
        return cookiesMap;
    }

    const cookiesArray = cookies.split(';');

    cookiesArray.forEach((cookie: string) => {
        const [key, value] = cookie.trim().split('=');

        cookiesMap.set(key, value);
    });

    return cookiesMap;
}

function run(): void {
    const port = process.env['PORT'] || 4000;
    // Start up the Node server
    const server = app(+port);

    server.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __non_webpack_require__: NodeRequire;
// eslint-disable-next-line @typescript-eslint/naming-convention
const mainModule = __non_webpack_require__.main;
// eslint-disable-next-line @typescript-eslint/naming-convention
const moduleFilename = (mainModule && mainModule.filename) || '';

if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}

export * from './src/main.server';
