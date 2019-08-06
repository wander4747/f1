import {
    NgModule
} from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import {
    TabsPage
} from './tabs.page';

const routes: Routes = [{
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'driver',
                children: [{
                    path: '',
                    loadChildren: () =>
                        import('../driver/driver.module').then(m => m.DriverPageModule)
                }]
            },
            {
                path: 'race',
                children: [{
                    path: '',
                    loadChildren: () =>
                        import('../race/race.module').then(m => m.RacePageModule)
                }]
            },
            {
                path: 'team',
                children: [{
                    path: '',
                    loadChildren: () =>
                        import('../team/team.module').then(m => m.TeamPageModule)
                }]
            },
            {
                path: '',
                redirectTo: '/tabs/race',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/race',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {}