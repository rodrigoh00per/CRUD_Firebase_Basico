import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Heroe } from "../interfaces/heroe.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class HeroesService {
  //aqui esta la url de los posteos
  private heroesUrl;
  private heroeUrl;

  constructor(private _http: HttpClient) {
    this.heroesUrl = "https://heroesapp-830da.firebaseio.com/heroes.json";
    this.heroeUrl = "https://heroesapp-830da.firebaseio.com/heroes"; //url generica
  }

  //nos permite guardar un nuevo heroe en firebase
  nuevoHeroe(heroe: Heroe): Observable<any> {
    //body lo que queremos mandar
    let body = JSON.stringify(heroe);

    //el respectivo header
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this._http.post(this.heroesUrl, body, { headers: headers }).pipe(
      map((data: any) => {
        console.log(data);
        return data;
      })
    );
  }
  //se hace un bonito put a firebase
  actualizarHeroe(heroe: Heroe, key: string): Observable<any> {
    let body = JSON.stringify(heroe);

    let headers = new HttpHeaders().set("Content-Type", "application/json");

    let url = `${this.heroeUrl}/${key}.json`;
    console.log("la url es", url);
    return this._http.put(url, body, { headers: headers }).pipe(
      map((heroeact: any) => {
        console.log("heroeact", heroeact);
        return heroeact;
      })
    );
  }

  getHeroe(id: string): Observable<any> {
    let url = `${this.heroeUrl}/${id}.json`;

    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this._http.get(url, { headers: headers });
  }

  getHeroes(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.get(this.heroesUrl, { headers: headers });
  }

  eliminarHeroe(id: string): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    let url = `${this.heroeUrl}/${id}.json`;
    return this._http.delete(url, { headers: headers });
  }
}
