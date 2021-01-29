import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OptionModel } from './dropdown-option.model';

@Injectable({
    providedIn: 'root'
})
export class OptionsService {

    private $options: BehaviorSubject<OptionModel[]> = new BehaviorSubject<OptionModel[]>(null);
    private $loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

    public get options(): OptionModel[] {
        return this.$options.getValue();
    }

    public set options(options: OptionModel[]) {
        this.$options.next(options);
    }

    public get optionsObservable(): Observable<OptionModel[]> {
        return this.$options.asObservable();
    }

    public get hasOptions(): boolean {
        return this.options?.length > 0;
    }

    public set loading(state: boolean) {
        this.$loading.next(state);
    }

    public get loading(): boolean {
        return this.$loading.getValue();
    }

    constructor() {
    }
}
