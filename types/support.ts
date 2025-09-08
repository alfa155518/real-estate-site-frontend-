export type SupportFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  attachment?: FileList;
};
