import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album.component';
import { AlbumFormComponent } from './components/albumForm/album-form.component';
import { AlbumExistsGuard } from './components/albumForm/services/album-exists.guard';

const routes: Routes = [
  {
    path: '',
    component: AlbumComponent,
    children: [
      {
        path: 'new',
        component: AlbumFormComponent,
      },
      {
        path: ':id',
        component: AlbumFormComponent,
        canActivate: [AlbumExistsGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumRoutingModule {}
