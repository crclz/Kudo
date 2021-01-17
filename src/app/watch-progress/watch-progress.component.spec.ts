import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchProgressComponent } from './watch-progress.component';

describe('WatchProgressComponent', () => {
  let component: WatchProgressComponent;
  let fixture: ComponentFixture<WatchProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
