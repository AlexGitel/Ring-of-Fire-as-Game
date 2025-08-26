import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent {
  @Input() name: string = '';
  @Input() profileImage = 'empty_img.png';
  @Input() ifPlayerActive: boolean = false;
}
