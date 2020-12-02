import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ListState } from '../store/list/list.effect';
import { SearchResultComponent } from './search-result/search-result.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultComponent,
    SpinnerComponent,
    HomeComponent,
  ],
  imports: [
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatRadioModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([
      ListState
    ]),
    FlexLayoutModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    HttpClientXsrfModule.withOptions({
      cookieName: 'eWZDZMdPVDfRJBvjWx6zScAnFwS87gxUxqGm5WzvXQeq4cBpDKggP225TE9X22',
      headerName: 'X-XSRF-TOKEN'
    }),
    ScullyLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
