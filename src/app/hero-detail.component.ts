import { Component, Input, OnInit } from '@angular/core'; // to create new component, always import Component symbol
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from './hero'; // declare only one class per file rule
import { HeroService } from './hero.service';
import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'hero-detail', // needed to create <hero-detail> element in html template
	templateUrl: './hero-detail.component.html',
	styleUrls: [ './hero-detail.component.css' ],
})

export class HeroDetailComponent implements OnInit { // always export component class, because its always imported elsewhere
	ngOnInit(): void {
		this.route.paramMap
			.switchMap(
				(params: ParamMap) => this.heroService.getHero(+params.get('id'))
			).subscribe(hero => this.hero = hero);
	}
	@Input() hero: Hero;

	goBack(): void {
		this.location.back();
	}
	
	constructor(
		private heroService: HeroService,
		private route: ActivatedRoute,
		private location: Location,
	) {}
}