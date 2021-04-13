import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HexToRgb, RgbaToHex, Theme, ThemeService } from 'ngx-slice-kit';
import { defaultColors } from '../../../../../libs/ngx-slice-kit/src/lib/core/theme/theme.model';

@Component({
    selector: 'lib-gen-theme',
    templateUrl: './gen-theme.component.html',
    styleUrls: ['./gen-theme.component.scss']
})
export class GenThemeComponent implements OnInit, OnDestroy {

    @Output() changes: EventEmitter<any> = new EventEmitter<any>();

    form: FormGroup;

    theme: Theme = new Theme({
        name: 'custom',
        ...defaultColors
    });

    constructor(
        private fb: FormBuilder,
        private themeService: ThemeService,
    ) {
    }

    get active(): boolean {
        return this.themeService.currentTheme.name === this.theme.name;
    }

    getFormControls(): any[] {
        return Object.keys(this.form.controls).filter(c => c !== 'name');
    }

    initForm(): void {
        const form = {};
        Object.keys(defaultColors).forEach(k => {
            form[k] = RgbaToHex(`rgba(${defaultColors[k]})`);
        });
        this.form = this.fb.group(form);
    }

    submit(): void {
        const values = this.form.getRawValue();
        const theme: any = {
            name: 'custom'
        };
        Object.keys(values).forEach(k => {
            if (k !== 'name') {
                theme[k] = HexToRgb(values[k]).join(',');
            }
        });
        theme.name = values.name;

        this.theme = new Theme(theme);
        this.changes.emit(new Theme(theme));
    }

    onValueChange(ev: string, control: string): void {
        const rgb = HexToRgb(ev);
        this.theme[control] = rgb;
        this.theme = new Theme(this.theme);
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnDestroy(): void {
        this.changes.complete();
    }

}
