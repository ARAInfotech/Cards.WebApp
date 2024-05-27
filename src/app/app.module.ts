import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BnNgIdleService } from 'bn-ng-idle';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './Interceptor/loading.interceptor';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { PopupComponent } from './popup/popup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgOtpInputModule } from  'ng-otp-input';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { NavComponent } from './admin/nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashComponent } from './admin/dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CardComponent } from './admin/card/card.component';
import { ProductSalesChartComponent } from './admin/charts/product-sales-chart/product-sales-chart.component';
import { AnnualSaleChartComponent } from './admin/charts/annual-sale-chart/annual-sale-chart.component';
import { SalesTrafficChartComponent } from './admin/charts/sales-traffic-chart/sales-traffic-chart.component';
import { StoreSessionChartComponent } from './admin/charts/store-session-chart/store-session-chart.component';
import { OrdersTableComponent } from './admin/tables/orders-table/orders-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MiniCardComponent } from './admin/mini-card/mini-card/mini-card.component';


const routes: Routes = [
   { path:'', component: LoginComponent},
   { path:'login', component: LoginComponent},
   { path: 'home', component: HomeComponent },
   { path:'signin', component: SigninComponent },
   { path:'forgotPassword', component: ForgotpasswordComponent },
   { path:'resetPassword/:id', component: ResetpasswordComponent },
   { path:'admin/home', component: AdmindashboardComponent },
  // { path:'holiday', component: HolidayComponent },
  // { path:'inventory', component: InventoryComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    HomeComponent,
    SigninComponent,
    PopupComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    AdmindashboardComponent,
    NavComponent,
    DashComponent,
    CardComponent,
    ProductSalesChartComponent,
    AnnualSaleChartComponent,
    SalesTrafficChartComponent,
    StoreSessionChartComponent,
    OrdersTableComponent,
    MiniCardComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    NgOtpInputModule,
    BaseChartDirective,
    FontAwesomeModule,    
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    RouterModule.forRoot(routes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
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
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables())
],
  bootstrap: [AppComponent]
})
export class AppModule { }
