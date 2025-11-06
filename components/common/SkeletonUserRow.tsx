import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonUserRow({ count = 5 }: { count?: number }) {
  return Array.from({ length: count }).map((_, index) => (
    <tr key={`skeleton-${index}`}>
      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <Skeleton circle width={40} height={40} />
          <div className="space-y-2">
            <Skeleton width={128} height={16} />
            <Skeleton width={96} height={12} />
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <Skeleton width={96} height={16} />
      </td>
      <td className="py-4 px-4">
        <Skeleton width={128} height={16} />
      </td>
      <td className="py-4 px-4">
        <Skeleton width={80} height={24} borderRadius={9999} />
      </td>
      <td className="py-4 px-4">
        <Skeleton width={96} height={16} />
      </td>
      <td className="py-4 px-4">
        <div className="flex space-x-2">
          <Skeleton width={32} height={32} borderRadius={8} />
          <Skeleton width={32} height={32} borderRadius={8} />
        </div>
      </td>
    </tr>
  ));
}
