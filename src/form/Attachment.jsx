import {
  Box,
  Button,
  CircularProgress,
  Input,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useDeleteFileMutation,
  useGetFilesQuery,
  useUploadFilesMutation,
} from "../api/service/formApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Attachment = () => {
  const { user } = useSelector((state) => state.user);
  const { data: userFiles } = useGetFilesQuery(user?.id, { skip: !user?.id });
  const [uploadFiles, { data, isSuccess, isLoading, error, reset }] =
    useUploadFilesMutation();
  const [
    deleteFile,
    {
      data: delMsg,
      isSuccess: delSuccess,
      error: delError,
      isLoading: delLoading,
      reset: delReset,
    },
  ] = useDeleteFileMutation();

  const [files, setFiles] = useState({
    KK: null,
    Akta: null,
    Ayah: null,
    Ibu: null,
    IJSKL: null,
    Foto: null,
    Rapot: null,
  });

  // Allowed file types
  const pdfMimeType = "application/pdf";
  const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

  // Handle file changes with type validation
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const selectedFile = files[0];

    // Validate file type
    if (name === "Foto") {
      // Allow only image files for Foto
      if (!imageMimeTypes.includes(selectedFile.type)) {
        toast.error("pastikan file jpg dan png");
        setFiles({
          Foto: null,
        });
        return;
      }
    } else {
      // Allow only PDF for all other fields
      if (selectedFile.type !== pdfMimeType) {
        toast.error("Pastikan file PDF");
        setFiles({
          KK: null,
          Akta: null,
          Ayah: null,
          Ibu: null,
          IJSKL: null,
          Foto: null,
          Rapot: null,
        });
        return;
      }
    }

    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: selectedFile, // Set the selected file for each input
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append each file to formData if it exists
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });

    uploadFiles(formData);
  };

  const deleteHandler = (fileKey) => {
    deleteFile({ userId: user?.id, fileKey });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
      setFiles({
        KK: null,
        Akta: null,
        Ayah: null,
        Ibu: null,
        IJSKL: null,
        Foto: null,
        Rapot: null,
      });
    }

    if (error) {
      toast.error(error.data.message);
      console.log(error);
    }
  }, [isSuccess, error, data]);

  useEffect(() => {
    if (delSuccess) {
      toast.success(delMsg.message);
      delReset();
    }

    if (delError) {
      toast.error(delError.data.message);
      delReset();
    }
  }, [delSuccess, delMsg, delError]);

  return (
    <Box sx={{ mt: 1 }}>
      <form onSubmit={handleSubmit} className="formulir">
        <Table>
          <TableBody>
            {[
              { label: "Kartu Keluarga", name: "KK" },
              { label: "Akta Kelahiran", name: "Akta" },
              { label: "KTP Ayah", name: "Ayah" },
              { label: "KTP Ibu", name: "Ibu" },
              { label: "Ijazah / SKL", name: "IJSKL" },
              { label: "Foto", name: "Foto" },
              { label: "Rapot", name: "Rapot" },
            ].map((field) => {
              const file = userFiles?.find((f) => f[field.name]);

              return (
                <TableRow key={field.name}>
                  <TableCell sx={{ width: 200 }}> {field.label}</TableCell>
                  <TableCell align="center" sx={{ width: 20 }}>
                    :
                  </TableCell>
                  <TableCell>
                    {file ? (
                      <Box>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ mr: 2 }}
                          onClick={() => deleteHandler(field.name)}
                        >
                          {delLoading ? (
                            <CircularProgress size={24} />
                          ) : (
                            "Hapus"
                          )}
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          href={file[field.name]} // Use the correct file link here
                          target="_blank" // Open in a new tab
                          rel="noopener noreferrer"
                        >
                          Link
                        </Button>
                      </Box>
                    ) : (
                      <Input
                        type="file"
                        name={field.name}
                        accept={
                          field.name === "Foto" ? "image/*" : "application/pdf"
                        }
                        onChange={handleFileChange}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Box alignSelf="end" sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ textTransform: "none" }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Simpan"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Attachment;
