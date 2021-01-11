import { DropdownMenuTriggerDirective } from './dropdown-menu-trigger.directive';
import { ElementRef } from "@angular/core";
import { DropdownService } from '../dropdown.service';
import { OptionsService } from '../options.service';

describe('DropdownMenuTriggerDirective', () => {
    const UNIX_PLATFORM_ID: number = 4;

    it('should create an instance', () => {
        let dropdownService: DropdownService;
        let el: ElementRef;
        let optionsService: OptionsService
        const directive = new DropdownMenuTriggerDirective(UNIX_PLATFORM_ID, dropdownService, el, optionsService);
        expect(directive).toBeTruthy();
    });
});
