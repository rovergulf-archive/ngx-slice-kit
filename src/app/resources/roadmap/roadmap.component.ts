import { Component, OnInit } from '@angular/core';

const version1 = [
    {
        title: 'Buttons module',
        children: [
            {name: 'Buttons', link: '/docs/buttons/', ready: true, docs: true},
            {name: 'Segmented buttons', link: '/docs/buttons/', ready: true, docs: true},
            {name: 'Icons', link: '/docs/buttons/', ready: true, docs: true},
        ]
    },
    {
        title: 'Inputs module',
        children: [
            {name: 'Checkbox', link: '/docs/inputs/', ready: true, docs: true},
            {name: 'Input', link: '/docs/inputs/', ready: true, docs: true},
            {name: 'Textarea', link: '/docs/inputs/', ready: true, docs: true},
            {name: 'Toggle', link: '/docs/inputs/', ready: true, docs: true},
            {name: 'Radio', link: '/docs/inputs/', ready: true, docs: true},
        ]
    },
    {
        title: 'Dropdowns module',
        children: [
            {name: 'Autocomplete', link: '/docs/dropdowns/', ready: true, docs: true},
            {name: 'Select', link: '/docs/dropdowns/', ready: true, docs: true},
            {name: 'Dropdown', link: '/docs/dropdowns/', ready: true, docs: true},
        ]
    },
    {
        title: 'Modals module',
        children: [
            {name: 'Alerts', link: '/docs/modals/', ready: true, docs: true},
            {name: 'Dialog', link: '/docs/modals/', ready: true, docs: true},
            {name: 'Popup', link: '/docs/modals/', ready: true, docs: true},
            {name: 'Tooltip', link: '/docs/modals/', ready: true, docs: true},
        ]
    },
    {
        title: 'Navigation module',
        children: [
            {name: 'Nav menu', link: '/docs/navigation/menu', ready: true, docs: true},
            {name: 'Nav tabs', link: '/docs/navigation/navtabs', ready: true, docs: true},
            {name: 'Sidenav', link: '/docs/navigation/sidenav', ready: true, docs: true},
            {name: 'Tabs', link: '/docs/navigation/tabs', ready: true, docs: true},
        ]
    },
    {
        title: 'Layout module',
        children: [
            {name: 'Carousel', link: '/docs/layout/carousel', ready: true, docs: true},
            {name: 'Divider', link: '/docs/layout/divider', ready: true, docs: true},
            {name: 'Pagination', link: '/docs/layout/pagination', ready: true, docs: true},
            {name: 'Progress', link: '/docs/layout/progress', ready: true, docs: true},
            {name: 'Slider', link: '/docs/layout/slider', ready: true, docs: true},
        ]
    },
];

const version2 = [
    {
        title: 'Overlay module',
        children: [
            {name: 'Overlay service', link: '/docs/overlay', ready: false, docs: false},
            {name: 'Layout control service', link: '/docs/overlay/lcs', ready: false, docs: false},
        ]
    },
    {
        title: 'Modals module',
        children: [
            {name: 'Popover', link: '/docs/modals/popover', ready: false, docs: false},
        ]
    },
    {
        title: 'Cards module',
        children: [
            {name: 'Card', link: '', ready: false, docs: false},
        ]
    },
];

@Component({
    selector: 'app-roadmap',
    templateUrl: './roadmap.component.html',
    styleUrls: ['./roadmap.component.scss', '../resources.module.scss']
})
export class RoadmapComponent implements OnInit {

    versions: { name: string, children: any[] }[] = [{
        name: 'Version 1',
        children: version1,
    }, {
        name: 'Version 2',
        children: version2,
    }];

    constructor() {
    }

    ngOnInit(): void {
        console.log(this);
    }

}
