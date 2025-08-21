import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tasks-for-players',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './tasks-for-players.component.html',
  styleUrl: './tasks-for-players.component.scss'
})
export class TasksForPlayersComponent implements OnChanges {

  cardTasks = [
    { title: 'Freeze!', description: 'Der Spieler stellt sofort eine Statue dar. Alle anderen müssen sie nachmachen. Wer lacht oder sich bewegt, verliert und bekommt eine Zusatzaufgabe.' },
    { title: 'Emoji-Challenge', description: 'Stell nur mit deinem Gesicht einen Emoji nach. Die anderen müssen raten, welcher es ist.' },
    { title: 'Akzent', description: 'Sprich die nächsten 3 Runden in einem Akzent (z. B. französisch, bayerisch, italienisch).' },
    { title: 'Film-Szene', description: 'Stelle eine bekannte Filmszene pantomimisch dar (z. B. Titanic, Star Wars, Harry Potter).' },
    { title: 'Emotionstausch', description: 'Sprich einen Satz in einer falschen Emotion (z. B. „Ich habe Hunger!“ in extremer Traurigkeit). Die Gruppe muss erraten, welche Emotion es war.' },
    { title: 'Bewegungsrunde', description: 'Alle machen dieselbe kurze Sportübung (z. B. 10 Sekunden Hampelmann, 5 Kniebeugen, ein Tanzmove).' },
    { title: 'Geschichtenrunde', description: 'Alle erzählen nacheinander ein Wort und es entsteht eine (verrückte) Geschichte.' },
    { title: 'Neue Regel', description: 'Erfinde eine verrückte Zusatzregel für den Rest des Spiels (z. B. „immer wenn jemand lacht, muss er schnipsen“).' },
    { title: 'Rhyme', description: 'Sag ein Wort. Im Uhrzeigersinn muss jeder einen Reim sagen. Wer scheitert oder doppelt, trinkt.' },
    { title: 'Song-Challenge', description: 'Singe eine Zeile aus einem Lied. Die Gruppe muss sagen, welches es ist.' },
    { title: 'Quizmaster', description: 'Stell der Runde eine Wissensfrage (z. B. „Hauptstadt von Kanada?“). Wer falsch liegt, muss eine Mini-Strafe machen.' },
    { title: 'Kompliment-Theater', description: 'Sag der Person links von dir ein Kompliment – aber so übertrieben gespielt wie möglich (z. B. wie in einer Soap-Opera).' },
    { title: 'König der Party', description: 'Du darfst dir eine neue Party-Challenge für alle ausdenken (z. B. „alle tanzen 10 Sekunden lang“, „alle reden 1 Runde lang in Reimen“).' },
  ];

  title = '';
  description = '';

  @Input() card: string = '';

  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card?.split('_')[1];
      this.title = this.cardTasks[cardNumber - 1].title;
      this.description = this.cardTasks[cardNumber - 1].description;
    }
  }
}
