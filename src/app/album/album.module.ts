import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album.component';
import { AlbumService } from './album.service';
import { AlbumFormComponent } from './components/albumForm/album-form.component';
import { AlbumItemComponent } from './components/albumItem/album-item.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';

@NgModule({
  declarations: [
    AlbumComponent,
    AlbumFormComponent,
    AlbumItemComponent,
    DropdownComponent,
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
  ],
  providers: [HttpClient, AlbumService],
})
export class AlbumModule {}
