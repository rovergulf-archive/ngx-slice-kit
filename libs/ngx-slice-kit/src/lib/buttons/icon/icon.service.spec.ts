import { inject, TestBed } from '@angular/core/testing';

import { IconService } from './icon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Renderer2 } from '@angular/core';

describe('IconService', () => {
    let service: IconService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                IconService,
                Renderer2
            ]
        });
        service = TestBed.inject(IconService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should #getIcon() call #createIcon()', inject([IconService], (service: IconService) => {
        const icon = 'twitter';
        spyOn(service, 'createIcon');
        service.getIcon(icon);
        expect(service.createIcon).toHaveBeenCalled();
    }));
});
