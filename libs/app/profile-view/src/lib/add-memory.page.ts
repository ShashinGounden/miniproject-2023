import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Memory } from './Memory';

@Component({
  selector: 'app-add-memory',
  templateUrl: './add-memory.page.html',
  styleUrls: ['./add-memory.page.scss'],
})
export class AddMemoryPageComponent {
  memory: Memory = {
    title:'',
    description: '',
    image: '',
    date: '',
  };

  constructor(public modalController: ModalController){}

  async save() {
    const dateObj = new Date(this.memory.date);
    // mulitply timezone offset with 60000 to get offset in milliseconds
    const timezoneOffset = dateObj.getTimezoneOffset() * 60000;
    // subtract it from original date to get the local date and time
    const localDate = new Date(dateObj.getTime() - timezoneOffset);
    const formattedDate = localDate.toLocaleDateString(navigator.language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const newMemory: Memory = {
      title: this.memory.title,
      description: this.memory.description,
      image: this.memory.image,
      date: formattedDate
    }



    await this.modalController.dismiss(this.memory);
  }

  async cancel() {
    await this.modalController.dismiss();
  }
}
