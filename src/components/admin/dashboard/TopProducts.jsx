import { Card, CardBody, CardHeader, Image, Progress } from "@heroui/react";

const TopProducts = ({ products }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const maxSales = Math.max(...products.map((p) => p.salesCount), 1);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Produk Terlaris</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {products.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Belum ada data produk</p>
          ) : (
            products.map((product, index) => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm">
                    {index + 1}
                  </span>
                </div>
                <Image
                  src={product.image || "/placeholder-product.png"}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress
                      value={(product.salesCount / maxSales) * 100}
                      size="sm"
                      color="warning"
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-600 whitespace-nowrap">
                      {product.salesCount} terjual
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">
                    {formatCurrency(product.revenue)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default TopProducts;
