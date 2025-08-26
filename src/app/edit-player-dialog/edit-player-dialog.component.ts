import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-player-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './edit-player-dialog.component.html',
  styleUrl: './edit-player-dialog.component.scss'
})
export class EditPlayerDialogComponent {

  allProfilePictures = ['yoga.png', 'girl.png', 'young_men.png', 
    'boy.png', 'penguin.png', 'sleep.png',
    'smiley.png', 'sumo.png', 'stewardess.png', 'teacher.png'
  ];

  constructor(public dialogRef: MatDialogRef<EditPlayerDialogComponent>){};
}
