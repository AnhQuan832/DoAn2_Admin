import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUploadService } from '../../../services/file-upload.service'
import { DonationService } from 'src/app/services/donation.service';
import { MessageService } from 'primeng/api';
import { DonationComponent } from '../donation/donation.component';
@Component({
  selector: 'app-fund-card',
  templateUrl: './fund-card.component.html',
  styleUrls: ['./fund-card.component.scss']
})
export class FundCardComponent implements OnInit {
  protected fundTransactionsList: any;
  avatarFile: any;
  isWrongInput: boolean = true;
  selectedFundType: any;
  isLoading: boolean = false;
  listFundTypes = [
    {
      id: 'FOOD', value: 'Thực phẩm'
    },
    {
      id: 'MEDICAL', value: 'Y tế'
    },
    {
      id: 'ENTERTAINMENT', value: 'Giải trí'
    },
    {
      id: 'FACILITY', value: 'Cơ sở vật chất'
    },
    {
      id: 'MULTI_PURPOSE', value: 'Nhiều mục đích'
    }
  ]
  constructor(private builder: FormBuilder,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private fileUpload: FileUploadService,
    private donationService: DonationService,
    private messageService: MessageService,
    private DonationComponent: DonationComponent,
  ) {

  }
  ngOnInit(): void {
    this.getFundTransactions()

  }

  public async getFundTransactions() {

  }

  getSeverity(status: string) {
    switch (status) {
      case 'USER_TO_FUND':
        return 'success';
      default:
        return 'danger';
    }
  }

  addNewFund() {

  }

  updateFund() {

  }

  deleteFund() {

  }

  async selectedAvatar(event) {

  }
}
