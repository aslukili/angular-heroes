import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  // get heroes from mock-heroes
  getHeroes(): Hero[] {
    return HEROES;
  }
}
