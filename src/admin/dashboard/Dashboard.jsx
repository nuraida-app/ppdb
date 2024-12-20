import React from "react";
import Layout from "../../components/Layout";
import ChartPembayaran from "./ChartPembayaran";
import { useGetDataQuery } from "../../api/services/ApiPembayaran";

const Dashboard = () => {
  const { data } = useGetDataQuery();

  const cards = [
    { label: "Jumlah Pembayaran", value: data?.jml },
    {
      label: "Total Pembayaran",
      value: `Rp ${parseFloat(data?.total).toLocaleString("id-ID")}`,
    },
  ];
  return (
    <Layout title={"Admin - Beranda"}>
      <div className="container d-flex gap-2 mb-2">
        {cards?.map((card, index) => (
          <div key={index} className="card text-white bg-primary">
            <div className="card-body">
              <p className="card-title">{card.label}</p>
              <p className="card-text">{card?.value}</p>
            </div>
          </div>
        ))}
      </div>
      <ChartPembayaran />
    </Layout>
  );
};

export default Dashboard;
