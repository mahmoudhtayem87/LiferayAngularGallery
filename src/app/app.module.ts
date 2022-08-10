import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from "@angular/elements";
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery'



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PhotoGalleryModule.forRoot({ defaultOptions: { showHideOpacity: true } }),
    HttpClientModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: "/"}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const appElement = createCustomElement(AppComponent, {
      injector: this.injector
    });
    customElements.define("lr-ng-gallery", appElement);
  }
}
