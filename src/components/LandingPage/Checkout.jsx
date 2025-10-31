/* eslint-disable */
import { Mail, User, Phone, MapPin, FileText } from "lucide-react";

const Checkout = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 pt- md:px-20">

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Informasi Pelanggan</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <User
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Nama"
                  className="w-full border rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Nomor"
                  className="w-full border rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>
            </div>
            <div className="relative mt-4">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Alamat Pengiriman</h2>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Alamat Lengkap *"
                className="w-full border rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Catatan Tambahan</h2>
            <div className="relative">
              <FileText
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <textarea
                placeholder="Catatan (Opsional)"
                className="w-full border rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-orange-400 outline-none h-28 resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="w-full md:w-100 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
          <hr className="my-3" />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
