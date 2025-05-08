import { Component, OnInit } from '@angular/core';
import { Partner,
  PartnerExtraDetails,
  PartnerPackage,
  RegionDTO,
  ServiceRegionResponse,
  PartnersService } from '../../services/partners.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  partners: Partner[] = [];
  isLoading = true;
  errorMessage = '';

  detailsMap: { [partnerId: string]: PartnerExtraDetails } = {};
  packagesMap: { [id: string]: PartnerPackage[] } = {};
  showProductsMap: { [pkgId: string]: boolean } = {};
  showQuestionsMap: { [pkgId: string]: boolean } = {};
  actionMessage: string = ''; // to show approve/suspend feedback

  packageForm: FormGroup;
  regions: RegionDTO[] = [];
  servicesRegions: ServiceRegionResponse[] = [];
  selectedPartnerId: string | null = null;

  constructor(private partnersService: PartnersService,private fb: FormBuilder
  ) {
    this.packageForm = this.fb.group({
      countryCode: [''],
      city: [''],
      vat: [''],
      packageName: [''],
      currency: [''],
      extraDetails: this.fb.group({
        additionalProp1: [''],
        additionalProp2: [''],
        additionalProp3: ['']
      }),
      serviceProducts: [[]],
      stockProducts: [[]],
      questions: [[]]
    });
   }

  ngOnInit(): void {
    this.fetchPartners();
  }

  fetchPartners() {
    this.isLoading = true;
    this.partnersService.getAllPartners().subscribe({
      next: data => {
        this.partners = data;
        this.isLoading = false;
      },
      error: err => {
        this.errorMessage = 'Failed to load partners';
        this.isLoading = false;
        console.error('Error fetching partners:', err);
      }
    });
  }

  togglePartnerStatus(p: Partner) {
    if (!p.isApproved) {
      // Approve
      this.partnersService.approveUser(p.id, true).subscribe({
        next: msg => {
          p.isApproved = true;
          this.actionMessage = `Partner ${p.name} approved.`;
          setTimeout(() => this.actionMessage = '', 3000);
        },
        error: e => this.handleActionError('approve', p.name)
      });
    } else if (!p.isSuspended) {
      // Suspend
      this.partnersService.suspendUser(p.id, true).subscribe({
        next: msg => {
          p.isSuspended = true;
          this.actionMessage = `Partner ${p.name} suspended.`;
          setTimeout(() => this.actionMessage = '', 3000);
        },
        error: e => this.handleActionError('suspend', p.name)
      });
    } else {
      // Unsuspend
      this.partnersService.suspendUser(p.id, false).subscribe({
        next: msg => {
          p.isSuspended = false;
          this.actionMessage = `Partner ${p.name} unsuspended.`;
          setTimeout(() => this.actionMessage = '', 3000);
        },
        error: e => this.handleActionError('unsuspend', p.name)
      });
    }
  }

  private handleActionError(action: string, name: string) {
    console.error(`${action} error for ${name}`);
    this.actionMessage = `Failed to ${action} partner ${name}.`;
    setTimeout(() => this.actionMessage = '', 3000);
  }


  toggleExtraDetails(p: Partner) {
    if (this.detailsMap[p.id]) {
      delete this.detailsMap[p.id];
      return;
    }
    this.partnersService.getPartnerExtraDetails(p.id).subscribe({
      next: details => this.detailsMap[p.id] = details,
      error: err => console.error(`Error loading details for ${p.id}:`, err)
    });
  }

  togglePackages(p: Partner) {
    if (this.packagesMap[p.id]) {
      delete this.packagesMap[p.id];
      return;
    }
    this.partnersService.getPartnerPackages(p.id).subscribe({
      next: pkgs => this.packagesMap[p.id] = pkgs,
      error: e => console.error(`Error loading packages for ${p.id}:`, e)
    });
  }

  toggleProducts(pkgId: string) {
    this.showProductsMap[pkgId] = !this.showProductsMap[pkgId];
  }

  toggleQuestions(pkgId: string) {
    this.showQuestionsMap[pkgId] = !this.showQuestionsMap[pkgId];
  }
// Show add package form
startAddPackage(partnerId: string) {
  this.selectedPartnerId = partnerId;
  this.regions = [];
  this.servicesRegions = [];
  this.packageForm.reset();
}

// Load regions when country changes
onCountryChange() {
  const code = this.packageForm.value.countryCode;
  if (code) {
    this.partnersService.getRegions(code).subscribe(res => this.regions = res);
  }
}

// Load services/products for selected regions
loadServices() {
  this.partnersService.getServicesByRegions(this.regions).subscribe(res => {
    this.servicesRegions = res;
  });
}

// Submit new package (FIXED country assignment and default arrays)
addPackage() {
  if (!this.selectedPartnerId) return;

  const code = this.packageForm.value.countryCode;
  const region = this.regions.find(r => r.countryCode === code);

  const pkg: PartnerPackage = {
    id: '',
    vat: this.packageForm.value.vat,
    country: region?.country || '',
    countryCode: code,
    city: this.packageForm.value.city,
    packageName: this.packageForm.value.packageName,
    currency: this.packageForm.value.currency,
    extraDetails: this.packageForm.value.extraDetails,
    serviceProducts: this.packageForm.value.serviceProducts || [],
    stockProducts: this.packageForm.value.stockProducts || [],
    questions: this.packageForm.value.questions || [],
    regionDTOs: this.regions,
    priceDTO: { netPrice:0, totalPrice:0, price:0, salePrice:0, vat:0, systemProfitPercentage:0, salePercentage:0 },
    active: true
  };

  this.partnersService.addPartnerPackage(this.selectedPartnerId, pkg)
    .subscribe({
      next: msg => {
        this.actionMessage = 'Package added successfully.';
        setTimeout(() => this.actionMessage = '', 3000);
        this.selectedPartnerId = null;
      },
      error: err => {
        console.error('Add package error:', err);
        this.actionMessage = 'Failed to add package.';
        setTimeout(() => this.actionMessage = '', 3000);
      }
    });
}
}

