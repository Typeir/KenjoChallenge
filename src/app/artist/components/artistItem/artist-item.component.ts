import { NgRedux } from '@angular-redux/store';
import { Component, Input, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { Artist } from '../../artist';
import { ArtistService } from '../../artist.service';

@Component({
  selector: 'app-artist-item',
  templateUrl: './artist-item.component.html',
  styleUrls: ['./artist-item.component.scss'],
})
export class ArtistItemComponent implements OnInit {
  @Input() public artist: Artist;
  @Input() public index?: number;

  constructor(
    private artists: ArtistService,
    private ngRedux: NgRedux<AppState>
  ) {}

  ngOnInit(): void {}

  stopPropagation($event: MouseEvent): void {
    $event.stopPropagation();
  }
}
