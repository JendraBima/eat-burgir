import { Skeleton } from "@heroui/react";

const OrderTableSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border rounded-lg">
          <Skeleton className="w-32 h-12 rounded" />
          <Skeleton className="w-24 h-12 rounded" />
          <Skeleton className="w-24 h-12 rounded" />
          <Skeleton className="w-32 h-12 rounded" />
          <Skeleton className="w-48 h-12 rounded" />
        </div>
      ))}
    </div>
  );
};

export default OrderTableSkeleton;
