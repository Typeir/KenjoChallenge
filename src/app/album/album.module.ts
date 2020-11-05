import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album.component';
import { AlbumService } from './album.service';

@NgModule({
  declarations: [AlbumComponent],
  imports: [CommonModule, AlbumRoutingModule, CommonModule, FormsModule],
  providers: [HttpClient, AlbumService],
})
export class AlbumModule {}
