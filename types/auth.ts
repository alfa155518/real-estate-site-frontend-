
export interface ResetPasswordFormData {
    password: string;
    confirm_password: string;
}

export interface ForgetPasswordFormData {
    email: string;
}

export interface ResetPasswordFormData {
    token: string | null;
    email: string | null;
    password: string;
    confirm_password: string;
}

