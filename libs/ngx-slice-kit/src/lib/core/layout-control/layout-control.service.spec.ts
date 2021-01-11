import { TestBed } from '@angular/core/testing';

import { LayoutControlService } from './layout-control.service';

describe('LayoutControlService', () => {
    let service: LayoutControlService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LayoutControlService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
