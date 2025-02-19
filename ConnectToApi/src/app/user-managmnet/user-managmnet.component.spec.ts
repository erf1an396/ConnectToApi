import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagmnetComponent } from './user-managmnet.component';

describe('UserManagmnetComponent', () => {
  let component: UserManagmnetComponent;
  let fixture: ComponentFixture<UserManagmnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagmnetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagmnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
