import React, { useEffect, useState } from "react";

const Alert = ({ close, className, message }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Aktifkan animasi saat komponen dimount
    setActive(true);

    // Timer untuk otomatis menutup alert
    const timer = setTimeout(() => {
      setActive(false); // Nonaktifkan animasi
      setTimeout(close, 500); // Tunggu hingga animasi selesai, lalu panggil close
    }, 2000);

    return () => clearTimeout(timer); // Bersihkan timer jika komponen di-unmount
  }, [close]);

  return (
    <div
      className={`position-fixed top-0 end-0 me-4 mt-5`}
      style={{
        zIndex: 1060,
      }}
    >
      <div
        className={`alert ${className} alert-slide-in ${
          active ? "active" : ""
        } m-0`}
        role="alert"
      >
        {message}
      </div>
    </div>
  );
};

export default Alert;
