import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { GetUserProfileRequest } from '@mp/app/user-view/util';
import { IGetProfileRequest, IProfile } from '@mp/api/profiles/util';
import { UserViewState, UserViewStateModel } from '@mp/app/user-view/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FriendRequestStatus } from '@mp/api/friend/util';
import { IMemory } from '@mp/api/memories/util';
import { IUser } from '@mp/api/users/util';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.page.html',
  styleUrls: ['./user-view.page.scss'],
})
export class UserViewPageComponent {
  @Select(UserViewState.userView) userProfile$!: Observable<IProfile | null>;

  added = false;
  btn_text = 'Send friend request';
  handlerMessage = '';
  roleMessage = '';
  showExpandedView = false;

  memories!: IMemory[] | null | undefined;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private readonly store: Store,
  ) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to unfriend <user name>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Unfriend canceled';
          },
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Unfriened <user name>';
            this.presentToast('top');
            this.removeFriend();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Unfriended <user name>',
      duration: 1600,
      position: position,
      color: 'danger',
    });

    await toast.present();
  }

  addedNewFriend() {
    this.added = true;
    this.btn_text = 'You are friends';
  }

  removeFriend() {
    this.added = false;
    this.btn_text = 'Send friend request';

    // const status = FriendRequestStatus['REJECTED'];

    // this.store.dispatch(new UpdateFriendRequest(status));
  }

  changeMemoryView() {
    this.showExpandedView = !this.showExpandedView;
  }

  get Memories(): IMemory[] | null {
    this.userProfile$.subscribe((userProfile) => {
      this.memories = userProfile?.memories;
    });

    if (!this.memories) return null;

    return this.memories;
  }

  getProfileImgUrl() {
    let imgUrl = '';
    this.userProfile$.subscribe((profile) => {
      if (profile?.user?.profileImgUrl) {
        imgUrl = profile.user.profileImgUrl;
      }
      else {
        imgUrl = '../../../../../assets/Design_icons/Design icons/Login page background and images/Big person.png';
      }
    })

    return imgUrl;
  }
}
