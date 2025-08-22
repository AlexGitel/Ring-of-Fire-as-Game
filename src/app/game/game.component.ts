
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GameObjects } from '../../models/game-objects';
import { PlayersComponent } from "../players/players.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { TasksForPlayersComponent } from '../tasks-for-players/tasks-for-players.component';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayersComponent, MatButtonModule, 
    MatIconModule, TasksForPlayersComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnDestroy{
  game: GameObjects = new GameObjects();
  gameId!: string; // will be needed in updateGameAndSave().

  unsubscribe!: () => void;

  firestore: Firestore = inject(Firestore);

  constructor (
    public dialog: MatDialog,
    private receivedRoute: ActivatedRoute,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties.
    this.loadGame();
  }

  // it gets ID from URL (from Database), gets ref to document, and converts
  // plain JSON from Database to GameObject again.
  async loadGame() {
    const gameIdFromUrl = this.receivedRoute.snapshot.paramMap.get('id'); // to get out ID from URL
    if (!gameIdFromUrl) {
        console.error("Keine ID in der Route gefunden");
      return;
    }
    this.gameId = gameIdFromUrl; // UrlId will be needed in updateGameAndSave().
    const gameRef = doc(this.firestore, "games", gameIdFromUrl); // ref to document
  
    this.unsubscribe = onSnapshot(gameRef, (list) => {
    const data = list.data();
      this.game = GameObjects.fromJsonToGameObjects(data);
    });
  }

  // to unsubscribe
  ngOnDestroy(){
    this.unsubscribe();
  }

  // function to chouse (pick) a new card (with flying to side)
  pickCard() { 
  if (!this.game.pickCardAnimation) { 
      if (this.game.stack.length === 0) {
        this.reshuffleCards();
      }
        this.game.currentCard = this.game.stack.pop() ?? ''; 
        this.game.pickCardAnimation = true; 
        this.game.currentPlayer++; 
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; 
        this.updateGameAndSave(); 
        
        setTimeout(() => { 
        this.ifCardPicked(); 
        this.game.pickCardAnimation = false; 
        this.updateGameAndSave(); 
      }, 1100); 
    }  
  }

  // if card is picked, it will be shown
  ifCardPicked() {
    if (this.game.currentCard) {
      this.game.playedCards.push(this.game.currentCard);
    }
  }

  // opens Dialog to add new player
  openDialog() {
      if (this.game.players.length >= 7) {
      this.snackBar.open('Maximale Spieleranzahl (7) erreicht!', 'OK', {
        duration: 3000
      });
      return;
    }
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((playerName: string) => {
      if (playerName) {
        this.game.players.push(playerName);
        this.updateGameAndSave();
      }
    });
  }

  // update game in database and saved
  async updateGameAndSave() {
    const docRef = doc(this.firestore, 'games', this.gameId);
    await updateDoc(docRef, this.game.gameObjectsToJson());
  }

  // all cards will be reshuffled again
  reshuffleCards() {
    if (this.game.playedCards.length > 0) {
      this.game.stack = this.game.shuffleCards([...this.game.playedCards]);
      this.game.playedCards = [];
    }
  }
}
