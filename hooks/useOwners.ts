import { useState, useMemo } from "react";
import { Owner, OwnerData, UseOwnersProps } from "@/types/admin/adminOwnersStore";


export function useOwners({ owners, onSubmitOwner, onDeleteOwner }: UseOwnersProps) {
    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [editingOwner, setEditingOwner] = useState<Owner | null>(null);

    // Delete modal states
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Search state
    const [searchTerm, setSearchTerm] = useState("");

    // Filter owners based on search (memoized for performance)
    const filteredOwners = useMemo(() => {
        if (!searchTerm) return owners;

        const lowerSearchTerm = searchTerm.toLowerCase();
        return owners.filter(
            (owner) =>
                owner.name?.toLowerCase()?.includes(lowerSearchTerm) ||
                owner.email?.toLowerCase()?.includes(lowerSearchTerm) ||
                owner.phone?.includes(searchTerm)
        );
    }, [owners, searchTerm]);

    // Modal handlers
    const handleAddOwner = () => {
        setEditingOwner(null);
        setShowModal(true);
    };

    const handleEditOwner = (owner: Owner) => {
        setEditingOwner(owner);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingOwner(null);
    };

    // Delete handlers
    const handleDeleteClick = (owner: Owner) => {
        setDeleteTarget({ id: owner.id, name: owner.name });
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteTarget) return;

        setIsDeleting(true);
        try {
            await onDeleteOwner(deleteTarget.id);
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
    const handleSubmit = async (data: OwnerData) => {
        await onSubmitOwner(data);
        handleCloseModal();
    };

    return {
        // States
        showModal,
        editingOwner,
        showDeleteModal,
        deleteTarget,
        isDeleting,
        searchTerm,
        filteredOwners,

        // Handlers
        setSearchTerm,
        handleAddOwner,
        handleEditOwner,
        handleCloseModal,
        handleDeleteClick,
        handleConfirmDelete,
        handleCancelDelete,
        handleSubmit,
    };
}
