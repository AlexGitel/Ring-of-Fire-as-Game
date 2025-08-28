
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ElementRef, ViewChildren, QueryList  } from '@angular/core';
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
import { PlayersMobileComponent } from '../players-mobile/players-mobile.component';
import { EditPlayerDialogComponent } from '../edit-player-dialog/edit-player-dialog.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayersComponent, MatButtonModule, 
    MatIconModule, TasksForPlayersComponent, PlayersMobileComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnDestroy {
  game: GameObjects = new GameObjects();
  gameId!: string; // will be needed in updateGameAndSave().
  gameOver = false;
  fadeOut = false;  

  unsubscribe!: () => void;

  firestore: Firestore = inject(Firestore);

  // Player-Elements collect (per Template-Ref #mobilePlayer / #desktopPlayer )
  @ViewChildren('mobilePlayer', { read: ElementRef }) playersMobile!: QueryList<ElementRef>;
  @ViewChildren('desktopPlayer', { read: ElementRef }) playersDesktop!: QueryList<ElementRef>;

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
    console.log(data);
    
      this.game = GameObjects.fromJsonToGameObjects(data);
    });
  }

  // to unsubscribe
  ngOnDestroy(){
    this.unsubscribe();
  }

  // function to chouse (pick) a new card (with flying to side)
  pickCard() {
    if (!this.validatePlayer()) return;

    if (!this.game.pickCardAnimation) {
      if (this.game.stack.length === 0){ this.gameOver = true; 
        setTimeout(() => { this.fadeOut = true; }, 1000);
      };

      this.pickNextCard();
      this.nextPlayer();
      this.afterAnimation();
    }
  }

  // checks if player selected before starting the game
  validatePlayer(): boolean {
    if (this.game.players.length === 0 || this.game.currentPlayer < 0) {
      this.snackBar.open('Please select a player first!', 'OK', { duration: 2000 });
      return false;
    }
    return true;
  }

  // pick and show next card, card fly animation
  pickNextCard() {
    this.game.currentCard = this.game.stack.pop() ?? ''; // pick next card
    this.game.pickCardAnimation = true; // start Animation
  }

  // next player, show next player in bar
  nextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer %= this.game.players.length;
    this.scrollToActivePlayerMobile();
    this.scrollToActivePlayerDesktop();
  }

  // if card chosen, save the status of the game
  afterAnimation() {
    setTimeout(() => {
      this.ifCardPicked();
      this.game.pickCardAnimation = false;
      this.updateGameAndSave();
    }, 1100);
  }

  // if card is picked, it will be shown
  ifCardPicked() {
    if (this.game.currentCard) {
      this.game.playedCards.push(this.game.currentCard);
    }
  }

  // opens Dialog to add new player
  openDialog() {
      if (this.game.players.length >= 10) {
      this.snackBar.open('Max. number of players (10) reached!', 'OK', {
        duration: 3000
      });
      return;
    }
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((playerName: string) => {
      if (playerName) {
        this.game.players.push(playerName);
        this.game.player_profile.push('empty_img.png');
        this.updateGameAndSave();
      }
    });
  }

  // to choose profile image and change the standard image of player 
  editProfile(playerId: number){
    const dialogRef = this.dialog.open(EditPlayerDialogComponent);
     dialogRef.afterClosed().subscribe((change: string) => {
      console.log('Recived change', change);
      if(change){
        if(change == 'DELETE'){
           this.game.players.splice(playerId, 1);
           this.game.player_profile.splice(playerId, 1);
        } else {
          this.game.player_profile[playerId] = change;
        }
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

  // scroll to active player -for mobile players bar
  private scrollToActivePlayerMobile() {
    const active = this.playersMobile.get(this.game.currentPlayer)?.nativeElement;
    if (active) {
      active.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest', 
        block: 'nearest'
      });
    }
  }

  // scroll to active player - for desktop players bar
  private scrollToActivePlayerDesktop() {
    const active = this.playersDesktop.get(this.game.currentPlayer)?.nativeElement;
    if (active) {
      active.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }

  restartGame() {
    // Reset game state
    // this.reshuffleCards(); // alle Karten wieder rein
    this.game.stack = [];
    this.game.playedCards = [];
    this.game.currentCard = '';
    this.game.currentPlayer = 0;
    this.gameOver = false;

    // Save reset state to Firestore
    this.updateGameAndSave();
  }
}