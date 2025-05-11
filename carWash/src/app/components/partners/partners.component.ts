import { Component, OnInit } from '@angular/core';
import { Partner,
  PartnerExtraDetails,
  PartnerPackage,
  PartnersService } from '../../services/partners.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
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
  showAddPackageFormMap: { [partnerId: string]: boolean } = {};

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
    // regions: [ "Region1", "Region2" ] ,
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
        // id:'',
        country: 'USA',
        countryCode: 'US',
        city: 'New York',
      }
    ]
  };
  submitMessage = '';


  constructor(private partnersService: PartnersService,private fb: FormBuilder
  ) {

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
  toggleAddPackageForm(partnerId: string) {
  this.showAddPackageFormMap[partnerId] = !this.showAddPackageFormMap[partnerId];
}


submitNewPackage(p:Partner): void {
  if (!p.id) {
    this.submitMessage = 'Partner ID is missing.';
    return;
  }

  this.partnersService.addPartnerPackage(p.id, this.newPackage).subscribe({
    next: (response) => {
      this.submitMessage = 'Package added successfully!';
      this.fetchPartners();
    },
    error: (error) => {
      console.error('Failed to add partner package:', error);
      this.submitMessage = 'Failed to add package. Please try again.';
    }
  });
}
removePackage(partnerId: string, packageId: string): void {
  if (confirm('Are you sure you want to remove this package?')) {
    this.partnersService.removePartnerPackage(partnerId, packageId).subscribe({
      next: () => {
        // Remove the package from the local array
        this.packagesMap[partnerId] = this.packagesMap[partnerId].filter(pkg => pkg.id !== packageId);
        alert('Package removed successfully.');
      },
      error: (error: any) => {
        console.error('Error removing package:', error);
        alert('Failed to remove the package.');
      }
    });
  }
}
editingQuestionIdMap: { [packageId: string]: string } = {};

toggleEdit(packageId: string | undefined, questionId: string | undefined) {
  if (!packageId || !questionId) return;
  this.editingQuestionIdMap[packageId] = questionId;
}


cancelEdit(packageId: string) {
  delete this.editingQuestionIdMap[packageId];
}

submitUpdate(packageId: string, p: Partner, question: any) {
  const updatedQuestion = {
    id: question.id,
    text: question.text,
    type: question.type,
    expectedAnswer: question.expectedAnswer,
    mandatory: question.mandatory
  };

  this.partnersService.updatePackageQuestions(p.id, packageId, [updatedQuestion])
    .subscribe({
      next: (res) => {
        console.log('Update successful:', res);
        this.cancelEdit(packageId);
      },
      error: (err) => {
        console.error('Update failed:', err);
      }
    });
}


}


