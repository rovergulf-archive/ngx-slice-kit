import {
    AfterContentInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
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
export class ButtonGroupComponent implements OnInit, AfterContentInit {

    @ContentChildren(ButtonComponent, {read: ElementRef}) btnGroup!: QueryList<ElementRef>;

    @Input() color: ThemeColors = 'primary';

    @Output() clicked: EventEmitter<any> = new EventEmitter();

    constructor(
        private renderer: Renderer2,
    ) {
    }

    @HostListener('click', ['$event']) onClick(event): void {
        const target = event.target;

        if (target.tagName !== 'BUTTON') {
            return;
        }

        this.btnGroup.forEach(btn => this.removeActiveClass(btn.nativeElement));
        this.renderer.addClass(target, 'sdk-button--active');

        this.clicked.emit({element: event.target, index: target.getAttribute('btn-group-index')});
    }

    removeActiveClass(element): void {
        this.renderer.removeClass(element, 'sdk-button--active');
    }

    ngOnInit(): void {
    }

    ngAfterContentInit(): void {
        this.btnGroup.forEach((btn, index) => {
            this.renderer.setAttribute(btn.nativeElement, 'btn-group-index', `${index}`);
        });
    }
}
