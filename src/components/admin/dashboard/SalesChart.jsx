import { Card, CardBody, CardHeader } from "@heroui/react";
import Chart from "react-apexcharts";
import { useMemo } from "react";

const SalesChart = ({ data }) => {
  const options = useMemo(() => ({
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: data.map((item) => item.month),
    },
    yaxis: {
      title: {
        text: "Penjualan",
      },
    },
    colors: ["#F8B259"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} transaksi`,
      },
    },
  }), [data]);

  const series = useMemo(() => [
    {
      name: "Penjualan",
      data: data.map((item) => item.sales),
    },
  ], [data]);

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Grafik Penjualan</h3>
        </CardHeader>
        <CardBody>
          <div className="h-[350px] flex items-center justify-center">
            <p className="text-gray-500">Tidak ada data</p>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Grafik Penjualan</h3>
      </CardHeader>
      <CardBody>
        <Chart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </CardBody>
    </Card>
  );
};

export default SalesChart;
