import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { HexToRgb, RgbaToHex, Theme, ThemeService } from 'ngx-slice-kit';
import { defaultColors } from '../../../../../libs/ngx-slice-kit/src/lib/core/theme/theme.model';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'lib-gen-theme',
    templateUrl: './gen-theme.component.html',
    styleUrls: ['./gen-theme.component.scss']
})
export class GenThemeComponent implements OnInit, OnDestroy {

    $theme: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(new Theme({
        name: 'custom',
        ...defaultColors
    }));

    @Input() set theme(t: Theme) {
        this.$theme.next(new Theme(t));
    }

    get theme(): Theme {
        return this.$theme.getValue();
    }

    @Output() changes: EventEmitter<any> = new EventEmitter<any>();
    @Output() apply: EventEmitter<any> = new EventEmitter<any>();

    form: UntypedFormGroup;
    private ifChangesNotEmitted: boolean = true;

    constructor(
        private fb: UntypedFormBuilder,
        private themeService: ThemeService,
    ) {
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
        // theme.base_text = theme.background;

        this.changes.emit(new Theme(theme));
        this.ifChangesNotEmitted = false;
        this.form.markAsPristine();
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
