import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { environment } from '../environments/environment';
import { AuthorService } from './services/author.service';
import { PublicationService } from './services/publication.service';
import { HomeComponent } from './components/home/home.component';
import { GenericService } from './services/generic.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    VirtualScrollerModule
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    AuthorService,
    PublicationService,
    GenericService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
