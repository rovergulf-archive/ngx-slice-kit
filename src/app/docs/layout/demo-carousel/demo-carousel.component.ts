import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-carousel',
    templateUrl: './demo-carousel.component.html',
    styleUrls: ['./demo-carousel.component.scss']
})
export class DemoCarouselComponent implements OnInit {

    lotrPostersUrl = [
        'https://i.pinimg.com/originals/c4/2d/ba/c42dba6ca462fa8be128de279b90df12.jpg',
        'https://i.pinimg.com/originals/85/41/96/85419608023549c248268647a9afc59d.png',
        'https://mypostercollection.com/wp-content/uploads/2018/06/The-Lord-Of-The-Rings-2-The-Two-Towers-MyposterCollection.com-16.jpg',
        'https://i.pinimg.com/originals/4c/14/9c/4c149cc160b9cfe4399ce3da4e2cad7c.jpg',
        'https://cdn.shopify.com/s/files/1/0182/2915/products/Colour_LOTR_ROTK_HighRes_KF_01_2048x.png?v=1571438986',
        'https://i.pinimg.com/236x/50/8a/7f/508a7f0f4e9aa7f43fff04a5209c51ef--tolkien-volcano.jpg',
        'https://i.pinimg.com/564x/57/e4/98/57e498ea8289e62829720420502c426b.jpg',
        'https://i.pinimg.com/564x/73/4a/51/734a51ca8f2b2a21f600115f85e2f848.jpg',
        'https://i.pinimg.com/564x/64/ed/67/64ed67517a9573778c2a4f9065b45a8e.jpg',
    ];

    currentWidth: number;

    carousel1Config = {
        offset: 24,
        slidesToScroll: 3,
        slidesToShow: 3,
        pauseByHover: true,
        infinity: true,
        timeout: 5000
    };

    carousel2Config = {
        offset: 24,
        slidesToScroll: 3,
        slidesToShow: 3,
        pauseByHover: true,
        infinity: true,
        timeout: 0
    };

    carousel3Config = {
        offset: 24,
        slidesToScroll: 2,
        slidesToShow: 2,
        pauseByHover: true,
        infinity: true,
        timeout: 0,
        arrows: false
    };

    carousel4Config = {
        offset: 8,
        slidesToScroll: 2,
        slidesToShow: 8,
        pauseByHover: true,
        infinity: true,
        timeout: 0,
        arrows: true,
    };

    carousel5Config = {
        offset: 12,
        slidesToScroll: 3,
        slidesToShow: 3,
        pauseByHover: true,
        infinity: false,
        timeout: 0,
        arrows: false,
    };

    carousel6Config = {
        offset: 0,
        slidesToScroll: 1,
        slidesToShow: 1,
        pauseByHover: true,
        infinity: true,
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
        if (this.currentWidth >= 1800) {
            this.carousel4Config = {...this.carousel4Config, slidesToShow: 8, slidesToScroll: 2};
        } else if (this.currentWidth >= 1600) {
            this.carousel4Config = {...this.carousel4Config, slidesToShow: 5, slidesToScroll: 2};
        } else if (this.currentWidth >= 1280) {
            this.carousel4Config = {...this.carousel4Config, slidesToShow: 3, slidesToScroll: 2};
            this.carousel5Config = {...this.carousel5Config, slidesToShow: 3, slidesToScroll: 3};
        } else if (this.currentWidth >= 800) {
            this.carousel1Config = {...this.carousel1Config, slidesToShow: 3, slidesToScroll: 3};
            this.carousel2Config = {...this.carousel2Config, slidesToShow: 3, slidesToScroll: 3};
            this.carousel3Config = {...this.carousel3Config, slidesToShow: 2, slidesToScroll: 2};
            this.carousel4Config = {...this.carousel4Config, slidesToShow: 2, slidesToScroll: 2};
            this.carousel5Config = {...this.carousel5Config, slidesToShow: 2, slidesToScroll: 2};
        } else if (this.currentWidth >= 480) {
            this.carousel1Config = {...this.carousel1Config, slidesToShow: 2, slidesToScroll: 2};
            this.carousel2Config = {...this.carousel2Config, slidesToShow: 2, slidesToScroll: 2};
            this.carousel3Config = {...this.carousel3Config, slidesToShow: 1, slidesToScroll: 1};
            this.carousel4Config = {...this.carousel4Config, slidesToShow: 2, slidesToScroll: 2};
            this.carousel5Config = {...this.carousel5Config, slidesToShow: 2, slidesToScroll: 2};
        } else if (this.currentWidth >= 320) {
            this.carousel1Config = {...this.carousel1Config, offset: 8, slidesToShow: 1, slidesToScroll: 1};
            this.carousel2Config = {...this.carousel2Config, offset: 8, slidesToShow: 1, slidesToScroll: 1};
            this.carousel4Config = {...this.carousel4Config, slidesToShow: 1, slidesToScroll: 1};
            this.carousel5Config = {...this.carousel5Config, slidesToShow: 1, slidesToScroll: 1};
        }
    }

    ngOnInit(): void {
        this.currentWidth = window.innerWidth;
        this.changeCarouselConfig();
    }

}
