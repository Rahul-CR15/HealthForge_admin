import { Alignment, Autoformat, AutoImage, Base64UploadAdapter, Bold, EditorConfig, Essentials, FontBackgroundColor, FontColor, Heading, ImageBlock, ImageCaption, ImageInline, ImageInsertViaUrl, ImageResize, ImageStyle, ImageTextAlternative, ImageToolbar, ImageUpload, Indent, Italic, Link, List, Paragraph, RemoveFormat, SourceEditing, Table, TableToolbar, TodoList, Underline } from "ckeditor5";

export const ApiConstants = {
  getCompany: "GetCompany",
  company: 'company',
  getUsers: 'GetUsers',
  getUsersByCompanyId: 'user/getUsersByCompanyId',
  delete: 'Delete',
  productGet: 'product/Get',
  userProduct: 'userProduct',
  userUserRole: 'user/userRole',
  allProduct: 'product/All',
  role: 'role',
  user: 'user/saveUser',
  deleteUser: 'user',
  language: 'language',
  userActivateUser: 'user/activateUser',
  userRolePermission: 'user/rolePermission',
  productSubscription: 'product/Subscription',
  getDoctorType: 'User/getDoctorType',
  location: 'location/get',
  locationDelete: 'location/delete',
  locationAdd: 'location',
  locationEdit: 'location/edit',
  getOrderCategory: 'order/getOrderCategory',
  getMasterOrder: 'masterorder/get',
  addeditmasterorder: 'masterorder/addedit',
  deletemasterorder: 'masterorder/delete',
  getordertype1: 'masterorder/getordertype1',
  getordertype2: 'masterorder/getordertype2',
  getordertype3: 'masterorder/getordertype3',
  addeditordertype1: 'masterorder/addeditordertype1',
  addeditordertype2: 'masterorder/addeditordertype2',
  addeditordertype3: 'masterorder/addeditordertype3',
  deleteordertype1: 'masterorder/deleteordertype1',
  deleteordertype2: 'masterorder/deleteordertype2',
  deleteordertype3: 'masterorder/deleteordertype3',
  getfacilitytype: 'masterfacility/getfacilitytype',
  facilityDelete: 'masterfacility/delete',
  facilityAdd: 'masterfacility/add',
  facilityEdit: 'masterfacility/edit',
  facilityGetall: 'masterfacility/getall',
  facilityGetFacilityWithCompany: 'masterfacility/getfacilitywithcompany',
  facilityGetFacilityWithoutCompany: 'masterfacility/getfacilitywithoutcompany',
  addEditPrefferedFacility: 'masterfacility/addeditprefferedfacility',
  formdocumentGet: 'formdocument/get',
  formdocumentDelete: 'formdocument/delete',
  formdocumentAddedit: 'formdocument/addedit',
  permissionList: 'permission',
  updateCompanyStatus: 'company/UpdateCompanyStatus',
  getInventory: 'MasterInventory/GetInventory',
  addInventory: 'MasterInventory/AddInventory',
  deleteInventory: 'MasterInventory/DeleteInventory',
  getInventoryType: 'MasterInventory/GetInventoryType',
  addInventoryType: 'MasterInventory/AddInventoryType',
  deleteInventorType: 'MasterInventory/DeleteInventorType',
  getMedicalHistory: 'MedicalHistory/getall',
  addMedicalHistory: 'MedicalHistory/add',
  deleteMedicalHistory: 'MedicalHistory/delete',
  getAncillary: 'ancillary/GetAncillary',
  addAncillary: 'ancillary/AddUpdateAncillary',
  deleteCategory: 'ancillary/DeleteAncillary',
  campaignTemplate: 'CampaignTemplate',
  CountryExtension: 'CountryExtension',
  getLabCompany: 'company/GetLabCompanyList',
  getCompanyWiseReports: 'CompanyWiseReport/get',
  getLabWiseReports: 'CompanyWiseReport/getLabReport',
  companyList: 'company/list',
  doctorType: 'DoctorType/GetAllDoctorType',
  deleteDoctorType: 'DoctorType/DeleteDoctorType',
  addDoctorType: 'DoctorType/AddDoctorType',
  updateDoctorType: 'DoctorType/EditDoctorType',

  defaultDataComplaint: 'DefaultData/Complaint',
  defaultDataDiagnosis: 'DefaultData/Diagnosis',

  // Notification
  getScheduleNotification: 'ScheduleNotification/All',
  scheduleNotification: 'ScheduleNotification',
  postScheduleNotification: 'ScheduleNotification/ForAll',
  updateNotification: 'Notification/UpdateNotification',
  deleteNotification: 'Notification/DeleteNotification',

  // Add Doctors
  addDoctors: 'user/AddDoctor',
  getAllDoctors: 'user/GetAllDoctors',
  deleteDoctor: 'user/DeleteDoctor',
  editDoctors: 'user/UpdateDoctor',
  getDoctorById: 'user/GetDoctorByDoctorId',

  //Lab Component
  getContenetType: 'ComponentType',
  getLabOrderUnit: 'LabOrderUnit',
  labOrderComponent: 'component',
  // country
  Country: 'country',
  componentCode: 'Component/ComponentCode',
  // network
  Network: 'network',
  NetworkSubscription: 'NetworkSubscription',
  DoctorNetwork: 'NetworkDoctor',
  PatientSubscriptionNetwork: 'NetworkPatientSubscription',
  bankVendor: 'PaymentConfiguration',
}


export const ResponseMessage = {
  ADDED: "{{name}} has been added successfully.",
  UPDATE: "{{name}} has been updated successfully.",
  DELETE: "{{name}} has been deleted successfully.",
  SEND_REQUEST: "Request has been sent successfully.",
}
export const configEditor: EditorConfig = {

  toolbar: {
    items: [
      'heading', '|',
      'bold', 'italic', 'underline', '|',
      'link', 'removeFormat', '|',
      'bulletedList', 'numberedList', 'todoList', '|',
      'insertTable', '|',
      'fontColor', 'fontBackgroundColor', '|',
      'alignment', '|',
      'sourceEditing', '|',
      'undo', 'redo'
    ],
    shouldNotGroupWhenFull: false
  },
  plugins: [
    Essentials,
    Paragraph,
    Heading,
    Bold,
    Italic,
    Underline,
    Link,
    RemoveFormat,
    List,
    TodoList,
    Alignment,
    FontColor,
    FontBackgroundColor,
    Table,
    TableToolbar,
    Autoformat,
    Indent,
    AutoImage,
    ImageBlock,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Base64UploadAdapter,
    SourceEditing
  ],
  fontColor: {
    columns: 5,
    documentColors: 10
  },
  fontBackgroundColor: {
    columns: 5,
    documentColors: 10
  },
  image: {
    toolbar: [
      'toggleImageCaption',
      'imageTextAlternative',
      '|',
      'imageStyle:inline',
      'imageStyle:wrapText',
      'imageStyle:breakText',
      '|',
      'resizeImage'
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ]
  },
  alignment: {
    options: ['left', 'center', 'right']
  },
  initialData: ''
};
