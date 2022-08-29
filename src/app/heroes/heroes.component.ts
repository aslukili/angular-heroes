import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  
  heroes: Hero[] = [];

  selectedHero?: Hero;

  constructor(private heroService: HeroService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getHeroes();
  }


  // when clicking a hero, it'll be the selectedHero variable
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`You have selected ${hero.id}`);
  // }

  // retrieving heroes from the service
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  //adding new hero to the list of heroes
  add(name: string): void {
    name = name.trim();
    if (!name) {return; }
    this.heroService.addHero({name} as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    })
  }

  //deleting a hero
  delete(hero: Hero):void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
