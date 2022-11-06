import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDocenteDialogComponent } from './new-docente-dialog.component';

describe('NewDocenteDialogComponent', () => {
  let component: NewDocenteDialogComponent;
  let fixture: ComponentFixture<NewDocenteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDocenteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDocenteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
