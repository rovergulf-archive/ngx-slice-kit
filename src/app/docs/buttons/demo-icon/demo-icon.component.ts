import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-icon',
    templateUrl: './demo-icon.component.html',
    styleUrls: ['./demo-icon.component.scss']
})
export class DemoIconComponent implements OnInit, OnDestroy {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;
    @ViewChild('resizeRef', {static: true}) resizeRef: any;
    @ViewChild('moreRef', {static: true}) moreRef: any;

    page: DemoPageModel;

    toggle: boolean;
    size: boolean;

    constructor() {
    }

    toggleColor(): void {
        this.toggle = !this.toggle;
    }

    toggleSize(): void {
        this.size = !this.size;
    }

    ngOnInit(): void {
        this.page = {
            title: 'Icons usage example',
            subtitle: 'Our icons is currently based on Super Basic Icons by buninux.com',
            demos: [
                {
                    title: 'Basic example',
                    description: 'They can be used by multiple ways, and you can apply css animations as well',
                    templateRef: this.defaultRef,
                    values: {
                        html: `<div class="flex-row">
    <div class="flex-row xm-3">
        <sdk-icon></sdk-icon>
    </div>
    <div class="flex-row xm-3">
        <sdk-icon [color]="'#ff2f49'" [icon]="'add'"></sdk-icon>
    </div>
    <div class="flex-row xm-3">
        <sdk-icon (click)="toggleColor()" [class.active]="toggle"
                  [color]="toggle ? '#ff2f49' : '#78bd27'"
                  [icon]="'add'"></sdk-icon>
    </div>
</div>`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-icon',
    templateUrl: './demo-icon.component.html',
    styleUrls: ['./demo-icon.component.scss']
})
export class DemoIconComponent {

    toggle: boolean;

    constructor() {
    }

    toggleColor(): void {
        this.toggle = !this.toggle;
    }

}`,
                        module: `import { IconModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add IconModule to app imports
        IconModule,
    ],
})
export class DemoIconModule {
}`,
                        styles: `sdk-icon {
    margin: 8px;

    &.active {
        animation: pulse linear 0.5s;
        -webkit-animation: pulse linear 0.5s;
        -moz-animation: pulse linear 0.5s;
        -o-animation: pulse linear 0.5s;
    }
}

.dynamic > div {
    height: 64px;
    width: 64px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
}


/* pulse animation for likes */
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}
`
                    },
                },
                {
                    title: 'Click to resize',
                    description: '',
                    templateRef: this.resizeRef,
                    values: {
                        html: `<div class="flex-row dynamic">
    <div class="flex-row xm-3">
        <sdk-icon (click)="toggleSize()" [icon]="'close'" [size]="size ? 24 : 48"></sdk-icon>
    </div>
    <div class="flex-row xm-3">
        <sdk-icon (click)="toggleSize()" [icon]="'folder'" [size]="size ? 24 : 48"></sdk-icon>
    </div>
</div>`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-icon',
    templateUrl: './demo-icon.component.html',
    styleUrls: ['./demo-icon.component.scss']
})
export class DemoIconComponent {

    size: boolean;

    constructor() {
    }

    toggleSize(): void {
        this.size = !this.size;
    }

}`,
                    },
                },
                {
                    title: 'And some more icons',
                    description: '',
                    templateRef: this.moreRef,
                    values: {
                        html: `<div class="flex-row">
    <div class="flex-row xm-3">
        <sdk-icon [icon]="'file'"></sdk-icon>
    </div>
    <div class="flex-row xm-3">
        <sdk-icon [icon]="'download'"></sdk-icon>
    </div>
    <div class="flex-row xm-3">
        <sdk-icon [icon]="'user'"></sdk-icon>
    </div>
</div>`,
                    },
                },
            ],
            apis: [
                {
                    label: '[color]',
                    type: 'string',
                    description: 'Sets the color of the <svg> fill attribute. You can use css variables as well.',
                },
            ]
        };
    }

    ngOnDestroy(): void {
    }

}
