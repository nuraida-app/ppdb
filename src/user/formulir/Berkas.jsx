import React, { useEffect, useRef } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { useMyPaymentQuery } from "../../api/services/ApiPembayaran";
import NotAllowed from "../NotAllowed";
import {
  useGetFormQuery,
  useUploadFileMutation,
} from "../../api/services/ApiFrom";
import { toast } from "react-toastify";

const labels = [
  { label: "Kartu keluarga", name: "KK" },
  { label: "Akta Kelahiran", name: "Akta" },
  { label: "KTP Ayah", name: "Ayah" },
  { label: "KTP Ibu", name: "Ibu" },
  { label: "Ijazah / SKL", name: "IJSKL" },
  { label: "Rapot", name: "Rapot" },
  { label: "Foto", name: "Foto" },
];

const Berkas = () => {
  const { user } = useSelector((state) => state.user);
  const { data } = useMyPaymentQuery(user?.id, { skip: !user?.id });
  const { data: rowData } = useGetFormQuery(user?.id, { skip: !user?.id });
  const documents = rowData?.documents;

  const [uploadFile, { data: msg, isSuccess, isLoading, error, reset }] =
    useUploadFileMutation();

  const inputRefs = useRef({});

  const handleFileChange = async (event, name) => {
    const file = event.target.files[0];

    if (file) {
      // Validasi tipe file
      const validFileType =
        name === "Foto"
          ? ["image/jpeg", "image/png", "image/jpg"]
          : ["application/pdf"];
      const maxFileSize = name === "Foto" ? 4 * 1024 * 1024 : 10 * 1024 * 1024; // 4MB untuk Foto, 10MB untuk Rapot dan lainnya

      if (!validFileType.includes(file.type) || file.size > maxFileSize) {
        toast.error("File tidak sesuai");
        return;
      }

      const formData = new FormData();
      formData.append(name, file);
      formData.append("name", name);

      uploadFile(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg.message);
      reset();

      Object.keys(inputRefs.current).forEach((key) => {
        if (inputRefs.current[key]) {
          inputRefs.current[key].value = ""; // Reset value to clear file input
        }
      });
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [msg, isSuccess, error]);

  const openFile = (link) => {
    window.open(link, "_blank");
  };

  return (
    <Layout>
      <div className="container d-flex flex-column py-2 border-bottom mb-3">
        <h5 className="m-0">Upload Berkas</h5>
        <p className="text-secondary fst-italic">
          Pastikan berkas yang diupload sesuai dengan ketentuan <br />
          Semua file <strong>WAJIB SCAN PDF</strong>, Foto{" "}
          <strong>JPG / JPEG / PNG</strong>
        </p>
        <p className="text-secondary fst-italic">
          {`Foto 3x4 (max 4mb), SMP (Latar Merah Berseragam SD), SMA (Latar Biru Berseragam SMP)`}
        </p>
      </div>

      <div className="container d-flex flex-wrap gap-2 my-3">
        {labels.map((item, index) => {
          const doc = documents?.find((file) => file.file_name === item.name);
          return (
            <button
              key={index}
              className={`btn ${doc ? "btn-success" : "btn-danger"}`}
              onClick={() => openFile(doc.file_link)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {data?.ket ? (
        <div className="container d-flex flex-column gap-2">
          {labels.map((item, index) => (
            <div key={index}>
              <label htmlFor="kk" className="form-label">
                {item.label}
              </label>
              <input
                type="file"
                className="form-control"
                ref={(el) => (inputRefs.current[item.name] = el)}
                id={item.name}
                name={item.name}
                onChange={(e) => handleFileChange(e, item.name)}
              />
            </div>
          ))}
        </div>
      ) : (
        <NotAllowed />
      )}
    </Layout>
  );
};

export default Berkas;
