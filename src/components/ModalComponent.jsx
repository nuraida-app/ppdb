import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Modal } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const ModalComponent = ({
  id,
  title,
  children,
  isSuccess,
  data,
  error,
  reset,
}) => {
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);

      const modal = document.getElementById(id);
      if (modal) {
        const bootstrapModal = Modal.getInstance(modal) || new Modal(modal);
        bootstrapModal.hide();
      }
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    const modal = document.getElementById(id);

    if (modal) {
      modal.addEventListener("hidden.bs.modal", () => {
        // Pastikan modal benar-benar dihapus
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.remove();
        }

        document.body.classList.remove("modal-open"); // Hapus kelas modal-open dari body
        document.body.style = ""; // Reset style dari body
      });
    }

    return () => {
      if (modal) {
        modal.removeEventListener("hidden.bs.modal", () => {});
      }
    };
  }, [data, isSuccess, error]);

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
