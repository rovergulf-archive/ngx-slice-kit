import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuModule } from './nav-menu/nav-menu.module';
import { NavTabsModule } from './nav-tabs/nav-tabs.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { TabsModule } from './tabs/tabs.module';
import { BasicTabModule } from './basic-tab/basic-tab.module';


const modules = [
    NavMenuModule,
    NavTabsModule,
    SidenavModule,
    TabsModule,
    BasicTabModule,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [],
    exports: [
        ...modules,
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class NavigationModule {
}
