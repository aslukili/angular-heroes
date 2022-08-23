import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  heroes: Hero[] = [];

  selectedHero?: Hero;

  // when clicking a hero, it'll be the selectedHero variable
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  // retrieving heroes from the service
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }
}