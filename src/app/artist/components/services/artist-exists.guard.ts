import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AppState } from '../../../store';
import { ArtistEntity } from '../../artist';
import { ArtistService } from '../../artist.service';

@Injectable({
  providedIn: 'root',
})
export class ArtistExistsGuard implements CanActivate {
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const { artists } = this.ngRedux.getState();
    const id = route.paramMap.get('id');
    if (id) {
      try {
        const nextArtist = (artists.find((e) => e._id === id) ||
          (id && (await this.artistService.select(id)))) as ArtistEntity;
        if (!nextArtist) {
          throw new Error('no such artist');
        }
      } catch (e) {
        return false;
      }
      return true;
    }
  }

  constructor(
    private artistService: ArtistService,
    private ngRedux: NgRedux<AppState>,
    private router: Router
  ) {}
}
