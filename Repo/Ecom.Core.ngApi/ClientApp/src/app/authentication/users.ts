export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}
export class UserRegistration {
    profile: Profile;
    credentials: Credentials;
    groupIds: string[];
}
export class Profile {
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    accesstoken: string;
    merchantId: string;
    partnerid: string;
    mobilePhone: string;
}
export class Credentials {
    password: Password;
}
export class Password {
    value: string;
}
export class UpdateUser {
    profile: Profile;
}
export class ResetPassword {
    userName : string;
    factorType : string;
}
