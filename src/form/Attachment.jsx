import {
  Box,
  Button,
  CircularProgress,
  Input,
  Table,
  TableBody,
  TableCell,
  TableRow,
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

  const pdfMimeType = "application/pdf";
  const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const selectedFile = files[0];

    if (name === "Foto") {
      if (!imageMimeTypes.includes(selectedFile.type)) {
        toast.error("Pastikan file jpg dan png");
        setFiles((prevFiles) => ({ ...prevFiles, Foto: null }));
        return;
      }
    } else if (selectedFile.type !== pdfMimeType) {
      toast.error("Pastikan file PDF");
      setFiles((prevFiles) => ({ ...prevFiles, [name]: null }));
      return;
    }

    setFiles((prevFiles) => ({ ...prevFiles, [name]: selectedFile }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });

    uploadFiles(formData);
  };

  const deleteHandler = (id) => {
    deleteFile(id);
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
  }, [isSuccess, error, data, reset]);

  useEffect(() => {
    if (delSuccess) {
      toast.success(delMsg.message);
      delReset();
    }

    if (delError) {
      toast.error(delError.data.message);
      delReset();
    }
  }, [delSuccess, delMsg, delError, delReset]);

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
              const file = userFiles?.find((f) => f.file_name === field.name);

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
                          onClick={() => deleteHandler(file?.id)}
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
                          href={file.file_link}
                          target="_blank"
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
