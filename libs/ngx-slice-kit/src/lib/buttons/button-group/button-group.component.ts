import {
    AfterContentInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output,
    QueryList,
    Renderer2,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ThemeColors } from '../../core/theme/theme.model';

@Component({
    selector: 'sdk-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements AfterContentInit {

    @ContentChildren(ButtonComponent, {read: ElementRef}) public btnGroup!: QueryList<ElementRef>;

    @Input() public color: ThemeColors = 'primary';

    @Output() public clicked: EventEmitter<any> = new EventEmitter();

    constructor(
        private renderer: Renderer2,
    ) {
    }

    @HostListener('click', ['$event'])
    public onClick(event): void {
        const target = event.target;

        if (target.tagName !== 'BUTTON') {
            return;
        }

        this.btnGroup.forEach(btn => this.removeActiveClass(btn.nativeElement));
        this.renderer.addClass(target, 'active');

        this.clicked.emit({element: event.target, index: target.getAttribute('btn-group-index')});
    }

    public removeActiveClass(element): void {
        this.renderer.removeClass(element, 'active');
    }

    public ngAfterContentInit(): void {
        this.btnGroup.forEach((btn, index) => {
            this.renderer.setAttribute(btn.nativeElement, 'btn-group-index', `${index}`);
        });
    }
}
