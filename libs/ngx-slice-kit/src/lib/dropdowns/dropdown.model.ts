import { OptionModel } from './dropdown-option.model';

export class DropdownOptions {
    public triggerRect?: ClientRect;
    public options?: OptionModel[];
    public fitWidth?: boolean;
    public multi?: boolean;
    public hideBackdrop?: boolean;
    public parentElem?: any;
    public filterFunc?: () => OptionModel[]; // TBD v2
    public returnFunc?: () => any; // TBD v2
}

