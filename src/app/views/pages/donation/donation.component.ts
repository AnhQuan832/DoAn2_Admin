import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DonationService } from 'src/app/services/donation.service';
import { FundCardComponent } from '../fund-card/fund-card.component';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss'],
  providers: [DialogService, MessageService]

})
export class DonationComponent {

}
