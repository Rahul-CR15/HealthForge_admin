import { Routes } from '@angular/router';

export const settingsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./settings.component').then(m => m.SettingsComponent),
        children: [
            {
                path: '',
                redirectTo: 'master-order',
                pathMatch: 'full'
            },
            {
                path: 'master-order',
                loadComponent: () =>
                    import('./pages/master-order/master-order.component').then(m => m.MasterOrderComponent)
            },
            {
                path: 'ordertype1',
                loadComponent: () =>
                    import('./pages/order-type1/order-type1.component').then(m => m.OrderType1Component)
            },
            {
                path: 'ordertype2',
                loadComponent: () =>
                    import('./pages/order-type2/order-type2.component').then(m => m.OrderType2Component)
            },
            {
                path: 'ordertype3',
                loadComponent: () =>
                    import('./pages/order-type3/order-type3.component').then(m => m.OrderType3Component)
            },
            {
                path: 'facility',
                loadComponent: () =>
                    import('./pages/facility/facility.component').then(m => m.FacilityComponent)
            },
            {
                path: 'inventory',
                loadComponent: () =>
                    import('./pages/inventory/inventory.component').then(m => m.InventoryComponent)
            },
            {
                path: 'medical-history',
                loadComponent: () =>
                    import('./pages/medical-history/medical-history.component').then(m => m.MedicalHistoryComponent)
            },
            {
                path: 'category',
                loadComponent: () =>
                    import('./pages/category/category.component').then(m => m.CategoryComponent)
            },
            {
                path: 'form-document',
                loadComponent: () =>
                    import('./pages/form-document/form-document.component').then(m => m.FormDocumentComponent)
            },
            {
                path: 'campaign-template',
                loadComponent: () =>
                    import('./pages/campaign-template/campaign-template.component').then(m => m.CampaignTemplateComponent)
            },
            {
                path: 'complaints',
                loadComponent: () =>
                    import('./pages/complaints/complaints.component').then(m => m.ComplaintsComponent)
            },
            {
                path: 'diagnosis',
                loadComponent: () =>
                    import('./pages/diagnosis/diagnosis.component').then(m => m.DiagnosisComponent)
            },
            {
                path: 'doctor-type',
                loadComponent: () =>
                    import('./pages/doctor-type/doctor-type.component').then(m => m.DoctorTypeComponent)
            }
        ]
    }
];
