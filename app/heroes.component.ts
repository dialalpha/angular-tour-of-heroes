import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

export class Hero {
  id: number;
  name: string
}


@Component({
  moduleId: module.id,
  providers: [HeroService],
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html' ,
  styleUrls: [
    'heroes.component.css'
    ]

})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService) {

  }
  
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
    });
  }


  getHeroes(): void {
     this.heroService.getHeroes()
      .then(result => this.heroes = result);
  }

  gotoDetail = () : void => {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  /// OnInit interface - lifecylce hook
  ngOnInit(): void{
    this.getHeroes();
  }
}
