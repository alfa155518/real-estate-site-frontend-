"use client";

import { useEffect } from "react";
import useAdminManageAgenciesStore from "@/store/admin/AdminManageAgenciesStore";
import { Agency, AgencyData } from "@/types/admin/adminAgenciesStore";
import PresentationalAgencies from "./PresentationalAgencies";

export default function AgenciesPage() {
    const {
        agencies,
        meta,
        isLoading,
        handleInitAgencies,
        handlePageChange,
        handleCreateAgency,
        handleUpdateAgency,
        handleDeleteAgency,
    } = useAdminManageAgenciesStore();

    useEffect(() => {
        handleInitAgencies();
    }, [handleInitAgencies]);

    const convertAgencyToFormData = (agency: Agency): Partial<AgencyData> => {
        return {
            id: agency.id,
            name: agency.name,
            phone: agency.phone,
            website: agency.website,
        };
    };

    const handleSubmitAgency = async (data: AgencyData) => {
        if (data.id) {
            await handleUpdateAgency(meta.current_page, data.id, data);
        } else {
            await handleCreateAgency(meta.current_page, data);
        }
    };

    const handleDelete = async (agencyId: number) => {
        await handleDeleteAgency(agencyId, meta.current_page);
    };

    return (
        <PresentationalAgencies
            agencies={agencies}
            meta={meta}
            isLoading={isLoading}
            onPageChange={handlePageChange}
            onSubmitAgency={handleSubmitAgency}
            onDeleteAgency={handleDelete}
            convertAgencyToFormData={convertAgencyToFormData}
        />
    );
}
