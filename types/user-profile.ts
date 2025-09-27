export type ProfileTabType = "personal" | "password";

export type PersonalInfoFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type PasswordProfileFormData = {
  current_password: string;
  password: string;
  confirm_password: string;
};

