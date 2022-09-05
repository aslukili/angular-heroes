import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, observable, of } from 'rxjs';

import { MessageService } from './message.service';

// to get the heroes from a server, we need HTTP client and http headers to be imported
import { HttpClient, HttpHeaders } from '@angular/common/http';

// error handling and orther symbols
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // api route
  private heroesUrl = 'api/heroes';

  // http options to use with CRUD operations
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  // get all heroes from the url
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', [])
      )
    );
  }

  // get heroes from mock-heroes
  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES);
  //   this.messageService.add('HeroService: fetched heroes');
  //   return heroes;
  // }

  //get info of one hero based on his id
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id: ${id}`)),
      catchError(this.handleError<Hero>(`hetHero id ${id}`))
    )
  }

  // PUT: update hero on the server
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  // POST: add new hero to the list of heroes
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>(`addHero`))
    );
  }

  // DELETE: delete a particular hero
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }

  searchHeroes(term: String): Observable<Hero[]> {
    if (!term.trim()) {
      // returning an emty array if no serch term is provided
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching ${term}`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  // instead of calling message service frequently, we'll add a log method.
  private log(message: string) {
    this.messageService.add(`HeroService:  ${message}`);
  }

  // error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); //log to console instead
      
      this.log(`${operation} failed: ${error.message}`);


      // let the app working by returning an emty result
      return of(result as T);
    }
  }
}
