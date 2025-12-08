import styles from "@/sass/components/common/TableSkeleton.module.scss";

interface TableSkeletonProps {
    rows?: number;
    columns?: number;
}

export default function TableSkeleton({ rows = 5, columns = 6 }: TableSkeletonProps) {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.skeletonTable}>
                <thead>
                    <tr>
                        {Array.from({ length: columns }).map((_, index) => (
                            <th key={index}>
                                <div className={styles.skeletonHeader} />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <td key={colIndex}>
                                    <div className={styles.skeletonCell} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
