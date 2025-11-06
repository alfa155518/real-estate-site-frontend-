import { PaginationMeta } from "../pagination";

export interface UserFormData {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    role: 'admin' | 'user';
}

export interface UserData extends UserFormData {
    id: number;
    created_at: string;
}

interface User extends UserData {
    phone: string;
    address: string;
}

export interface AdminManageUsersStore {
    users: User[];
    meta: PaginationMeta;
    admins_total: number;
    isLoading: boolean;
    loadingIds: number[];
    handleGetUsers: (page?: number) => Promise<void>;
    handlePageChange: (page: number) => Promise<void>;
    handleDeleteUser: (id: number, page: number) => Promise<void>;
    handleUpdateUser: (
        userId: number,
        formData: UserFormData,
        page: number
    ) => Promise<void>;
}

export interface UserFormProps {
    initialData: Partial<UserFormData>;
    onSubmit: (data: UserFormData) => void;
    onCancel: () => void;
}

export interface UserModalProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    editingUser?: UserFormData;
    handleSubmit: (data: UserFormData) => void;
}


export interface PresentationalUsersProps extends UserModalProps {
    isLoading: boolean;
    totalUsers: number;
    adminUsers: number;
    meta: PaginationMeta;
    handlePageChange: (page: number) => void;
    loadingIds: number[];
    handleEditUser: (user: UserData) => void;
    submitDeleteUser: (id: number) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filters: {
        sortBy: string;
        role: string;
    };
    handleFilterChange: (filterName: string, value: string) => void;
    getRoleLabel: (role: string) => string;
    filteredUsers: UserData[];
}