import { useState, useMemo } from "react";
import { Agency, AgencyData, UseAgenciesProps } from "@/types/admin/adminAgenciesStore";


export function useAgencies({ agencies, onSubmitAgency, onDeleteAgency }: UseAgenciesProps) {
    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [editingAgency, setEditingAgency] = useState<Agency | null>(null);

    // Delete modal states
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Search state
    const [searchTerm, setSearchTerm] = useState("");

    // Filter agencies based on search (memoized for performance)
    const filteredAgencies = useMemo(() => {
        if (!searchTerm) return agencies;

        const lowerSearchTerm = searchTerm.toLowerCase();
        return agencies.filter(
            (agency) =>
                agency?.name?.toLowerCase()?.includes(lowerSearchTerm) ||
                agency?.phone?.includes(searchTerm)
        );
    }, [agencies, searchTerm]);

    // Modal handlers
    const handleAddAgency = () => {
        setEditingAgency(null);
        setShowModal(true);
    };

    const handleEditAgency = (agency: Agency) => {
        setEditingAgency(agency);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingAgency(null);
    };

    // Delete handlers
    const handleDeleteClick = (agency: Agency) => {
        setDeleteTarget({ id: agency.id, name: agency.name });
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteTarget) return;

        setIsDeleting(true);
        try {
            await onDeleteAgency(deleteTarget.id);
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
            setDeleteTarget(null);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setDeleteTarget(null);
    };

    // Form submission handler
    const handleSubmit = async (data: AgencyData) => {
        await onSubmitAgency(data);
        handleCloseModal();
    };

    return {
        // States
        showModal,
        editingAgency,
        showDeleteModal,
        deleteTarget,
        isDeleting,
        searchTerm,
        filteredAgencies,

        // Handlers
        setSearchTerm,
        handleAddAgency,
        handleEditAgency,
        handleCloseModal,
        handleDeleteClick,
        handleConfirmDelete,
        handleCancelDelete,
        handleSubmit,
    };
}
