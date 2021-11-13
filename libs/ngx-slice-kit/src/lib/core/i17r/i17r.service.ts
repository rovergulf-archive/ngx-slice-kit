import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class I17rService {

    public currentLang$: BehaviorSubject<string> = new BehaviorSubject<string>('en');

    constructor() {
    }

    public get currentLang(): string {
        return this.currentLang$.getValue();
    }

    public set currentLang(lang: string) {
        this.currentLang$.next(lang);
    }
}
