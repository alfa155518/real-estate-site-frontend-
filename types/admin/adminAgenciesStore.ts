import { PaginationMeta } from "../pagination";


export interface Agency {
    id: number;
    name: string;
    phone: string;
    website?: string | null;
}


export interface AgencyData {
    id?: number;
    name: string;
    phone: string;
    website?: string | null;
}

// Agency form props
export interface AgencyFormProps {
    initialData?: Partial<AgencyData>;
    onSubmit: (data: AgencyData) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

// Zustand store interface
export interface AdminManageAgenciesStore {
    agencies: Agency[];
    meta: PaginationMeta;
    isLoading: boolean;

    // Load initial agencies
    handleInitAgencies: () => Promise<void>;

    // Handle page changes
    handlePageChange: (page: number) => Promise<void>;

    handleUpdateAgency: (
        page: number,
        agencyId: number,
        agencyData: AgencyData
    ) => Promise<void>;

    handleCreateAgency: (
        page: number,
        agencyData: AgencyData
    ) => Promise<void>;

    handleDeleteAgency: (
        agencyId: number,
        page: number
    ) => Promise<void>;
}


export interface PresentationalAgenciesProps {
    agencies: Agency[];
    meta: PaginationMeta;
    isLoading: boolean;
    onPageChange: (page: number) => void;
    onSubmitAgency: (data: AgencyData) => void;
    onDeleteAgency: (agencyId: number) => void;
    convertAgencyToFormData: (agency: Agency) => Partial<AgencyData>;
}


export interface UseAgenciesProps {
    agencies: Agency[];
    onSubmitAgency: (data: AgencyData) => void;
    onDeleteAgency: (agencyId: number) => void;
}
