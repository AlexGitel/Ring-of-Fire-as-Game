
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { GameObjects } from '../../models/game-objects';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {}

  // a new Object will be created, added and saved as JSON in Database
  // and all Info with URL-ID navigated to game.component.ts
  async newGame() {
    let game = new GameObjects();
   await addDoc(collection(this.firestore, 'games'), game.gameObjectsToJson())
  .then((gameInfo) => { // then called only once, licke onInit
      this.router.navigate(['/game/', gameInfo.id]);      
    } );
  }
}