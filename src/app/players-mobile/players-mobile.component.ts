import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-players-mobile',
  standalone: true,
  imports: [],
  templateUrl: './players-mobile.component.html',
  styleUrl: './players-mobile.component.scss'
})
export class PlayersMobileComponent {
    @Input() name: string = '';
    @Input() ifPlayerActive: boolean = false;
}
