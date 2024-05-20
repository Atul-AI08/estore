import { Component, Input } from '@angular/core';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.scss'
})
export class RatingsComponent {
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faStarEmpty = faStarEmpty;

  stars: number[] = [];

  private _score: number = 0;

  @Input()
  set score(val: number){
    this._score = val > 5? 5:val;
    this.updateStars();
  }

  private updateStars(): void {
    this.stars = [];
    const solidStarCount: number = Math.floor(this._score);
    for (let i: number = 0; i < solidStarCount; i++) {
      this.stars.push(0);
    }

    if (this._score - solidStarCount > 0 && this._score - solidStarCount < 1) {
      this.stars.push(1);
    }

    while (this.stars.length < 5) {
      this.stars.push(2);
    }
  }
}
