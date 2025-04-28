// src/app/pages/all-customers/all-customers.component.ts
import { Component, OnInit } from '@angular/core';
import { AllCustomersService, Customer } from '../../services/all-customers.service';
import { SuspendUserService } from '../../services/suspend-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-customers.component.html',
  styleUrl: './all-customers.component.css'
})
export class AllCustomersComponent implements OnInit {
  customers: Customer[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private allCustomersService: AllCustomersService,
    private suspendUserService: SuspendUserService
  ) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.allCustomersService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load customers. Please try again.';
        this.isLoading = false;
      }
    });
  }

  toggleSuspend(customer: Customer): void {
    const newStatus = !customer.isSuspended;
    this.suspendUserService.suspendUser(customer.id, newStatus).subscribe({
      next: (response) => {
        customer.isSuspended = newStatus;
        this.successMessage = `Customer ${customer.displayName || customer.name} has been ${newStatus ? 'suspended' : 'unsuspended'}.`;
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error('Error suspending customer:', error);
        this.errorMessage = 'Failed to update suspension status.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }

}
