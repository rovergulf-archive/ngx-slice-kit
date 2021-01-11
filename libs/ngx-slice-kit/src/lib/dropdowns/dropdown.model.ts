import { OptionModel } from './dropdown-option.model';

export class DropdownOptions {
    triggerRect?: ClientRect;
    options?: OptionModel[];
    fitWidth?: boolean;
    multi?: boolean;
    hideBackdrop?: boolean;
    parentElem?: any;
    filterFunc?: () => OptionModel[]; // TBD v2
    returnFunc?: Function; // TBD v2
}

