export interface Istudent {
    _id?: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    course: string;
    cv?: string;
    isVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

