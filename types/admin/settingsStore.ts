

export interface SettingsData {
    logo: FileList | string | null;
    location: string;
    phone: string;
    email: string;
    opening_hours: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
}
export type ContactInfoFormData = SettingsData;

export interface SettingStore {
    settings: SettingsData;
    isLoading: boolean;
    handleGetSettings: () => Promise<void>;
    handleUpdateSettings: (data: SettingsData) => Promise<void>;
}
