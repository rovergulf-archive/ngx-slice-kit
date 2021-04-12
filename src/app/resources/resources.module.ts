import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ResourcesRoutingModule } from './resources-routing.module';

import { AboutComponent } from './about/about.component';
import { ResourcesComponent } from './resources.component';
import { RoadmapComponent } from './roadmap/roadmap.component';

const entryComponents = [];

const moduleDeclarations = [
    ...entryComponents,
    AboutComponent,
    ResourcesComponent,
    RoadmapComponent,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ResourcesRoutingModule,
        SharedModule,
    ],
    declarations: moduleDeclarations,
    exports: moduleDeclarations,
    entryComponents,
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class ResourcesModule {
}
