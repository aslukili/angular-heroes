import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Hero } from './hero';



@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const heroes = [
      {id: 12, name: "someone"},
      {id: 13, name: "sometwo"},
      {id: 14, name: "somethree"},
      {id: 15, name: "somefour"},
      {id: 16, name: "somefive"},
      {id: 17, name: "somesex"},
      {id: 18, name: "someseven"},
      {id: 19, name: "someeight"},
    ];
    return { heroes };
  }

  // method to generate an ID when we add a new hero / IDs begin at 11
  genId(heroes: Hero[]):number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }
}
