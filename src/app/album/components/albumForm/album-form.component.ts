import { NgRedux } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeepPartial, Unsubscribe } from 'redux';
import { Subscription } from 'rxjs';
import { ArtistEntity } from 'src/app/artist/artist';
import { ArtistService } from 'src/app/artist/artist.service';
import { AppState } from 'src/app/store';
import { AlbumActions, ArtistActions } from '../../../actions';
import { AlbumEntity } from '../../album';
import { AlbumService } from '../../album.service';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.scss'],
})
export class AlbumFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private sub: Subscription;
  private albumSub: Unsubscribe;
  public artists: { text: string; value: string }[];
  public album: DeepPartial<AlbumEntity> = {};
  stringify = JSON.stringify;

  constructor(
    private albumService: AlbumService,
    private artistService: ArtistService,
    private ngRedux: NgRedux<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      title: new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.required,
      ]),
      genre: new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.required,
      ]),
      year: new FormControl('', [
        Validators.min(1909),
        Validators.max(2030),
        Validators.required,
      ]),
      coverUrl: '',
      artistId: new FormControl('', [Validators.required]),
    });
  }

  get title(): AbstractControl {
    return this.form.get('title');
  }
  get year(): AbstractControl {
    return this.form.get('year');
  }

  get coverUrl(): AbstractControl {
    return this.form.get('coverUrl').value;
  }

  set artistId(value) {
    this.form.setValue({ ...this.form.value, artistId: value });
  }

  get artistId(): string {
    return this.form.get('artistId').value;
  }

  async ngOnInit(): Promise<void> {
    const artists = (await this.artistService.select()) as DeepPartial<
      ArtistEntity
    >[];

    this.ngRedux.dispatch({
      type: ArtistActions.SET_ARTISTS,
      value: artists,
    });

    this.artists = artists.map((artist) => ({
      text: artist.name,
      value: artist._id,
    }));

    const { albums } = this.ngRedux.getState();

    this.sub = this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      if (id) {
        try {
          const nextAlbum = (albums.find((e) => e._id === id) ||
            (id && (await this.albumService.select(id)))) as AlbumEntity;
          this.album = { ...nextAlbum };
          const { year, genre, coverUrl, title, artistId = '' } = this.album;

          this.form.setValue({ year, genre, coverUrl, title, artistId });
          if (!nextAlbum) {
            throw new Error('no such album');
          }
        } catch (e) {
          this.router.navigate(['/albums']);
        }
      }
      this.albumTitleControl();
      this.albumSub = this.ngRedux.subscribe(() => this.albumTitleControl());
    });
  }

  albumTitleControl(): void {
    const { albums: storeAlbums } = this.ngRedux.getState();

    const filteredAlbums = storeAlbums.filter((e) => {
      return e._id !== this.album._id;
    });

    console.log(filteredAlbums, this.album._id);

    this.form.setControl(
      'title',
      new FormControl(this.album.title, [
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.required,
        NoEqualFieldsValidator(filteredAlbums, ['title']),
      ])
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  save(): void {
    const value = { ...this.album, ...this.form.value };
    if (this.album._id) {
      this.albumService.update(this.album._id, value).then((e) => {
        const { albums } = this.ngRedux.getState();
        albums.splice(
          albums.findIndex((e) => e._id === this.album._id),
          1,
          e as AlbumEntity
        );
        this.ngRedux.dispatch({
          type: AlbumActions.SET_ALBUMS,
          value: albums,
        });
        this.goBack();
      });
    } else {
      this.albumService.create([value]).then((e) => {
        const { albums } = this.ngRedux.getState();
        this.ngRedux.dispatch({
          type: AlbumActions.SET_ALBUMS,
          value: [...albums, e],
        });
        this.goBack();
      });
    }
  }

  delete(): void {
    this.albumService.delete(this.album._id).then((e) => {
      const { albums } = this.ngRedux.getState();
      albums.splice(
        albums.findIndex((e) => e._id === this.album._id),
        1
      );
      this.ngRedux.dispatch({
        type: AlbumActions.SET_ALBUMS,
        value: albums,
      });
      this.goBack();
    });
  }

  goBack(): void {
    this.router.navigate(['/albums']);
  }
}

const NoEqualFieldsValidator = (data: any[], fields: string[]) =>
  ((control: AbstractControl): { [key: string]: any } => {
    const error = data.find((e) => {
      return fields.some((f) => {
        return e[f] === control.value;
      });
    });

    return error ? { repeat: true } : null;
  }) as ValidatorFn;
