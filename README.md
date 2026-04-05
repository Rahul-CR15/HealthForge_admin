# Health Forge - Clinic Management System

Health Forge is a modern, enterprise-level Clinic Management System built with Angular 20 and PrimeNG. This version features a fixed global header and footer, a strict role-based dashboard, and placeholder "Coming Soon" pages for clinical modules.

## 🚀 Project Overview

- **Global Header**: Shows Application Name, Logged-in User Email, and Role Badge.
- **Global Footer**: Shows Copyright and Project Name.
- **Role-Based Demo Admin**: Strict redirection and menu visibility based on user roles.
- **Coming Soon Placeholders**: All functional clinical modules are under development.

## 🔑 Demo Login Credentials

Email pattern: `{role}@healthforge.com`  
Password: `Admin@123`

| Role | Demo Email |
| :--- | :--- |
| **Admin** | `admin@healthforge.com` |
| **Doctor** | `doctor@healthforge.com` |
| **Receptionist** | `receptionist@healthforge.com` |
| **Pathologist** | `pathologist@healthforge.com` |
| **Pharmacist** | `pharmacist@healthforge.com` |

## 📁 Project Structure

- `src/app/core/`: Contains singleton services (Auth, Token), guards, and global models.
- `src/app/shared/components/`: Reusable components used across the app.
  - `global-header`: Fixed top navigation.
  - `global-footer`: Fixed bottom footer.
  - `coming-soon`: Placeholder component for under-development modules.
- `src/app/features/`: Feature modules (Auth, Dashboard, Appointments, etc.).
- `src/app/layout/`: Sakai-based layout components (Sidebar, Topbar).

## 🛠 Coding Standards

- **Standalone Components**: Everything is built using standalone components for modularity.
- **Strong Typing**: No usage of `any`. Everything is properly typed with TypeScript.
- **Clean Templates**: Logic is kept in components; templates are used for presentation only.
- **Enterprise Structure**: Scalable folder organization following Angular best practices.

## ⏩ Future Scope

- Integration with real backend APIs.
- Full implementation of Appointments, Patient Management, Lab, and Pharmacy modules.
- Advanced reporting and analytics dashboards.
- Real-time notifications and chat systems.

---

**Note**: The UI theme and layout styling are strictly maintained from the original Sakai template. No changes have been made to the core PrimeNG or Tailwind configuration.
