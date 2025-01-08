import React from "react";

const InputCustom = ({ label, value, width }) => {
  return (
    <div style={{ width: width }} className="input-group input-group-sm">
      <span style={{ width: 125 }} className="input-group-text">
        {label}
      </span>
      <input
        type="text"
        className="form-control"
        aria-label={label}
        readOnly
        value={value || ""}
      />
    </div>
  );
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? "Invalid Date"
    : date.toLocaleDateString("id-ID");
};

const Formulir = ({ data }) => {
  return (
    <div className="container d-flex flex-column gap-3">
      <div className="d-flex flex-wrap justify-content-between gap-2">
        <InputCustom label="Kode Pendaftaran" value={data?.kode_pendaftaran} />
        <InputCustom label="Tahun Pelajaran" value={data?.tapel} />
        <InputCustom label="Jenjang" value={data?.jenjang} />
        <InputCustom label="Sekolah" value={data?.sekolah} />
      </div>

      <p className="h5">Data Diri</p>

      <div className="d-flex flex-column gap-1">
        <InputCustom label="Nama" value={data?.nama} />
        <InputCustom label="Tempat Lahir" value={data?.tempat_lahir} />
        <InputCustom
          label="Tanggal Lahir"
          value={formatDate(data?.tanggal_lahir)}
        />
        <InputCustom
          label="Jenis Kelamin"
          value={data?.kelamin === "f" ? "Perempuan" : "Laki Laki"}
        />
        <InputCustom label="Agama" value={data?.agama} />
        <InputCustom label="Anak ke" value={data?.anak_ke} />
        <InputCustom label="Jlm Saudara" value={data?.jml_saudara} />
        <InputCustom label="No Akta Lahir" value={data?.no_akta} />
        <InputCustom label="No KK" value={data?.no_kk} />
        <InputCustom label="NIK" value={data?.nik} />
        <InputCustom label="NISN" value={data?.nisn} />
        <InputCustom label="TB" value={data?.tinggi} />
        <InputCustom label="BB" value={data?.berat} />
        <InputCustom label="Lingkar Kepala" value={data?.kepala} />
      </div>

      <p className="h5">Data Orang Tua</p>

      <div className="row">
        <div className="col-lg-6 col-12">
          <div className="d-flex flex-column gap-1 align-items-start">
            <InputCustom label="NIK" value={data?.nik_ayah} />
            <InputCustom label="Nama" value={data?.nama_ayah} />

            <InputCustom label="Tempat Lahir" value={data?.lahir_ayah} />
            <InputCustom
              label="Tanggal Lahir"
              value={formatDate(data?.tanggal_ayah)}
            />
            <InputCustom label="Pendidikan" value={data?.pendidikan_ayah} />
            <InputCustom label="Pekerjaan" value={data?.pekerjaan_ayah} />

            <InputCustom label="No Tlp" value={data?.tlp_ayah} />
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div className="d-flex flex-column gap-1 align-items-start">
            <InputCustom label="NIK" value={data?.nik_ibu} />
            <InputCustom label="Nama" value={data?.nama_ibu} />

            <InputCustom label="Tempat Lahir" value={data?.lahir_ibu} />
            <InputCustom
              label="Tanggal Lahir"
              value={formatDate(data?.tanggal_ibu)}
            />
            <InputCustom label="Pendidikan" value={data?.pendidikan_ibu} />
            <InputCustom label="Pekerjaan" value={data?.pekerjaan_ibu} />

            <InputCustom label="No Tlp" value={data?.tlp_ibu} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulir;
