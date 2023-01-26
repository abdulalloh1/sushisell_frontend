export interface internalLogin {
    phone: string,
    code: string
}

export interface externalLogin {
    phone: string,
    password: string
}

export interface Register {
    phone: string,
    password: string,
    password_repeat: string,
    verify_type: string
}