import { Card, CardBody, CardHeader } from "@heroui/react";
import Chart from "react-apexcharts";
import { useMemo } from "react";

const RevenueChart = ({ data }) => {
  const options = useMemo(() => ({
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: data.map((item) => item.month),
    },
    yaxis: {
      title: {
        text: "Revenue (Rp)",
      },
      labels: {
        formatter: (val) => {
          return new Intl.NumberFormat("id-ID", {
            notation: "compact",
            compactDisplay: "short",
          }).format(val);
        },
      },
    },
    colors: ["#10b981"],
    tooltip: {
      y: {
        formatter: (val) => {
          return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(val);
        },
      },
    },
  }), [data]);

  const series = useMemo(() => [
    {
      name: "Revenue",
      data: data.map((item) => item.revenue),
    },
  ], [data]);

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Grafik Pendapatan</h3>
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
        <h3 className="text-lg font-semibold">Grafik Pendapatan</h3>
      </CardHeader>
      <CardBody>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </CardBody>
    </Card>
  );
};

export default RevenueChart;
