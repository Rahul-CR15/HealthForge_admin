import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClassicEditor } from 'ckeditor5';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { OrderListModule } from 'primeng/orderlist';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TextareaModule } from 'primeng/textarea';
import { configEditor } from 'src/app/shared/constants/api.constant';
enum AgeUnit {
  Days = 1,
  Months = 2,
  Years = 3
}
enum eGender {
  Male = 1,
  Female = 2
}
enum ComponentType {
  ResultRange = 3,
  DescriptiveNoRanges = 2,
  AgeResultRange = 4,
  Formula = 5,
  Notes = 6
}

export interface ComponentResultRange {
  guid?: string;
  isDefault?: any;
  description: any;
  resultRangeId: number;
  index?: number;
  rangeName: string;
  resultRangeTypeId: number;
  min: number;
  max: number;
  gender: number;
  isBold: boolean;
  isUnderLine: boolean;
  colour: string;
  unitId: number;
  minAge: number;
  maxAge: number;
  isConfirmationText: boolean;
}

export interface ReportComponent {
  guid?: string;
  isNew?: boolean;
  componentId: number;
  companyId?: number;
  componentTypeId: number;
  componentName: string;
  description: string;
  sequenceNo: number;
  unitId: number;
  method: string;
  componentType?: string;
  integrationCode: string;
  unit?: string;
  isGenderSpecific?: boolean;
  isAgeSpecific?: boolean;
  formula?: string;
  componentResultRanges: ComponentResultRange[];
}

@Component({
  selector: 'app-report-parameter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    CardModule,
    SelectModule,
    InputTextModule,
    OrderListModule,
    CheckboxModule,
    RadioButtonModule,
    ColorPickerModule,
    DividerModule,
    ChipModule,
    SkeletonModule,
    TextareaModule,
    CKEditorModule
  ],
  templateUrl: './report-parameter.component.html',
  styleUrls: ['./report-parameter.component.scss']
})
export class ReportParameterComponent implements OnInit {
  reportData: any;
  parameterOptions: any[] = [];
  masterOrderId: number = 0;
  labOrderComponents: ReportComponent[] = [];
  labOrderUnits: any[] = [];
  selectedLabComponent: ReportComponent | any = this.getNewParameter();
  selectedComponentType: any;
  componentTypeId: number | null = null;
  selectedComponentTypeId: number | null = null;
  selectedReportComponent: any;
  tempSelectedReportComponent: any;
  selectedDefault: any;
  componentCodeList: any[] = [];
  isComponentCodeLoading: boolean = false;

  ageUnits: any = [
    { label: 'Days', id: AgeUnit.Days },
    { label: 'Months', id: AgeUnit.Months },
    { label: 'Years', id: AgeUnit.Years },
  ];

  genderOptions = [
    { label: 'Male', id: eGender.Male },
    { label: 'Female', id: eGender.Female },
  ];

  editorVisible: boolean = true;
  public Editor = ClassicEditor;
  public reportConfig: any = configEditor;

  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.masterOrderId = +id;

    // Static / Mock data for demonstration
    this.parameterOptions = [
      { componentTypeId: 3, name: 'Result Range' },
      { componentTypeId: 2, name: 'Descriptive (No Ranges)' },
      { componentTypeId: 4, name: 'Age Result Range' },
      { componentTypeId: 5, name: 'Formula' }
    ];

    this.labOrderUnits = [
      { unitId: 1, name: 'mg/dL' },
      { unitId: 2, name: 'g/L' },
      { unitId: 3, name: 'mmol/L' }
    ];

    this.componentCodeList = [
      { componentName: 'Glucose', code: 'A' },
      { componentName: 'Creatinine', code: 'B' },
      { componentName: 'BUN', code: 'C' }
    ];

