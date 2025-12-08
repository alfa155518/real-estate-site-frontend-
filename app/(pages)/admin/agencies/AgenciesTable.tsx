import { motion } from "framer-motion";
import {
    Edit,
    Trash2,
    Building2,
    Phone,
    Globe,
} from "lucide-react";
import { Agency } from "@/types/admin/adminAgenciesStore";
import TableSkeleton from "@/components/common/TableSkeleton";
import styles from "@/sass/pages/admin/agencies.module.scss";

export default function AgenciesTable({
    agencies,
    loading,
    onEdit,
    onDelete,
}: {
    agencies: Agency[];
    loading: boolean;
    onEdit: (agency: Agency) => void;
    onDelete: (agency: Agency) => void;
}) {
    if (loading) {
        return (
            <TableSkeleton rows={5} columns={6} />
        );
    }

    if (agencies.length === 0) {
        return (
            <div className={styles.tableContainer}>
                <div className={styles.emptyState}>
                    <Building2 size={48} />
                    <p>لا توجد وكالات</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>الاسم</th>
                        <th>الهاتف</th>
                        <th>الموقع الإلكتروني</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {agencies.map((agency) => (
                        <motion.tr
                            key={agency.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <td>{agency.id}-{agency.name}</td>
                            <td>
                                <Phone size={16} style={{ display: "inline", marginLeft: "0.5rem" }} />
                                {agency.phone}
                            </td>
                            <td>
                                {agency.website ? (
                                    <>
                                        <Globe size={16} style={{ display: "inline", marginLeft: "0.5rem" }} />
                                        <a href={agency.website} target="_blank" rel="noopener noreferrer">
                                            {agency.website}
                                        </a>
                                    </>
                                ) : (
                                    "-"
                                )}
                            </td>
                            <td className={styles.actions}>
                                <button className={styles.editBtn} onClick={() => onEdit(agency)}>
                                    <Edit size={16} />
                                    تعديل
                                </button>
                                <button className={styles.deleteBtn} onClick={() => onDelete(agency)}>
                                    <Trash2 size={16} />
                                    حذف
                                </button>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}