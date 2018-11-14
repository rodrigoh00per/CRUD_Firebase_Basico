import { Component, OnInit } from "@angular/core";
import { HeroesService } from "src/app/services/heroes.service";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"],
  providers: [HeroesService]
})
export class HeroesComponent implements OnInit {
  private heroes: any[];
  private loading:boolean;

  constructor(private _heroesService: HeroesService) {
    this.heroes = [];
    this.loading=true;

    this._heroesService.getHeroes().subscribe(data => {
      console.log(data);

      //aqui estas haciendo un arreglo de heroes

      console.log(this.heroes);


      setTimeout(()=>{
        this.loading=false;
        this.heroes = data;
      },1000);
    
    });
    
  }

  ngOnInit() {}

  eliminarHeroe(id:string){
    console.log(this.heroes[id]);
    delete this.heroes[id];
    this._heroesService.eliminarHeroe(id).subscribe(data=>{
      console.log(data);
  
    });

  }
}
