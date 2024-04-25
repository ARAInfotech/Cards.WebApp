import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BnNgIdleService } from 'bn-ng-idle';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './Interceptor/loading.interceptor';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

const routes: Routes = [
   { path:'', component: LoginComponent},
   { path:'login', component: LoginComponent},
  // { path: 'home', component: HomeComponent },
  // { path:'signin', component: SigninComponent },
  // { path:'seatbook', component: BookSeatComponent },
  // { path:'admin', component: AdminDashboardComponent },
  // { path:'holiday', component: HolidayComponent },
  // { path:'inventory', component: InventoryComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BnNgIdleService, 
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
