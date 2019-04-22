import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthorService } from './services/author.service';
import { PublicationService } from './services/publication.service';
import { HomeComponent } from './components/home/home.component';
import { GenericService } from './services/generic.service';
import { AuthorsComponent } from './components/home/authors/authors.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthorEffects } from './store/effects/author.effects';
import { PublicationsComponent } from './components/home/publications/publications.component';
import { PublicationEffects } from './store/effects/publication.effects';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ReactiveFormsModule } from '@angular/forms';
import { ChipsComponent } from './components/library/chips/chips.component';
import { SidebarModule } from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SelectButtonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthorEffects, PublicationEffects]),
    SidebarModule,
    ButtonModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AuthorsComponent,
    PublicationsComponent,
    ChipsComponent
  ],
  providers: [
    AuthorService,
    PublicationService,
    GenericService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
