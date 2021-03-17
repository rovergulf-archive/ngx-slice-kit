import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// kit modules
// theming module
import { CoreModule } from './core/core.module';
// components
import { ButtonsModule } from './buttons/buttons.module';
// import { CardsModule } from './cards/cards.module';
import { DropdownsModule } from './dropdowns/dropdowns.module';
import { InputsModule } from './inputs/inputs.module';
import { LayoutModule } from './layout/layout.module';
// import { MediaModule } from './media/media.module';
import { ModalsModule } from './modals/modals.module';
import { NavigationModule } from './navigation/navigation.module';
// import { OverlayModule } from './overlay/overlay.module';
// import { themeLight } from './core/theme/lib/theme-light';
// import { themeDark } from './core/theme/lib/theme-dark';
import { ThemeModule } from './core/theme/theme.module';
import { ACTIVE_THEME, ThemeOptions, THEMES } from './core/theme/symbols';

const kitExports = [
    ButtonsModule,
    // CardsModule,
    CoreModule,
    DropdownsModule,
    InputsModule,
    LayoutModule,
    // MediaModule,
    ModalsModule,
    NavigationModule,
    // OverlayModule,
    ThemeModule,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [],
    exports: [
        ...kitExports
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SliceKitModule {
    static forRoot(options: ThemeOptions): ModuleWithProviders<SliceKitModule> {
        return {
            ngModule: SliceKitModule,
            providers: [
                {
                    provide: THEMES,
                    useValue: options.themes
                },
                {
                    provide: ACTIVE_THEME,
                    useValue: options.active
                }
            ]
        };
    }
}
