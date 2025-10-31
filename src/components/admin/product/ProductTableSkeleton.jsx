import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Skeleton } from "@heroui/react";

const ProductTableSkeleton = () => {
  return (
    <Table aria-label="Loading products">
      <TableHeader>
        <TableColumn>GAMBAR</TableColumn>
        <TableColumn>NAMA</TableColumn>
        <TableColumn>DESKRIPSI</TableColumn>
        <TableColumn>HARGA</TableColumn>
        <TableColumn>AKSI</TableColumn>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="w-16 h-16 rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-4 rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-48 h-4 rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-24 h-4 rounded-lg" />
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Skeleton className="w-16 h-8 rounded-lg" />
                <Skeleton className="w-16 h-8 rounded-lg" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTableSkeleton;
