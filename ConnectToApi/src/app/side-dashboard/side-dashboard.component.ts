import { Component , OnDestroy , inject, signal } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MediaMatcher} from '@angular/cdk/layout';
import { LineComponent } from "./line/line.component";
import { FinanceComponent } from "./finance/finance.component";
import { PieComponent } from "./pie/pie.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';




@Component({
  selector: 'app-side-dashboard',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, LineComponent, FinanceComponent, PieComponent ],
  templateUrl: './side-dashboard.component.html',
  styleUrl: './side-dashboard.component.css'
})
export class SideDashboardComponent {

  protected readonly fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  
  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;

  constructor(public router:Router) {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
  }

}
