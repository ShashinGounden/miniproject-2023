import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserViewPageComponent } from './user-view.page';

describe('UserViewPageComponent', () => {
  let component: UserViewPageComponent;
  let fixture: ComponentFixture<UserViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserViewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change button content to "You are friends" if the "Add friend" button is clicked and should set the "added" variable to true', () => {
    component.addedNewFriend();

    expect(component.btn_text).toEqual('You are friends');
    expect(component.added).toBeTruthy();
  });

  it('should change button content to "Send friend request" if the "Unfriend" button is clicked and should set the "added" variable to false', () => {
    component.removeFriend();

    expect(component.btn_text).toEqual('Send friend request');
    expect(component.added).toBeFalsy();
  });
});
