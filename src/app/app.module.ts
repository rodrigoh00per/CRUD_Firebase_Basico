import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { HeroesComponent } from "./components/heroes/heroes.component";
import { HeroeComponent } from "./components/heroes/heroe.component";
import { appRouting } from "./app.routing";
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { KeysPipe } from './pipes/keys.pipe';

@NgModule({
  declarations: [AppComponent, HeroesComponent, HeroeComponent, KeysPipe],
  imports: [BrowserModule, appRouting, HttpModule,FormsModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
