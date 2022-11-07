import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUsuarioDialogComponent } from './new-usuario-dialog.component';

describe('NewUsuarioDialogComponent', () => {
  let component: NewUsuarioDialogComponent;
  let fixture: ComponentFixture<NewUsuarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUsuarioDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUsuarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
