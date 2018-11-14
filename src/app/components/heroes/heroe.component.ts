import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Heroe } from "src/app/interfaces/heroe.interface";
import { HeroesService } from "../../services/heroes.service";
import { Router, ActivatedRoute } from "@angular/router";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
@Component({
  selector: "app-heroe",
  templateUrl: "./heroe.component.html",
  providers: [HeroesService]
})
export class HeroeComponent implements OnInit {
  heroe: Heroe;
  private id: string;
  constructor(
    private _heroesService: HeroesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.heroe = {
      nombre: "",
      bio: "",
      casa: ""
    };
    this._activatedRoute.params.subscribe(valorurl => {
      console.log(valorurl);

      this.id = valorurl["id"];

      if (this.id == "nuevo") {
      } else {
        this._heroesService.getHeroe(this.id).subscribe(_heroe => {
          this.heroe = _heroe;
          console.log("el heroe es ", this.heroe);
        });
      }
    });
  }

  ngOnInit() {}

  //NOS PERMITE HACER UN POST A FIREBASE Y UN PUT
  guardar() {
    console.log("los datos del heroe antes de guardar son", this.heroe);
    console.log("antes de guardar mi id es ", this.id);
    if (this.id == "nuevo") {
      this._heroesService.nuevoHeroe(this.heroe).subscribe(
        heroe_f => {
          console.log(heroe_f);
          this._router.navigate(["/heroe", heroe_f.name]);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this._heroesService.actualizarHeroe(this.heroe, this.id).subscribe(
        heroe_act => {
          console.log(heroe_act);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  //reseteamos el formulario
  nuevoHeroeReset(formu: NgForm) {
    console.log(formu);

    this._router.navigate(["/heroe", "nuevo"]);
    
  }
}
