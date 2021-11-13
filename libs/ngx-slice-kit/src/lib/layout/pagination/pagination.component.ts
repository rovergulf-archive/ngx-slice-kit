import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'sdk-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    @Input() public page: number;
    @Input() public count: number;
    @Input() public limit: number;
    @Input() public small: boolean;

    @Output() public changed = new EventEmitter();

    public rightArrowHovered: boolean = false;
    public leftArrowHovered: boolean = false;
    public pageCount: number;

    constructor() {
    }

    public pageChange(page): void {
        if (this.page === page) {
            return;
        }

        this.page = page;
        this.createPageArray();
        this.changed.emit(page);
    }

    public createPageArray(): Page[] {
        switch (this.page) {
            case 1:
                return [
                    {value: 1},
                    {value: 2},
                    {value: 3},
                    {value: '...', disabled: true},
                    {value: this.pageCount}
                ];
            case 2:
                return [
                    {value: 1},
                    {value: 2},
                    {value: 3},
                    {value: 4},
                    {value: '...', disabled: true},
                    {value: this.pageCount}
                ];
            case 3:
                return [
                    {value: 1},
                    {value: 2},
                    {value: 3},
                    {value: 4},
                    {value: '...', disabled: true},
                    {value: this.pageCount}
                ];
            case this.pageCount - 2:
                return [
                    {value: 1},
                    {value: '...', disabled: true},
                    {value: this.pageCount - 3},
                    {value: this.pageCount - 2},
                    {value: this.pageCount - 1},
                    {value: this.pageCount}
                ];
            case this.pageCount - 1:
                return [
                    {value: 1},
                    {value: '...', disabled: true},
                    {value: this.pageCount - 3},
                    {value: this.pageCount - 2},
                    {value: this.pageCount - 1},
                    {value: this.pageCount}
                ];
            case this.pageCount:
                return [
                    {value: 1},
                    {value: '...', disabled: true},
                    {value: this.pageCount - 2},
                    {value: this.pageCount - 1},
                    {value: this.pageCount}
                ];
            default:
                return [
                    {value: 1},
                    {value: '...', disabled: true},
                    {value: this.page - 1},
                    {value: this.page},
                    {value: this.page + 1},
                    {value: '...', disabled: true},
                    {value: this.pageCount}
                ];
        }
    }

    public getPageCount(): number {
        return Math.ceil(this.count / this.limit);
    }

    public getPages(): Page[] {
        let pages = [];
        const pageCount = this.getPageCount();
        if (pageCount > 5) {
            pages = this.createPageArray();
        } else {
            for (let i = 1; i <= pageCount; i++) {
                pages.push({value: i} as Page);
            }
        }

        return pages;
    }

    public ngOnInit(): void {
        this.pageCount = this.getPageCount();
    }
}

interface Page {
    value: number | string;
    disabled?: boolean;
}
