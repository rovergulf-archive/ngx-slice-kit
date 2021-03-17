/**
 * Public API Surface of ngx-slice-kit
 */

/**
 * Animations
 */

export { slideInAnimation } from './lib/core/animations/slide-in';

/**
 * Main Slice Kit module
 */
export { SliceKitModule } from './lib/slice-kit.module';
/**
 * Theming
 */
export { ThemeModule } from './lib/core/theme/theme.module';
export { ThemeService } from './lib/core/theme/theme.service';
export { ThemeDirective } from './lib/core/theme/theme.directive';
export { themeDark } from './lib/core/theme/lib/theme-dark';
export { themeLight } from './lib/core/theme/lib/theme-light';

/**
 * Core module
 */
export { CoreModule } from './lib/core/core.module';
export { I17rService } from './lib/core/i17r/i17r.service';
export { I17rPipe } from './lib/core/i17r/i17r.pipe';
export { LayoutControlService } from './lib/core/layout-control/layout-control.service';
export { LoadingComponent } from './lib/layout/loading/loading.component';
export { LoadingDirective } from './lib/layout/loading/loading.directive';
export { LoadingService } from './lib/layout/loading/loading.service';
export { MarkdownComponent } from './lib/core/markdown/markdown.component';
export { MarkdownDirective } from './lib/core/markdown/markdown.directive';
export { MarkdownPipe } from './lib/core/markdown/markdown.pipe';
export { MarkdownService } from './lib/core/markdown/markdown.service';
export { NavigationScrollDirective } from './lib/core/directives/navigation-scroll.directive';

/**
 * Buttons module
 */
export { GLYPHS } from './lib/buttons/icon/icon.glyphs';
export { ButtonsModule } from './lib/buttons/buttons.module';
/**
 * modules
 */
// export {BadgesModule} from './lib/buttons/badges/badges.module';
export { ButtonModule } from './lib/buttons/button/button.module';
export { ButtonGroupModule } from './lib/buttons/button-group/button-group.module';
// export {ChipsModule} from './lib/buttons/chips/chips.module';
export { IconModule } from './lib/buttons/icon/icon.module';
// export {RippleModule} from './lib/buttons/ripple/ripple.module';
// export {StepperModule} from './lib/buttons/stepper/stepper.module';
/**
 * components
 */
// export {BadgesComponent} from './lib/buttons/badges/badges.component';
export { ButtonComponent } from './lib/buttons/button/button.component';
export { ButtonGroupComponent } from './lib/buttons/button-group/button-group.component';
// export {ChipsComponent} from './lib/buttons/chips/chips.component';
export { IconComponent } from './lib/buttons/icon/icon.component';
// export {RippleComponent} from './lib/buttons/ripple/ripple.component';
// export {StepperComponent} from './lib/buttons/stepper/stepper.component';

/**
 * Cards module
 */
// export { CardsModule } from './lib/cards/cards.module';
/**
 * modules
 */
// export {CardModule} from './lib/cards/card/card.module';
// export {DashboardCardModule} from './lib/cards/dashboard-card/dashboard-card.module';
// export {ShoppingCardModule} from './lib/cards/shopping-card/shopping-card.module';
// export {SocialCardModule} from './lib/cards/social-card/social-card.module';
// export {TextCardModule} from './lib/cards/text-card/text-card.module';
/**
 * components
 */
// export {CardComponent} from './lib/cards/card/card.component';
// export {DashboardCardComponent} from './lib/cards/dashboard-card/dashboard-card.component';
// export {ShoppingCardComponent} from './lib/cards/shopping-card/shopping-card.component';
// export {SocialCardComponent} from './lib/cards/social-card/social-card.component';
// export {TextCardComponent} from './lib/cards/text-card/text-card.component';

/**
 * Dropdowns module
 */
export { DropdownsModule } from './lib/dropdowns/dropdowns.module';
/**
 * modules
 */
