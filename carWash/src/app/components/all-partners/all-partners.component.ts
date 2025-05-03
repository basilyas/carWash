import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { AllPartnersService, Partner } from '../../services/all-partners.service';
import { PartnerExtraDetailsService } from '../../services/partner-extar-details.service';
import { PartnerPackagesService, PartnerPackage } from '../../services/partner-packages.service';
import { AddPartnerPackageService } from '../../services/add-partner-package.service';
import { RemovePartnerPackageService } from '../../services/remove-partner-package.service';

@Component({
  selector: 'app-all-partners',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-partners.component.html',
  styleUrls: ['./all-partners.component.css']
})
export class AllPartnersComponent implements OnInit {
  partners: Partner[] = [];
  isLoading = false;
  errorMessage = '';

  selectedPartnerDetails: any = null;
  selectedPartnerId: string | null = null;
  isDetailsLoading = false;
  detailsError = '';

  selectedPartnerPackages: PartnerPackage[] = [];
  partnerPackagesError = '';

  newPackage: any = {
    vat: '',
    country: 'USA',
    countryCode: 'US',
    city: 'New York',
    packageName: 'Starter Package',
    packageDescription: 'Basic entry package',
    currency: 'USD',
    duration: '30',
    numberOfServices: '5',
    active: true,
    extraDetails: {
      additionalProp1: 'info1',
      additionalProp2: 'info2',
      additionalProp3: 'info3'
    },
    priceDTO: {
      netPrice: 100,
      totalPrice: 120,
      price: 100,
      salePrice: 90,
      vat: 20,
      systemProfitPercentage: 10,
      salePercentage: 10,
    },
    questions: [
      { text: 'Do you agree to the terms?', expectedAnswer: 'Yes', type: 1, mandatory: true }
    ],
    regions: [ "Region1", "Region2" ] ,
    serviceProducts: [
      {
        name: 'Cleaning Service',
        description: 'Basic cleaning package',
        price: 50,
        productCode: 'CLEAN01',
        internalID: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',  // <-- valid UUID
        currency: 'USD',
        externalID: 'a987fbc9-4bed-3078-cf07-9141ba07c9f3',  // <-- valid UUID
        status: 'Publish',
        salePercentage: 10,
        systemProfitPercentage: 5,
        generalCosts: 5
      }
    ],
    stockProducts: [
      {
        name: 'Cleaning Kit',
        description: 'Tools and supplies',
        price: 20,
        productCode: 'KIT01',
        internalID: 'c9bf9e57-1685-4c89-bafb-ff5af830be8a',  // <-- valid UUID
        currency: 'USD',
        externalID: '9c858901-8a57-4791-81fe-4c455b099bc9',  // <-- valid UUID
        status: 'Publish',
        salePercentage: 5,
        systemProfitPercentage: 2,
        generalCosts: 3
      }
    ],
    regionDTOs: [
      {
        id:'',
        country: 'USA',
        countryCode: 'US',
        city: 'New York',
      }
    ]
  };
  submitMessage = '';

  editQuestionId: string | null = null;
  editedQuestion: any = {};

  constructor(
    private allPartnersService: AllPartnersService,
    private partnerExtraDetailsService: PartnerExtraDetailsService,
    private partnerPackagesService: PartnerPackagesService,
    private addPartnerPackageService: AddPartnerPackageService ,
    private removePartnerPackageService: RemovePartnerPackageService,
  ) {}

  ngOnInit(): void {
    this.fetchPartners();
  }

  fetchPartners(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.allPartnersService.getAllPartners().subscribe({
      next: (partners) => {
        this.partners = partners;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching partners:', error);
        this.errorMessage = 'Failed to load partners. Please try again.';
        this.isLoading = false;
      }
    });
  }

  viewPartnerDetails(partnerId: string): void {
    this.selectedPartnerDetails = null;
    this.selectedPartnerPackages = [];
    this.isDetailsLoading = true;
    this.detailsError = '';
    this.partnerPackagesError = '';
    this.selectedPartnerId = partnerId;

    this.partnerExtraDetailsService.getPartnerExtraDetails(partnerId).subscribe({
      next: (details) => {
        this.selectedPartnerDetails = details;
        this.isDetailsLoading = false;
      },
      error: (error) => {
        console.error('Error fetching extra details:', error);
        this.detailsError = 'Failed to load partner extra details.';
        this.isDetailsLoading = false;
      }
    });

    this.partnerPackagesService.getPartnerPackages(partnerId).subscribe({
      next: (packages) => {
        if (packages && packages.length > 0) {
          this.selectedPartnerPackages = packages;
        } else {
          this.partnerPackagesError = 'No packages available for this partner.';
        }
      },
      error: (error) => {
        console.error('Error fetching partner packages:', error);
        this.partnerPackagesError = 'Failed to load partner packages.';
      }
    });
  }

  closeDetails(): void {
    this.selectedPartnerDetails = null;
    this.selectedPartnerPackages = [];
    this.selectedPartnerId = null;
  }

  submitNewPackage(): void {
    if (!this.selectedPartnerId) {
      this.submitMessage = 'Partner ID is missing.';
      return;
    }

    this.addPartnerPackageService.addPartnerPackage(this.selectedPartnerId, this.newPackage).subscribe({
      next: (response) => {
        this.submitMessage = 'Package added successfully!';
        this.viewPartnerDetails(this.selectedPartnerId!); // Refresh packages
      },
      error: (error) => {
        console.error('Failed to add partner package:', error);
        this.submitMessage = 'Failed to add package. Please try again.';
      }
    });
  }

  removePackage(partnerId: string, packageId: string): void {
    if (!confirm('Are you sure you want to remove this package?')) return;

    this.removePartnerPackageService.removePackage(partnerId, packageId).subscribe({
      next: () => {
        // Refresh the list of packages after removal
        this.viewPartnerDetails(partnerId);
      },
      error: (error) => {
        console.error('Error removing package:', error);
        alert('Failed to remove package. Please try again.');
      }
    });
  }


}
