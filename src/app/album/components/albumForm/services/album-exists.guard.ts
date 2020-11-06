import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AppState } from '../../../../store';
import { AlbumEntity } from '../../../album';
import { AlbumService } from '../../../album.service';

@Injectable({
  providedIn: 'root',
})
export class AlbumExistsGuard implements CanActivate {
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const { albums } = this.ngRedux.getState();
    const id = route.paramMap.get('id');
    if (id) {
      try {
        const nextAlbum = (albums.find((e) => e._id === id) ||
          (id && (await this.albumService.select(id)))) as AlbumEntity;
        if (!nextAlbum) {
          throw new Error('no such album');
        }
      } catch {
        return false;
      }
      return true;
    }
  }

  constructor(
    private albumService: AlbumService,
    private ngRedux: NgRedux<AppState>,
    private router: Router
  ) {}
}
