
import { motion } from "framer-motion";
import {
    Edit,
    Trash2,
    User,
    Mail,
    Phone
} from "lucide-react";
import { Owner } from "@/types/admin/adminOwnersStore";
import styles from "@/sass/pages/admin/owners.module.scss";
import TableSkeleton from "@/components/common/TableSkeleton";
// Owners Table Component
export default function OwnersTable({
    owners,
    loading,
    onEdit,
    onDelete,
}: {
    owners: Owner[];
    loading: boolean;
    onEdit: (owner: Owner) => void;
    onDelete: (owner: Owner) => void;
}) {
    if (loading) {
        return <TableSkeleton rows={5} columns={6} />;
    }

    if (owners.length === 0) {
        return (
            <div className={styles.tableContainer}>
                <div className={styles.emptyState}>
                    <User size={48} />
                    <p>لا توجد ملاك</p>
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
                        <th>البريد الإلكتروني</th>
                        <th>الهاتف</th>
                        <th>النوع</th>
                        <th>الوكالة</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {owners.map((owner) => (
                        <motion.tr
                            key={owner.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <td>{owner.id}-{owner.name}</td>
                            <td>
                                <Mail size={16} style={{ display: "inline", marginLeft: "0.5rem" }} />
                                {owner.email}
                            </td>
                            <td>
                                <Phone size={16} style={{ display: "inline", marginLeft: "0.5rem" }} />
                                {owner.phone}
                            </td>
                            <td>
                                <span className={`${styles.badge} ${styles[owner.type]}`}>
                                    {owner.type === "individual" ? "فرد" : "شركة"}
                                </span>
                            </td>
                            <td>{owner.agency_name || "-"}</td>
                            <td className={styles.actions}>
                                <button className={styles.editBtn} onClick={() => onEdit(owner)}>
                                    <Edit size={16} />
                                    تعديل
                                </button>
                                <button className={styles.deleteBtn} onClick={() => onDelete(owner)}>
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
