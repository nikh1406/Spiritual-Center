export interface userList {
    "devoteeId": string,
    "firstName": string,
    "middleName": string,
    "lastName": string,
    "photo"?: string,
    "flatNumber": number,
    "area": string,
    "state": string,
    "city": string,
    "pincode": string,
    "emailid": string,
    "initiationDate": Date | string
}

export interface payment {
    "paymentId"?: number,
    "devoteeId": string,
    "month": number,
    "year": number,
    "amount": number,
    "paymentMethod"?: string
}

export interface Login {
    "id": string,
    "role": string
}

export interface loginFlag {
    isvalidCredential: boolean;
    otpView: boolean;
}

export interface Header {
    headers: {
        Accept: string,
        "Content-Type": string,
        Authorization: string,
        "Access-Control-Allow-Origin"?: string
    }
}

export interface loginResponse {
    token: string,
    role: string,
    id: string,
    expiration: string,
    name: string,
    img: string
}

export interface ChatMessage {
    sender: string;
    content: string;
    timestamp: string;
    room?: string;
    id?: number
}