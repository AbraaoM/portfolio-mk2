import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildInPublicComponent } from './build-in-public.component';

describe('BuildInPublicComponent', () => {
  let component: BuildInPublicComponent;
  let fixture: ComponentFixture<BuildInPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildInPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildInPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
