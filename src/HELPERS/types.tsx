export interface Employee {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    schedule: Shift[];
    services: Service[];
}

export interface IEmployeePost {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    schedule: Shift[];
    services: String[];
}

export interface Shift {
    hours: string;
    startTime: string;
    endTime: string;
}

export interface Service {
    _id: string;
    name: string;
    price: string;
    description: string;
}

export interface IServicePost {
    name: string;
    price: string;
    description: string;
}

export interface TabRoute {
    name: string;
    goto: string;
}

export interface Appointment {
    _id: string;
    date: Date;
    endTime: string;
    service: Service;
    startTime: string;
    status: string;
    userEmail: string;
    userName: string;
    userPhone: string;
    worker: Employee;
    paid?: string;
    tip?: string;
}

export interface IAppointmentPost {
    worker: string;
    service: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    date: string;
    startTime: string;
    endTime: string;
}

export interface Slot {
    worker: string;
    service: string;
    startTime: string;
    endTime: string;
}
