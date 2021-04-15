import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DemoPageModel } from '../../../shared/model';

@Component({
    selector: 'app-demo-carousel',
    templateUrl: './demo-carousel.component.html',
    styleUrls: ['./demo-carousel.component.scss', '../../demo.module.scss']
})
export class DemoCarouselComponent implements OnInit {

    @ViewChild('defaultRef', {static: true}) defaultRef: any;
    @ViewChild('wideRef', {static: true}) wideRef: any;
    @ViewChild('singleRef', {static: true}) singleRef: any;

    page: DemoPageModel;

    posterUrls1 = [
        'assets/images/sw1jer.jpg',
        'assets/images/sw2jer.jpg',
        'assets/images/sw3jer.jpg',
        'assets/images/lotr1jer.jpg',
        'assets/images/lotr2jer.jpg',
        'assets/images/lotr3jer.jpg',
    ];

    posterUrls2 = [
        'assets/images/sw1kf.jpg',
        'assets/images/sw2kf.png',
        'assets/images/sw3kf.jpg',
        'assets/images/lotr1kf.jpg',
        'assets/images/lotr2kf.jpg',
        'assets/images/lotr3kf.jpg',
    ];

    currentWidth: number;

    config1 = {
        dots: true,
        offset: 8,
        slidesToScroll: 3,
        slidesToShow: 3,
        pauseByHover: true,
        infinity: true,
        timeout: 5000
    };

    // config2 = {
    //     offset: 24,
    //     slidesToScroll: 3,
    //     slidesToShow: 3,
    //     pauseByHover: true,
    //     infinity: true,
    //     timeout: 0
    // };

    // config3 = {
    //     offset: 24,
    //     slidesToScroll: 2,
    //     slidesToShow: 2,
    //     pauseByHover: true,
    //     infinity: true,
    //     timeout: 0,
    //     arrows: false
    // };

    config4 = {
        offset: 8,
        slidesToScroll: 2,
        slidesToShow: 8,
        pauseByHover: true,
        infinity: true,
        timeout: 0,
        arrows: true,
    };

    // config5 = {
    //     offset: 12,
    //     slidesToScroll: 3,
    //     slidesToShow: 3,
    //     pauseByHover: true,
    //     infinity: false,
    //     timeout: 0,
    //     arrows: false,
    // };

    config6 = {
        dots: true,
        offset: 0,
        slidesToScroll: 1,
        slidesToShow: 1,
        pauseByHover: true,
        infinity: false,
        timeout: 10000,
        arrows: true,
    };

