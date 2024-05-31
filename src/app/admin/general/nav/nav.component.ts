import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from '../../../../environments/environments';
import { Constants } from '../../../common/constant';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  active:number = 0;
  companyName:string = environment.companyName; 
  menuItems = ['Dashboard', 'Products', 'Orders', 'Customers', 'Sales', 'Statistics', 'Reviews', 'Transactions', 'Sellers', 'Hot Offers' ];

  selectedMenu:number=1;
  constant = new Constants();

  private breakpointObserver = inject(BreakpointObserver);  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    menuItemClick(itemName:any, index:number){debugger

      this.active = index;

      switch(itemName){
        case 'Dashboard':{
          this.selectedMenu = this.constant.SideMenu.DashBoard;
          break;
        }
        case 'Products':{
          this.selectedMenu = this.constant.SideMenu.Products;
          break;
        }
        case 'Orders':{
          this.selectedMenu = this.constant.SideMenu.Orders;
          break;
        }
        case 'Customers':{
          this.selectedMenu = this.constant.SideMenu.Customers;
          break;
        }
        case 'Sales':{
          this.selectedMenu = this.constant.SideMenu.Sales;
          break;
        }
        case 'Statistics':{
          this.selectedMenu = this.constant.SideMenu.Statistics;
          break;
        }
        case 'Reviews':{
          this.selectedMenu = this.constant.SideMenu.Reviews;
          break;
        }
        case 'Transactions':{
          this.selectedMenu = this.constant.SideMenu.Transactions;
          break;
        }
        case 'Sellers':{
          this.selectedMenu = this.constant.SideMenu.Sellers;
          break;
        }
        case 'Hot Offers':{
          this.selectedMenu = this.constant.SideMenu.Hot_Offers;
          break;
        }
        default:{
          this.selectedMenu = this.constant.SideMenu.DashBoard;
          break;
        }
      }
    }
}
