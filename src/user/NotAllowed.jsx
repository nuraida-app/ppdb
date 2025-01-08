import React from "react";

const NotAllowed = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-3">
      <p className="h4">Pembayaran belum dikonfirmasi</p>
      <div style={{ height: 450, width: 450 }}>
        <img
          src="/404.jpg"
          alt="not allowed"
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default NotAllowed;
