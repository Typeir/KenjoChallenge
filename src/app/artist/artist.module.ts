import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';
import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistComponent } from './artist.component';
import { ArtistFormComponent } from './components/artistForm/artist-form.component';
import { ArtistItemComponent } from './components/artistItem/artist-item.component';

@NgModule({
  declarations: [ArtistComponent, ArtistFormComponent, ArtistItemComponent],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
  ],
  providers: [HttpClient],
})
export class ArtistModule {}
