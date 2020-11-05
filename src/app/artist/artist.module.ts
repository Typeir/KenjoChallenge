import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistComponent } from './artist.component';
import { ArtistService } from './artist.service';

@NgModule({
  declarations: [ArtistComponent],
  imports: [CommonModule, ArtistRoutingModule, CommonModule, FormsModule],
  providers: [HttpClient, ArtistService],
})
export class ArtistModule {}
