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
import { AuthorsDesktopComponent } from './components/home/authors-desktop/authors-desktop.component';
import { AuthorsMobileComponent } from './components/home/authors-mobile/authors-mobile.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthorEffects } from './store/effects/author.effects';
import { PublicationsComponent } from './components/home/publications/publications.component';
import { PublicationEffects } from './store/effects/publication.effects';
import { SelectButtonModule } from 'primeng/selectbutton';

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
    EffectsModule.forRoot([AuthorEffects, PublicationEffects])
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AuthorsDesktopComponent,
    AuthorsMobileComponent,
    PublicationsComponent
  ],
  providers: [
    AuthorService,
    PublicationService,
    GenericService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