    constructor() {
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize(event): void {
        this.currentWidth = event.target.innerWidth;
        this.changeCarouselConfig();
    }

    changeCarouselConfig(): void {
        switch (true) {
            case this.currentWidth >= 1800:
                this.config4 = {...this.config4, slidesToShow: 8, slidesToScroll: 2};
                break;
            case this.currentWidth >= 1600:
                this.config4 = {...this.config4, slidesToShow: 5, slidesToScroll: 2};
                break;
            case this.currentWidth >= 1280:
                this.config4 = {...this.config4, slidesToShow: 4, slidesToScroll: 2};
                // this.config5 = {...this.config5, slidesToShow: 3, slidesToScroll: 3};
                break;
            case this.currentWidth >= 880:
                this.config1 = {...this.config1, slidesToShow: 3, slidesToScroll: 3};
                // this.config2 = {...this.config2, slidesToShow: 3, slidesToScroll: 3};
                // this.config3 = {...this.config3, slidesToShow: 2, slidesToScroll: 2};
                this.config4 = {...this.config4, slidesToShow: 3, slidesToScroll: 2};
                // this.config5 = {...this.config5, slidesToShow: 2, slidesToScroll: 2};
                break;
            case this.currentWidth >= 480:
                this.config1 = {...this.config1, slidesToShow: 2, slidesToScroll: 2};
                // this.config2 = {...this.config2, slidesToShow: 2, slidesToScroll: 2};
                // this.config3 = {...this.config3, slidesToShow: 1, slidesToScroll: 1};
                this.config4 = {...this.config4, slidesToShow: 2, slidesToScroll: 2};
                // this.config5 = {...this.config5, slidesToShow: 2, slidesToScroll: 2};
                break;
            case this.currentWidth >= 320:
                this.config1 = {...this.config1, offset: 8, slidesToShow: 1, slidesToScroll: 1};
                // this.config2 = {...this.config2, offset: 8, slidesToShow: 1, slidesToScroll: 1};
                this.config4 = {...this.config4, slidesToShow: 1, slidesToScroll: 1};
                // this.config5 = {...this.config5, slidesToShow: 1, slidesToScroll: 1};
                break;
        }
    }

    ngOnInit(): void {
        this.page = {
            title: 'Carousel component example',
            subtitle: '',
            demos: [
                {
                    title: 'Default carousel',
                    description: '',
                    templateRef: this.defaultRef,
                    values: {
                        html: `<div class="carousel-container">
    <sdk-carousel [dots]="config.dots"
                  [offset]="config.offset"
                  [timeout]="config.timeout"
                  [infinity]="config.infinity"
                  [pauseByHover]="config.pauseByHover"
                  [slidesToShow]="config.slidesToShow"
                  [slidesToScroll]="config.slidesToScroll">
        <sdk-slide *ngFor="let url of posterUrls">
            <div class="carousel-slide">
                <img [src]="url" alt="slide-img">
            </div>
        </sdk-slide>
    </sdk-carousel>
</div>`,
                        styles: `.carousel-container {
    width: 100%;
    max-width: 880px;

    .carousel-slide {
        height: 400px;
        display: flex;
        justify-content: center;
        overflow: hidden;

        img {
            width: auto;
            height: 100%;
        }
    }
}

// ---------------------------------- media ----------------------------------

@media screen and (max-width: 1280px) {
    .carousel-container {
        width: 640px;
    }
}

@media screen and (max-width: 880px) {
    .carousel-container {
        width: 420px;
    }
}

@media screen and (max-width: 480px) {
    .carousel-container {
        width: 300px;
    }
}`,
                        module: `import { CarouselModule } from 'ngx-slice-kit';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // add CarouselModule to app imports
        CarouselModule,
    ],
})
export class DemoCarouselModule {
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-carousel',
    templateUrl: './demo-carousel.component.html',
    styleUrls: ['./demo-carousel.component.scss']
})
export class DemoCarouselComponent {

    posterUrls = [ ... ] // Your image urls

    currentWidth: number;

    config = {
        dots: true,
        offset: 8,
        slidesToScroll: 3,
        slidesToShow: 3,
        pauseByHover: true,
        infinity: true,
        timeout: 5000
    };

    constructor() {
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize(event): void {
        this.currentWidth = event.target.innerWidth;
        this.changeCarouselConfig();
    }

    changeCarouselConfig(): void {
        switch (true) {
            case this.currentWidth >= 880:
                this.config = {...this.config, slidesToShow: 3, slidesToScroll: 3};
                break;
            case this.currentWidth >= 480:
                this.config = {...this.config1, slidesToShow: 2, slidesToScroll: 2};
                break;
            case this.currentWidth >= 320:
                this.config = {...this.config, offset: 8, slidesToShow: 1, slidesToScroll: 1};
                break;
        }
    }
}`,
                    },
                },
                {
                    title: 'Carousel without dots and autoscroll',
                    description: '',
                    templateRef: this.wideRef,
                    values: {
                        html: `<div class="carousel-container">
    <sdk-carousel [arrows]="config.arrows"
                  [offset]="config.offset"
                  [timeout]="config.timeout"
                  [infinity]="config.infinity"
                  [slidesToShow]="config.slidesToShow"
                  [slidesToScroll]="config4slidesToScroll">
        <sdk-slide *ngFor="let url of posterUrls">
            <div class="carousel-slide">
                <img [src]="url" alt="slide-img">
            </div>
        </sdk-slide>
    </sdk-carousel>
</div>`,
                        styles: `.carousel-container {
    width: 100%;
    max-width: 1440px;

    .carousel-slide {
        height: 400px;
        display: flex;
        justify-content: center;
        overflow: hidden;

        img {
            width: auto;
            height: 100%;
        }
    }
}


// ---------------------------------- media ----------------------------------

@media screen and (max-width: 1800px) {
    .carousel-container {
        width: 1200px;
    }
}

@media screen and (max-width: 1480px) {
    .carousel-container {
        width: 980px;
    }
}

@media screen and (max-width: 1280px) {
    .carousel-container {
        width: 640px;
    }
}

@media screen and (max-width: 880px) {
    .carousel-container {
        width: 420px;
    }
}

@media screen and (max-width: 480px) {
    .carousel-container {
        width: 300px;
    }
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-carousel',
    templateUrl: './demo-carousel.component.html',
    styleUrls: ['./demo-carousel.component.scss']
})
export class DemoCarouselComponent {

    posterUrls = [ ... ] // Your image urls

    currentWidth: number;

    config = {
        offset: 8,
        slidesToScroll: 2,
        slidesToShow: 8,
        pauseByHover: true,
        infinity: true,
        timeout: 0,
        arrows: true,
    };

    constructor() {
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize(event): void {
        this.currentWidth = event.target.innerWidth;
        this.changeCarouselConfig();
    }

    changeCarouselConfig(): void {
        switch (true) {
            case this.currentWidth >= 1800:
                this.config = {...this.config, slidesToShow: 8, slidesToScroll: 2};
                break;
            case this.currentWidth >= 1600:
                this.config = {...this.config, slidesToShow: 5, slidesToScroll: 2};
                break;
            case this.currentWidth >= 1280:
                this.config = {...this.config, slidesToShow: 4, slidesToScroll: 2};
                break;
            case this.currentWidth >= 880:
                this.config = {...this.config, slidesToShow: 3, slidesToScroll: 2};
                break;
            case this.currentWidth >= 480:
                this.config = {...this.config, slidesToShow: 2, slidesToScroll: 2};
                break;
            case this.currentWidth >= 320:
                this.config = {...this.config, slidesToShow: 1, slidesToScroll: 1};
                break;
        }
    }
}`
                    },
                },
                {
                    title: 'Carousel without loop scroll',
                    description: '',
                    templateRef: this.singleRef,
                    values: {
                        html: `<div class="carousel-container">
    <sdk-carousel [dots]="true"
                  [arrows]="true"
                  [offset]="0"
                  [timeout]="10000"
                  [infinity]="false"
                  [pauseByHover]="true"
                  [slidesToShow]="1"
                  [slidesToScroll]="1">
        <sdk-slide *ngFor="let url of posterUrls">
            <div class="carousel-slide">
                <img alt="" [src]="slide-img">
            </div>
        </sdk-slide>
    </sdk-carousel>
</div>`,
                        styles: `.carousel-container {
    width: 100%;
    max-width: 349px;

    .carousel-slide {
        height: 524px;
        display: flex;
        justify-content: center;
        overflow: hidden;

        img {
            width: auto;
            height: 100%;
        }
    }
}

// ---------------------------------- media ----------------------------------

@media screen and (max-width: 480px) {
        width: 300px;
    }
}`,
                        component: `import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-carousel',
    templateUrl: './demo-carousel.component.html',
    styleUrls: ['./demo-carousel.component.scss']
})
export class DemoCarouselComponent {

    posterUrls = [ ... ] // Your image urls

    constructor() {
    }

}`
                    },
                }
            ],
            api_groups: [
                {
                    name: 'CarouselComponent',
                    apis: [
                        {
                            label: '[arrows]',
                            type: 'boolean',
                            description: `Adds arrows elements for manage slides`,
                            default_value: 'true'
                        },
                        {
                            label: '[dots]',
                            type: 'boolean',
                            description: `Adds dots for manage slides`,
                            default_value: 'false'
                        },
                        {
                            label: '[infinity]',
                            type: 'boolean',
                            description: `Set endless scroll cycle`,
                            default_value: 'false'
                        },
                        {
                            label: '[pauseByHover]',
                            type: 'boolean',
                            description: `Carousel will not scroll if the cursor is hovered over`,
                            default_value: 'false'
                        },
                        {
                            label: '[slidesToScroll]',
                            type: 'number',
                            description: `-`,
                            default_value: '1'
                        },
                        {
                            label: '[slidesToShow]',
                            type: 'number',
                            description: `-`,
                            default_value: '1'
                        },
                        {
                            label: '[timeout]',
                            type: 'number',
                            description: `Time between scrolling`,
                            default_value: '0'
                        },
                        {
                            label: '[offset]',
                            type: 'number',
                            description: `Slide offsets`,
                            default_value: '0'
                        },
                    ]
                }
            ],
        };

        this.currentWidth = window.innerWidth;
        this.changeCarouselConfig();
    }

}
