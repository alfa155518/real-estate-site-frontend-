"use client";

import { useEffect } from "react";
import useAdminManageOwnersStore from "@/store/admin/AdminManageOwnersStore";
import { Owner, OwnerData } from "@/types/admin/adminOwnersStore";
import PresentationalOwners from "./PresentationalOwners";

export default function OwnersPage() {
    const {
        owners,
        meta,
        isLoading,
        handleInitOwners,
        handlePageChange,
        handleCreateOwner,
        handleUpdateOwner,
        handleDeleteOwner,
    } = useAdminManageOwnersStore();

    useEffect(() => {
        handleInitOwners();
    }, [handleInitOwners]);

    const convertOwnerToFormData = (owner: Owner): Partial<OwnerData> => {
        return {
            id: owner.id,
            name: owner.name,
            phone: owner.phone,
            email: owner.email,
            type: owner.type,
            agency_id: owner.type == "company" ? owner.agency_id : null,
        };
    };

    const handleSubmitOwner = async (data: OwnerData) => {
        if (data.id) {
            await handleUpdateOwner(meta.current_page, data.id, data);
        } else {
            await handleCreateOwner(meta.current_page, data);
        }
    };

    const handleDelete = async (ownerId: number) => {
        await handleDeleteOwner(ownerId, meta.current_page);
    };

    return (
        <PresentationalOwners
            owners={owners}
            meta={meta}
            isLoading={isLoading}
            onPageChange={handlePageChange}
            onSubmitOwner={handleSubmitOwner}
            onDeleteOwner={handleDelete}
            convertOwnerToFormData={convertOwnerToFormData}
        />
    );
}
