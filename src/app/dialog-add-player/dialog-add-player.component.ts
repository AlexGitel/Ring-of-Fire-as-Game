import { Component } from '@angular/core';
import {
  MatDialogRef, MatDialogActions, MatDialogClose,
  MatDialogContent, MatDialogModule, MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';




@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatDialogModule,
    FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDialogTitle],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  playerName: string = '';

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }

  noThanks() {
    this.dialogRef.close();
  }

}
