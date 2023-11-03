import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('@pages/page-base/page-base.component').then(mod => mod.PageBaseComponent),
    },
    {
        path: 'contacts',
        loadComponent: () => import('@pages/page-contact/page-contact.component').then(mod => mod.PageContactComponent),
    },
    { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, {
            initialNavigation: 'enabledBlocking',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
