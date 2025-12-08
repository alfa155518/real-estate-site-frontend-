import { PaginationMeta } from "../pagination";

export interface Owner {
    id: number;
    name: string;
    phone: string;
    email: string;
    type: 'individual' | 'company';
    agency_id?: number | null;
    agency_name?: string;
}

// Owner form data
export interface OwnerData {
    id?: number;
    name: string;
    phone: string;
    email: string;
    type: 'individual' | 'company';
    agency_id?: number | null;
}

// Owner form props
export interface OwnerFormProps {
    initialData?: Partial<OwnerData>;
    onSubmit: (data: OwnerData) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

// Zustand store interface
export interface AdminManageOwnersStore {
    owners: Owner[];
    meta: PaginationMeta;
    isLoading: boolean;

    // Load initial owners
    handleInitOwners: () => Promise<void>;

    // Handle page changes
    handlePageChange: (page: number) => Promise<void>;

    handleUpdateOwner: (
        page: number,
        ownerId: number,
        ownerData: OwnerData
    ) => Promise<void>;

    handleCreateOwner: (
        page: number,
        ownerData: OwnerData
    ) => Promise<void>;

    handleDeleteOwner: (
        ownerId: number,
        page: number
    ) => Promise<void>;
}

export interface PresentationalOwnersProps {
    owners: Owner[];
    meta: PaginationMeta;
    isLoading: boolean;
    onPageChange: (page: number) => void;
    onSubmitOwner: (data: OwnerData) => Promise<void>;
    onDeleteOwner: (ownerId: number) => Promise<void>;
    convertOwnerToFormData: (owner: Owner) => Partial<OwnerData>;
}

export interface UseOwnersProps {
    owners: Owner[];
    onSubmitOwner: (data: OwnerData) => Promise<void>;
    onDeleteOwner: (ownerId: number) => Promise<void>;
}