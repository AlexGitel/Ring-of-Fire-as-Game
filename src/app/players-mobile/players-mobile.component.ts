import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-players-mobile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players-mobile.component.html',
  styleUrl: './players-mobile.component.scss'
})
export class PlayersMobileComponent {
    @Input() name: string = '';
    @Input() profileImage = 'empty_img.png';
    @Input() ifPlayerActive: boolean = false;
}
