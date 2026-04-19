export interface Company {
    id: number;
    companyName: string;
    // contact person
    firstName: string;
    middleName?: string;
    lastName: string;
    openingHr?: string;
    address: string;
    city?: string;
    state?: string;
    zipcode?: string;
    email: string;
    password?: string;
    phone: string;
    phoneCode?: string;
    status?: number;
    isActive?: boolean;
}
