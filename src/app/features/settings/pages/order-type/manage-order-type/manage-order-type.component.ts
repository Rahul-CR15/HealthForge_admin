import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-manage-order-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, SelectModule],
  templateUrl: './manage-order-type.component.html'
})
export class ManageOrderTypeComponent implements OnInit {
  itemForm!: FormGroup;
  orderCategoryList: any[] = [
    { id: 1, name: 'Laboratory' },
    { id: 2, name: 'Imaging' },
    { id: 3, name: 'Procedure' },
    { id: 4, name: 'Medication' },
    { id: 5, name: 'Vaccination' },
    { id: 6, name: 'Consultation' },
    { id: 7, name: 'Nursing' },
    { id: 8, name: 'Physiotherapy' }
  ];

  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    public itemConfig: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.itemForm = this.fb.group({
      id: new FormControl(0),
      name: new FormControl(null, [Validators.required]),
      orderCategoryId: new FormControl(null, [Validators.required]),
      status: new FormControl(1),
      insertUser: new FormControl(0),
      insertDate: new FormControl(null)
    });

    if (this.itemConfig?.data?.orderType == 2) {
      this.itemForm.addControl('code', new FormControl(''));
      this.itemForm.addControl('cptCode', new FormControl(''));
    }

    if (this.itemConfig?.data?.item?.id > 0) {
      this.itemForm.patchValue(this.itemConfig.data.item);
    }
  }

  submiteItem(Id?: number) {
    if (this.itemForm.invalid) {
      return;
    }

    const formValue = this.itemForm.value;
    this.closeModel(true, formValue);
  }

  closeModel(isRefresh = false, obj?: any) {
    this.ref.close({ isRefresh, obj });
  }
}
