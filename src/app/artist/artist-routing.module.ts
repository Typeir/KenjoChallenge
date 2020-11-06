import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from './artist.component';
import { ArtistFormComponent } from './components/artistForm/artist-form.component';
import { ArtistExistsGuard } from './components/services/artist-exists.guard';

const routes: Routes = [
  {
    path: '',
    component: ArtistComponent,
    children: [
      {
        path: 'new',
        component: ArtistFormComponent,
      },
      {
        path: ':id',
        component: ArtistFormComponent,
        canActivate: [ArtistExistsGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistRoutingModule {}
