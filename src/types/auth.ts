export interface Login {
    password?: string,
    phone: string,
    code?: string
}

export interface Register {
    phone: string,
    password: string,
    password_repeat: string,
    verify_type: string
}