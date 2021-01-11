import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoAudioPlayerComponent } from './demo-audio-player.component';

describe('DemoAudioPlayerComponent', () => {
    let component: DemoAudioPlayerComponent;
    let fixture: ComponentFixture<DemoAudioPlayerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DemoAudioPlayerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoAudioPlayerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
