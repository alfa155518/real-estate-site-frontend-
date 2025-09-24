
export interface ResetPasswordFormData {
    password: string;
    confirm_password: string;
}

export interface ForgetPasswordFormData {
    email: string;
}

export interface ResetParams {
    token: string | null;
    email: string | null;
}
export interface ResetPasswordFormData extends ResetParams {
    password: string;
    confirm_password: string;
}

