import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogClose],
  templateUrl: './edit-player-dialog.component.html',
  styleUrl: './edit-player-dialog.component.scss'
})
export class EditPlayerDialogComponent {

  allProfilePictures = ['yoga.png', 'girl.png', 'young_men.png', 
    'boy.png', 'penguin.png', 'sleep.png',
    'smiley.png', 'sumo.png', 'stewardess.png', 'teacher.png'
  ];

}
