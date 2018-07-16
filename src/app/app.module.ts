import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './components/shared/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import 'hammerjs';

import { AppComponent } from './app.component';
import { CopyComponent } from './components/copy/copy.component';
import { ParticlesComponent } from './components/particles/particles.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

import { ContentService } from './services/content.service';
import { DynamodbService } from './services/dynamodb.service';


@NgModule({
  declarations: [
    AppComponent,
    CopyComponent,
    ParticlesComponent,
    MenubarComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot([
      { path: 'about_us', component: CopyComponent },
      { path: 'home', component: CopyComponent },
      { path: 'services', component: CopyComponent },
      { path: 'contact_us', component: ContactUsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: CopyComponent }
    ])
  ],
  providers: [
    ContentService,
    DynamodbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
