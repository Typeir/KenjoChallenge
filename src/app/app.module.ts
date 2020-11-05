import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import {
  DevToolsExtension,
  NgRedux,
  NgReduxModule,
} from '@angular-redux/store';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { AppState, INITIAL_STATE, rootReducer } from './store';

@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
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
