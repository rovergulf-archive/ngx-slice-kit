import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { CoreModule } from '../core.module';

describe ('ApiService', () => {
    let service: ApiService;
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    beforeEach (() => {
        TestBed.configureTestingModule ({
            imports: [
                HttpClientTestingModule,
                CoreModule
            ],
            providers: [
                ApiService
            ]
        });
        service = TestBed.inject (ApiService);
        httpMock = TestBed.get (HttpTestingController);
        httpClient = TestBed.inject (HttpClient);
    });

    it ('should be created', () => {
        expect (service).toBeTruthy ();
    });
});
