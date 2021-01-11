import { animate, group, query as q, style, transition, trigger } from '@angular/animations';

export function query(s, a) {
    return q(s, a, {optional: true});
}

const left = [
    style({position: 'relative'}),
    query(':enter, :leave', style({position: 'absolute', width: '100%'})),
    group([
        query(
            ':enter',
            [style({transform: 'translateX(-100%)'}), animate('0.6s ease-out', style({transform: 'translateX(0%)'}))]
        ),
        query(
            ':leave',
            [style({transform: 'translateX(0%)'}), animate('0.6s ease-out', style({transform: 'translateX(100%)'}))]
        ),
    ]),
];

const right = [
    style({position: 'relative'}),
    query(':enter, :leave', style({position: 'absolute', width: '100%'})),
    group([
        query(
            ':enter',
            [style({transform: 'translateX(100%)'}), animate('0.6s ease-out', style({transform: 'translateX(0%)'}))]
        ),
        query(
            ':leave',
            [style({transform: 'translateX(0%)'}), animate('0.6s ease-out', style({transform: 'translateX(-100%)'}))]
        ),
    ]),
];

export const slideInAnimation =
    trigger('routeAnimations', [
        transition(':increment', right),
        transition(':decrement', left),
    ]);