    this.getLabOrderComponent();
  }

  getLabOrderComponent() {
    // Initializing with one dummy component for "static" demo
    const dummy = this.getNewParameter();
    dummy.componentName = "Hemoglobin";
    dummy.componentType = "Result Range";
    dummy.componentTypeId = 3;
    dummy.componentResultRanges.push({
      ...this.getNewComponentResultRange(),
      min: 12,
      max: 16,
      gender: 1,
      rangeName: 'Adult Male'
    });
    this.labOrderComponents = [dummy];
    this.selectedLabComponent = this.labOrderComponents[0];
    this.selectedReportComponent = [this.labOrderComponents[0]];
  }

  onUnitChange(event: any, range: any): void {
    range.minAge = null;
    range.maxAge = null;
  }

  onAgeInput(event: any, unitId: number): void {
    const input = event.target;
    const value = Number(input.value);
    const max = this.getMaxAge(unitId);
    if (value > max) input.value = max.toString();
  }

  getMaxAge(unit: AgeUnit | number): number {
    switch (unit) {
      case AgeUnit.Days: return 31;
      case AgeUnit.Months: return 12;
      case AgeUnit.Years: return 280;
      default: return 999;
    }
  }

  onDefaultSelected(selectedRange: ComponentResultRange) {
    this.selectedDefault = selectedRange.guid;
    this.selectedLabComponent?.componentResultRanges.forEach((range: any) => {
      range.isDefault = (range.guid === selectedRange.guid);
    });
  }

  getNewParameter(): ReportComponent {
    return {
      guid: Math.random().toString(36).substring(2),
      componentId: 0,
      componentTypeId: 0,
      componentName: "",
      componentType: '',
      description: "",
      sequenceNo: 0,
      unitId: 0,
      method: '',
      integrationCode: "",
      componentResultRanges: []
    };
  }

  getNewComponentResultRange(): ComponentResultRange {
    return {
      guid: Math.random().toString(36).substring(2),
      isDefault: null,
      description: null,
      resultRangeId: 0,
      rangeName: '',
      resultRangeTypeId: 0,
      min: 0,
      max: 0,
      gender: 0,
      isBold: false,
      isUnderLine: false,
      colour: '',
      unitId: 0,
      minAge: 0,
      maxAge: 0,
      isConfirmationText: false,
    };
  }

  addNewParameter(event: any) {
    if (!event) return;
    const componentType = this.parameterOptions.find(x => x.componentTypeId === event);
    const newParameter = this.getNewParameter();
    newParameter.componentTypeId = event;
    newParameter.componentType = componentType.name;
    newParameter.isNew = true;
    newParameter.componentResultRanges.push(this.getNewComponentResultRange());
    this.labOrderComponents.push(newParameter);
    this.selectedLabComponent = newParameter;
    this.selectedReportComponent = [newParameter];
    this.selectedComponentTypeId = null;
  }

  addRange() {
    this.selectedLabComponent.componentResultRanges.push(this.getNewComponentResultRange());
  }

  submitReportComponent() {
    console.log('Saving component...', this.selectedLabComponent);
  }

  cancelReportComponent(data: any) {
    console.log('Cancelled');
  }

  onReportComponentSelect(event: any) {
    this.selectedLabComponent = event.value[0];
  }

  onEditorChange(value: string) {
    this.selectedLabComponent.description = value;
  }

  deleteReportComponent(event: any, param: any) {
    event.stopPropagation();
    this.labOrderComponents = this.labOrderComponents.filter(x => x.guid !== param.guid);
    if (this.labOrderComponents.length > 0) {
      this.selectedLabComponent = this.labOrderComponents[0];
    }
  }

  onReOrderComponent(event: any) { }

  clearComponentType(event: any) { }

  handleFocus(event: any) {
    event.target.select();
  }

  onComponentTypeChange(event: any, selectedLabComponent: any) {
    const type = this.parameterOptions.find(x => x.componentTypeId === event.value);
    selectedLabComponent.componentType = type.name;
  }
}