export { AutocompleteModule } from './lib/dropdowns/autocomplete/autocomplete.module';
export { SelectModule } from './lib/dropdowns/select/select.module';
/**
 * components
 */
export { DropdownComponent } from './lib/dropdowns/dropdown.component';
export { DropdownOptions } from './lib/dropdowns/dropdown.model';
export { OptionModel } from './lib/dropdowns/dropdown-option.model';
export { DropdownService } from './lib/dropdowns/dropdown.service';
export { OptionsService } from './lib/dropdowns/options.service';
export { DropdownMenuTriggerDirective } from './lib/dropdowns/context/dropdown-menu-trigger.directive';
export { AutocompleteComponent } from './lib/dropdowns/autocomplete/autocomplete.component';
export { SelectComponent } from './lib/dropdowns/select/select.component';

/**
 * Forms module
 */
export { InputsModule } from './lib/inputs/inputs.module';
/**
 * modules
 */
export { CheckboxModule } from './lib/inputs/checkbox/checkbox.module';
// export { DatepickerModule } from './lib/inputs/datepicker/datepicker.module';
export { InputModule } from './lib/inputs/input/input.module';
export { RadioModule } from './lib/inputs/radio/radio.module';
export { TextareaModule } from './lib/inputs/textarea/textarea.module';
export { ToggleModule } from './lib/inputs/toggle/toggle.module';
// export {WysiwygModule} from './lib/inputs/wysiwyg/wysiwyg.module';
/**
 * components
 */
export { CheckboxComponent } from './lib/inputs/checkbox/checkbox.component';
// export { DatepickerComponent } from './lib/inputs/datepicker/datepicker.component';
export { InputComponent } from './lib/inputs/input/input.component';
export { RadioComponent } from './lib/inputs/radio/radio.component';
export { TextareaComponent } from './lib/inputs/textarea/textarea.component';
export { ToggleComponent } from './lib/inputs/toggle/toggle.component';
// export {WysiwygComponent} from './lib/inputs/wysiwyg/wysiwyg.component';

/**
 * Layout module
 */
export { LayoutModule } from './lib/layout/layout.module';
/**
 * modules
 */
// export {AccordionModule} from './lib/layout/accordion/accordion.module';
// export {BreadcrumbsModule} from './lib/layout/breadcrumbs/breadcrumbs.module';
// export {CalendarModule} from './lib/layout/calendar/calendar.module';
export { CarouselModule } from './lib/layout/carousel/carousel.module';
// export {ChartsModule} from './lib/layout/charts/charts.module';
export { DividerModule } from './lib/layout/divider/divider.module';
export { DotsModule } from './lib/layout/dots/dots.module';
// export {DragNDropModule} from './lib/layout/drag-n-drop/drag-n-drop.module';
export { ListModule } from './lib/layout/list/list.module';
export { PaginationModule } from './lib/layout/pagination/pagination.module';
export { ProgressModule } from './lib/layout/progress/progress.module';
export { SliderModule } from './lib/layout/slider/slider.module';
export { TableModule } from './lib/layout/table/table.module';
/**
 * components
 */
// export {AccordionComponent} from './lib/layout/accordion/accordion.component';
// export {BreadcrumbsComponent} from './lib/layout/breadcrumbs/breadcrumbs.component';
// export {CalendarComponent} from './lib/layout/calendar/calendar.component';
export { CarouselComponent } from './lib/layout/carousel/carousel.component';
// export {ChartsComponent} from './lib/layout/charts/charts.component';
export { DividerComponent } from './lib/layout/divider/divider.component';
export { DotsComponent } from './lib/layout/dots/dots.component';
// export {DragNDropComponent} from './lib/layout/drag-n-drop/drag-n-drop.component';
export { ListComponent } from './lib/layout/list/list.component';
export { PaginationComponent } from './lib/layout/pagination/pagination.component';
export { ProgressComponent } from './lib/layout/progress/progress.component';
export { SlideComponent } from './lib/layout/carousel/slide/slide.component';
export { SliderComponent } from './lib/layout/slider/slider.component';
export { TableComponent } from './lib/layout/table/table.component';

