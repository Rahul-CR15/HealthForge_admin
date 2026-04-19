import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-manage-facility',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    ToggleSwitchModule,
    SelectModule,
    CheckboxModule,
    RippleModule
  ],
  templateUrl: './manage-facility.component.html',
  styleUrls: ['./manage-facility.component.scss']
})
export class ManageFacilityComponent implements OnInit {
  itemForm!: FormGroup;
  isLabCompanyLoading = false;
  isCompanyLoading = false;

  labCompanyList = [
    { id: 1, name: 'Global Lab Services' },
    { id: 2, name: 'Prime Diagnostics' },
    { id: 3, name: 'ClearHealth Labs' }
  ];

  companyList = [
    { companyId: 1, name: 'HealthCorp' },
    { companyId: 2, name: 'CareBridge' },
    { companyId: 3, name: 'Medix Group' }
  ];

  locationList = [
    { locationId: 1, name: 'Downtown Campus' },
    { locationId: 2, name: 'Riverfront Center' },
    { locationId: 3, name: 'Westside Facility' }
  ];

  facilityTypeList = [
    { id: 1, name: 'Laboratory' },
    { id: 2, name: 'Radiology' },
    { id: 3, name: 'Pharmacy' },
    { id: 4, name: 'Therapy Center' }
  ];

  constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef, private fb: FormBuilder) {}

  ngOnInit() {
    this.itemForm = this.fb.group({
      id: [0],
      isGlobal: [false],
      labCompanyId: [null],
      labLocationId: [null],
      companyId: [null],
      locationId: [null],
      name: ['', Validators.required],
      primaryContactName: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      email: ['', Validators.email],
      phone: [''],
      city: [''],
      state: [''],
      country: [''],
      zip: [''],
      fax: [''],
      facilityTypeIdList: this.fb.array(this.facilityTypeList.map(() => false))
    });

    if (this.config.data?.item) {
      this.patchItem(this.config.data.item);
    }
  }

  get facilityTypeControls() {
    return (this.itemForm.get('facilityTypeIdList') as FormArray).controls;
  }

  onChangeGlobal(event: any) {
    const isGlobal = event.checked;
    if (isGlobal) {
      this.itemForm.patchValue({ companyId: null, locationId: null });
    } else {
      this.itemForm.patchValue({ labCompanyId: null, labLocationId: null });
    }
  }

  closeModel() {
    this.ref.close();
  }

  submitItem() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    this.ref.close({
      isRefresh: true,
      item: this.itemForm.value
    });
  }

  private patchItem(item: any) {
    const checkedTypes = this.facilityTypeList.map(type => item.facilityTypeIds?.includes(type.id) || false);
    this.itemForm.patchValue({
      id: item.id ?? 0,
      isGlobal: !!item.labCompanyId,
      labCompanyId: item.labCompanyId ?? null,
      labLocationId: item.labLocationId ?? null,
      companyId: item.companyId ?? null,
      locationId: item.locationId ?? null,
      name: item.name ?? '',
      primaryContactName: item.primaryContactName ?? '',
      address1: item.address1 ?? '',
      address2: item.address2 ?? '',
      email: item.email ?? '',
      phone: item.phone ?? '',
      city: item.city ?? '',
      state: item.state ?? '',
      country: item.country ?? '',
      zip: item.zip ?? '',
      fax: item.fax ?? ''
    });
    this.facilityTypeControls.forEach((control, index) => control.setValue(checkedTypes[index]));
  }
}
