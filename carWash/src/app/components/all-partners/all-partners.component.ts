import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AllPartnersService, Partner } from '../../services/all-partners.service';
import { PartnerExtraDetailsService } from '../../services/partner-extar-details.service';
import { PartnerPackagesService, PartnerPackage } from '../../services/partner-packages.service';
import { AddPartnerPackageService } from '../../services/add-partner-package.service';

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

  // Updated new package model to include region, extraDetails, and serviceProducts
  newPackage = {
    packageName: '',
    vat: 0,
    country: '',
    countryCode: '',
    city: '',
    currency: '',
    region:'',
    regionDTOs: [
      {
        countryCode: '', // Add countryCode here
        country: '',      // Add country here
        city: ''          // Add city here
      }
    ],
    extraDetails: {
      additionalProp1: '',
      additionalProp2: '',
      additionalProp3: ''
    },
    serviceProducts: [
      {
        id: '',
        productCode: '',
        internalID: '',
        name: '',
        description: '',
        price: 0,
        currency: '',
        externalID: '',
        status: 'Publish',
        salePercentage: 0,
        systemProfitPercentage: 0,
        generalCosts: 0
      }
    ],
    stockProducts: [
      {
        id: '',
        productCode: '',
        internalID: '',
        name: '',
        description: '',
        price: 0,
        currency: '',
        externalID: '',
        status: 'Publish',
        salePercentage: 0,
        systemProfitPercentage: 0,
        generalCosts: 0
      }
    ],
    questions: [
      {
        id: '',
        text: '',
        type: 0,
        expectedAnswer: '',
        mandatory: true
      }
    ],
    priceDTO: {
      netPrice: 0,
      totalPrice: 0,
      price: 0,
      salePrice: 0,
      vat: 0,
      systemProfitPercentage: 0,
      salePercentage: 0
    },
    active: true
  };

  constructor(
    private allPartnersService: AllPartnersService,
    private partnerExtraDetailsService: PartnerExtraDetailsService,
    private partnerPackagesService: PartnerPackagesService,
    private addPartnerPackageService: AddPartnerPackageService
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

    // Fetch extra details
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

    // Fetch partner packages
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

  submitNewPackage(): void {
    if (!this.selectedPartnerId) {
      console.error('No partner selected.');
      return;
    }

    const packageData = {
      id: '', // Optional: consider generating an ID or ensuring this field matches the backend expectation
      vat: this.newPackage.vat.toString(),
      country: this.newPackage.country,
      countryCode: this.newPackage.countryCode,
      city: this.newPackage.city,
      region:this.newPackage.region,
      packageName: this.newPackage.packageName,
      currency: this.newPackage.currency,
      extraDetails: this.newPackage.extraDetails,
      serviceProducts: this.newPackage.serviceProducts,
      stockProducts: this.newPackage.stockProducts,
      questions: this.newPackage.questions,
      regionDTOs: this.newPackage.regionDTOs,
      priceDTO: this.newPackage.priceDTO,
      active: true
    };

    this.addPartnerPackageService.addPartnerPackage(this.selectedPartnerId, packageData).subscribe({
      next: (response) => {
        console.log('Package added successfully:', response);
        this.viewPartnerDetails(this.selectedPartnerId!);
        this.resetNewPackageForm();
      },
      error: (error) => {
        console.error('Error adding partner package:', error);
      }
    });
  }

  resetNewPackageForm(): void {
    this.newPackage = {
      packageName: '',
      vat: 0,
      country: '',
      countryCode: '',
      city: '',
      region:'',
      currency: '',
      regionDTOs: [],
      extraDetails: {
        additionalProp1: '',
        additionalProp2: '',
        additionalProp3: ''
      },
      serviceProducts: [
        {
          id: '',
          productCode: '',
          internalID: '',
          name: '',
          description: '',
          price: 0,
          currency: '',
          externalID: '',
          status: 'Publish',
          salePercentage: 0,
          systemProfitPercentage: 0,
          generalCosts: 0
        }
      ],
      stockProducts: [
        {
          id: '',
          productCode: '',
          internalID: '',
          name: '',
          description: '',
          price: 0,
          currency: '',
          externalID: '',
          status: 'Publish',
          salePercentage: 0,
          systemProfitPercentage: 0,
          generalCosts: 0
        }
      ],
      questions: [
        {
          id: '',
          text: '',
          type: 0,
          expectedAnswer: '',
          mandatory: true
        }
      ],
      priceDTO: {
        netPrice: 0,
        totalPrice: 0,
        price: 0,
        salePrice: 0,
        vat: 0,
        systemProfitPercentage: 0,
        salePercentage: 0
      },
      active: true
    };
  }

  closeDetails(): void {
    this.selectedPartnerDetails = null;
    this.selectedPartnerPackages = [];
    this.selectedPartnerId = null;
  }
}
