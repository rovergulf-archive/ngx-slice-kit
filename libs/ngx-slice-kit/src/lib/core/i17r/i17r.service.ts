import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class I17rService {

    currentLang$: BehaviorSubject<string> = new BehaviorSubject<string>('en');

    constructor() {
    }

    get currentLang(): string {
        return this.currentLang$.getValue();
    }

    set currentLang(lang: string) {
        this.currentLang$.next(lang);
    }
}
