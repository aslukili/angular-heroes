import { Component, OnInit, Input} from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
  }

  // back to previous page
  goBack(): void {
    this.location.back();
  }

  // save changes to the server
  save():void {
    if (this.hero){
      this.heroService.updateHero(this.hero)
      .subscribe(() =>this.goBack())
    }
    
  }

  @Input() hero?: Hero;
}