/**
 * Media module
 */
// export { MediaModule } from './lib/media/media.module';
/**
 * modules
 */
// export {AudioPlayerModule} from './lib/media/audio-player/audio-player.module';
// export {VideoPlayerModule} from './lib/media/video-player/video-player.module';
// export {FileModule} from './lib/media/file/file.module';
/**
 * components
 */
// export {AudioPlayerComponent} from './lib/media/audio-player/audio-player.component';
// export {VideoPlayerComponent} from './lib/media/video-player/video-player.component';
// export {FileComponent} from './lib/media/file/file.component';

/**
 * Overlay module
 */
export { OverlayModule } from './lib/overlay/overlay.module';
/**
 * modules
 */
/**
 * components
 */
export { OverlayComponent } from './lib/overlay/overlay.component';
export { OverlayDirective } from './lib/overlay/overlay.directive';
export { OverlayService } from './lib/overlay/overlay.service';
export {
    OverlayOptions, OverlayModel, OverlaySize, OverlayStickPosition, OverlayStrategy
} from './lib/overlay/overlay.model';

/**
 * Modals module
 */
export { ModalsModule } from './lib/modals/modals.module';
/**
 * modules
 */
export { AlertModule } from './lib/modals/alert/alert.module';
// export {BottomSheetModule} from './lib/modals/bottom-sheet/bottom-sheet.module';
export { DialogModule } from './lib/modals/dialog/dialog.module';
// export {PopoverModule} from './lib/modals/popover/popover.module';
export { PopupModule } from './lib/modals/popup/popup.module';
export { TooltipModule } from './lib/modals/tooltip/tooltip.module';
/**
 * components
 */
export { AlertComponent } from './lib/modals/alert/alert.component';
export { AlertsComponent } from './lib/modals/alert/alerts.component';
export { AlertService } from './lib/modals/alert/alert.service';
export { AlertOptions } from './lib/modals/alert/alert.model';
export { DialogComponent } from './lib/modals/dialog/dialog.component';
export { DialogDirective } from './lib/modals/dialog/dialog.directive';
export { DialogService } from './lib/modals/dialog/dialog.service';
export { PopupComponent } from './lib/modals/popup/popup.component';
export { PopupService } from './lib/modals/popup/popup.service';
export { TooltipDirective } from './lib/modals/tooltip/tooltip.directive';
// export {BottomSheetComponent} from './lib/modals/bottom-sheet/bottom-sheet.component';
// export {PopoverComponent} from './lib/modals/popover/popover.component';

/**
 * Navigation module
 */
export { NavigationModule } from './lib/navigation/navigation.module';
/**
 * modules
 */
export { NavMenuModule } from './lib/navigation/nav-menu/nav-menu.module';
export { NavTabsModule } from './lib/navigation/nav-tabs/nav-tabs.module';
export { SidenavModule } from './lib/navigation/sidenav/sidenav.module';
export { TabsModule } from './lib/navigation/tabs/tabs.module';
/**
 * components
 */
export { NavMenuComponent } from './lib/navigation/nav-menu/nav-menu.component';
export { NavMenuItemComponent } from './lib/navigation/nav-menu/nav-menu-item/nav-menu-item.component';
export { NavMenuGroupComponent } from './lib/navigation/nav-menu/nav-menu-group/nav-menu-group.component';
export { NavTabsComponent } from './lib/navigation/nav-tabs/nav-tabs.component';
export { SidenavComponent } from './lib/navigation/sidenav/sidenav.component';
export { SidenavContainerComponent } from './lib/navigation/sidenav/sidenav-container.component';
export { SidenavContentComponent } from './lib/navigation/sidenav/sidenav-content.component';
export { TabComponent } from './lib/navigation/tabs/tab/tab.component';
export { TabsComponent } from './lib/navigation/tabs/tabs.component';
export { TabLinkDirective } from './lib/navigation/nav-tabs/tab-link.directive';

// end of public-api.ts
