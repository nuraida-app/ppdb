import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Editor from "./Editor";
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
} from "../../api/service/postApi";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import { toast } from "react-toastify";

const columns = [
  { label: "No", width: 80 },
  { label: "Konten", width: 100 },
  { label: "Aksi", width: 120 },
];

const createMarkup = (html) => {
  return { __html: html };
};

const TitutionFee = () => {
  const category = "pembayaran";
  const [postId, setPostId] = useState("");

  const { data: posts } = useGetPostsQuery(category);
  const { data: post } = useGetPostQuery(postId, { skip: !postId });

  console.log(post);
  const [addPost, { data, isSuccess, error, isLoading, reset }] =
    useAddPostMutation();
  const [
    deletePost,
    {
      data: delMsg,
      isSuccess: delSuccess,
      error: delError,
      isLoading: delLoading,
    },
  ] = useDeletePostMutation();

  const [value, setValue] = useState("");

  const submitHandler = () => {
    const data = {
      category,
      value,
      id: postId ? postId : null,
    };

    addPost(data);
  };

  const deleteHandler = (id) => {
    const data = { id, category };
    deletePost(data);
  };

  useEffect(() => {
    if (post) {
      setValue(post?.teks);
    }
  }, [post]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setValue("");
      setPostId("");
      reset();
    }

    if (error) {
      reset();
      toast.error(error.data.message);
    }
  }, [isSuccess, error, data]);

  useEffect(() => {
    if (delSuccess) {
      toast.success(delMsg.message);
    }

    if (delError) {
      toast.error(delError.data.message);
    }
  }, [delSuccess, delError, delMsg]);

  return (
    <Layout>
      <Paper sx={{ p: 1, mb: 1 }}>
        <Typography fontWeight="bold" variant="h6">
          Informasi Pembayaran
        </Typography>
      </Paper>

      <Grid2 container>
        <Grid2 item size={{ xs: 12, md: 8 }}>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((item, index) => (
                      <TableCell
                        key={index}
                        align="center"
                        sx={{ minWidth: item.width }}
                      >
                        {item.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts?.map((post, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell>
                        <Box
                          dangerouslySetInnerHTML={createMarkup(post.teks)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="warning"
                          onClick={() => setPostId(post.id)}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => deleteHandler(post.id)}
                        >
                          {delLoading ? (
                            <CircularProgress size={24} />
                          ) : (
                            <DoNotDisturbOnOutlinedIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid2>

        <Grid2 item size={{ xs: 12, md: 4 }} sx={{ px: 2 }}>
          <Editor
            placeholder="Ketik Di Sini..."
            value={value}
            onChange={(html) => setValue(html)}
          />

          <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
            <Button variant="contained" color="success" onClick={submitHandler}>
              {isLoading ? <CircularProgress size={24} /> : "Simpan"}
            </Button>
          </Box>
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default TitutionFee;
