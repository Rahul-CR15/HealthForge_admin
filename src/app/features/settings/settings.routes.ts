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
                data: { orderType: 1 },
                loadComponent: () =>
                    import('./pages/order-type/order-type.component').then(m => m.OrderTypeComponent)
            },
            {
                path: 'ordertype2',
                data: { orderType: 2 },
                loadComponent: () =>
                    import('./pages/order-type/order-type.component').then(m => m.OrderTypeComponent)
            },
            {
                path: 'ordertype3',
                data: { orderType: 3 },
                loadComponent: () =>
                    import('./pages/order-type/order-type.component').then(m => m.OrderTypeComponent)
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
