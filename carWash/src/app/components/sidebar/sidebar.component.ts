import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AllPartnersComponent } from '../all-partners/all-partners.component';
import { SystemStatisticsComponent } from '../system-statistics/system-statistics.component';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule,AllPartnersComponent,SystemStatisticsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
