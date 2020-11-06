import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import {
  DevToolsExtension,
  NgRedux,
  NgReduxModule,
} from '@angular-redux/store';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistService } from './artist/artist.service';
import { MenuComponent } from './shared/components/menu/menu.component';
import { AppState, INITIAL_STATE, rootReducer } from './store';

@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    HttpClientModule,
  ],
  providers: [ArtistService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<AppState>,
    ngReduxRouter: NgReduxRouter,
    devTools: DevToolsExtension
  ) {
    const storeEnhancers = devTools.isEnabled() ? [devTools.enhancer()] : [];

    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], storeEnhancers);

    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }
  }
}
