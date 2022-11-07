import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPasswordDialogComponent } from './admin-password-dialog.component';

describe('AdminPasswordDialogComponent', () => {
  let component: AdminPasswordDialogComponent;
  let fixture: ComponentFixture<AdminPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPasswordDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
