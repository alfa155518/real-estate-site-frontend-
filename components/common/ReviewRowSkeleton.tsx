import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ReviewRowSkeleton = () => {
  return (
    <tr className="animate-pulse">
      <td className="py-4 px-2">
        <div className="flex items-center gap-3">
          <Skeleton circle width={40} height={40} />
          <Skeleton width={100} height={20} />
        </div>
      </td>
      <td className="py-4 px-2">
        <Skeleton width={150} height={20} />
      </td>
      <td className="py-4 px-2">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} width={20} height={20} />
          ))}
        </div>
      </td>
      <td className="py-4 px-2">
        <Skeleton width={200} height={20} />
      </td>
      <td className="py-4 px-2">
        <Skeleton width={30} height={20} />
      </td>
      <td className="py-4 px-2">
        <Skeleton width={120} height={20} />
      </td>
      <td className="py-4 px-2">
        <Skeleton width={30} height={30} className="rounded" />
      </td>
    </tr>
  );
};
