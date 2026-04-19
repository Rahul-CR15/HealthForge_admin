import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { RippleModule } from 'primeng/ripple';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-manage-master-order',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    SelectModule,
    TextareaModule,
    RippleModule
  ],
  templateUrl: './manage-master-order.component.html',
  styleUrl: './manage-master-order.component.scss'
})
export class ManageMasterOrderComponent implements OnInit {
  category: any;

  masterOrderList: any[] = [];
  tempMasterOrderList: any[] = [];
  
  isAddNew: boolean = false;
  masterOrderForm!: FormGroup;

  getordertype1List = [
    { id: 1, name: 'Type A' },
    { id: 2, name: 'Type B' }
  ];
  getordertype2List = [
    { id: 1, name: 'Category X' },
    { id: 2, name: 'Category Y' }
  ];
  getordertype3List = [
    { id: 1, name: 'Sub Z' },
    { id: 2, name: 'Sub W' }
  ];

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.category = this.config.data?.category;

    this.masterOrderForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', [Validators.required]),
      orderCategoryId: new FormControl(0),
      orderType1Id: new FormControl(null),
      orderType2Id: new FormControl(null),
      orderType3Id: new FormControl(null),
      description: new FormControl('')
    });

    if (this.category) {
      this.loadDummyData(this.category.name);
    }
  }

  loadDummyData(categoryName: string) {
    this.tempMasterOrderList = [
      { id: 1, name: `${categoryName} Test 1`, orderType1Name: 'Type A', orderType2Name: 'Category X', orderType3Name: 'Sub Z' },
      { id: 2, name: `${categoryName} Test 2`, orderType1Name: 'Type B', orderType2Name: 'Category Y', orderType3Name: 'Sub W' }
    ];
    this.masterOrderList = [...this.tempMasterOrderList];
  }

  addNewItem() {
    this.isAddNew = true;
    this.masterOrderForm.reset({
      id: 0,
      orderCategoryId: this.category?.id
    });
  }

  searchMasterOrder(event: any) {
    const val = event.target.value?.trim().toLowerCase();
    if (!val) {
      this.masterOrderList = [...this.tempMasterOrderList];
    } else {
      this.masterOrderList = this.tempMasterOrderList.filter(x =>
        x.name?.toLowerCase().includes(val) ||
        x.orderType1Name?.toLowerCase().includes(val) ||
        x.orderType2Name?.toLowerCase().includes(val) ||
        x.orderType3Name?.toLowerCase().includes(val)
      );
    }
  }

  addMasterOrder() {
    if (this.masterOrderForm.invalid) return;
    
    const formVal = this.masterOrderForm.value;
    
    if (formVal.id === 0) {
      formVal.id = Math.floor(Math.random() * 1000);
      formVal.orderType1Name = this.getordertype1List.find(x => x.id === formVal.orderType1Id)?.name;
      formVal.orderType2Name = this.getordertype2List.find(x => x.id === formVal.orderType2Id)?.name;
      formVal.orderType3Name = this.getordertype3List.find(x => x.id === formVal.orderType3Id)?.name;
      
      this.tempMasterOrderList.push(formVal);
    } else {
      const idx = this.tempMasterOrderList.findIndex(x => x.id === formVal.id);
      if (idx !== -1) {
        formVal.orderType1Name = this.getordertype1List.find(x => x.id === formVal.orderType1Id)?.name || formVal.orderType1Name;
        formVal.orderType2Name = this.getordertype2List.find(x => x.id === formVal.orderType2Id)?.name || formVal.orderType2Name;
        formVal.orderType3Name = this.getordertype3List.find(x => x.id === formVal.orderType3Id)?.name || formVal.orderType3Name;
        this.tempMasterOrderList[idx] = formVal;
      }
    }
    
    this.masterOrderList = [...this.tempMasterOrderList];
    this.isAddNew = false;
  }

  editItem(item: any) {
    this.isAddNew = true;
    this.masterOrderForm.patchValue(item);
  }

  deleteItem(id: number) {
    this.tempMasterOrderList = this.tempMasterOrderList.filter(x => x.id !== id);
    this.masterOrderList = [...this.tempMasterOrderList];
  }

  resetItemForm() {
    this.masterOrderForm.reset();
    this.isAddNew = false;
  }

  closeModel() {
    this.ref.close();
  }
}

