import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'albums',
    loadChildren: () =>
      import(`./album/album.module`).then((m) => m.AlbumModule),
  },
  {
    path: 'artists',
    loadChildren: () =>
      import(`./artist/artist.module`).then((m) => m.ArtistModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
