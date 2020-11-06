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
import * as moment from 'moment';
import { DeepPartial } from 'redux';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store';
import { ArtistActions } from '../../../actions';
import { ArtistEntity } from '../../artist';
import { ArtistService } from '../../artist.service';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss'],
})
export class ArtistFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private sub: Subscription;
  public artist: DeepPartial<ArtistEntity> = {};
  stringify = JSON.stringify;

  constructor(
    private artistService: ArtistService,
    private ngRedux: NgRedux<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.required,
      ]),
      birthdate: new FormControl('', [
        Validators.required,
        dateValidators.min('1909/01/01'),
        dateValidators.max('2030/01/01'),
      ]),
      deathDate: new FormControl('', [
        Validators.required,
        dateValidators.min('1909/01/01'),
        dateValidators.max('2030/01/01'),
      ]),
      photoUrl: '',
    });
  }

  get photoUrl(): any {
    return this.form.get('photoUrl').value;
  }

  get deathDate(): AbstractControl {
    return this.form.get('deathDate');
  }

  get birthdate(): AbstractControl {
    return this.form.get('birthdate');
  }

  ngOnInit(): void {
    const { artists } = this.ngRedux.getState();
    this.sub = this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      if (id) {
        try {
          const nextArtist = (artists.find((e) => e._id === id) ||
            (await this.artistService.select(id))) as ArtistEntity;
          this.artist = { ...nextArtist };
          const { deathDate, birthdate, photoUrl, name } = this.artist;
          this.form.setValue({
            deathDate: moment(deathDate).format('YYYY-DD-MM'),
            birthdate: moment(birthdate).format('YYYY-DD-MM'),
            photoUrl,
            name,
          });
          if (!nextArtist) {
            throw new Error('no such artist');
          }
        } catch (e) {
          this.router.navigate(['/artists']);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  save(): void {
    const value = { ...this.artist, ...this.form.value };
    if (this.artist._id) {
      this.artistService.update(this.artist._id, value).then((e) => {
        const { artists } = this.ngRedux.getState();
        artists.splice(
          artists.findIndex((e) => e._id === this.artist._id),
          1,
          e as ArtistEntity
        );
        this.ngRedux.dispatch({
          type: ArtistActions.SET_ARTISTS,
          value: artists,
        });
        this.goBack();
      });
    } else {
      this.artistService.create([value]).then((e) => {
        const { artists } = this.ngRedux.getState();
        this.ngRedux.dispatch({
          type: ArtistActions.SET_ARTISTS,
          value: [...artists, value],
        });
        this.goBack();
      });
    }
  }

  delete(): void {
    this.artistService.delete(this.artist._id).then((e) => {
      const { artists } = this.ngRedux.getState();
      artists.splice(
        artists.findIndex((e) => e._id === this.artist._id),
        1
      );
      this.ngRedux.dispatch({
        type: ArtistActions.SET_ARTISTS,
        value: artists,
      });
      this.goBack();
    });
  }

  goBack(): void {
    this.router.navigate(['/artists']);
  }
}

const dateValidators = {
  min: (date: string | Date | undefined) =>
    ((control: AbstractControl): { [key: string]: any } => {
      const error = !moment(control.value).isSameOrAfter(moment(date));
      return error ? { minDate: true } : null;
    }) as ValidatorFn,
  max: (date: string | Date | undefined) =>
    ((control: AbstractControl): { [key: string]: any } => {
      const error = !moment(control.value).isSameOrBefore(moment(date));
      return error ? { minDate: true } : null;
    }) as ValidatorFn,
};
