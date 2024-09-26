import {
  Box,
  Button,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import {
  useAddAppNameMutation,
  useGetAppQuery,
} from "../../api/service/appApi";
import { toast } from "react-toastify";
import Admin from "./Admin";

const kopDefault = "https://dummyimage.com/700x120/000/fff.png";
const logoCap = "https://dummyimage.com/150x150/000/fff.png";

const Setting = () => {
  const [addAppName, { data, isLoading, error, isSuccess, reset }] =
    useAddAppNameMutation();
  const { data: app } = useGetAppQuery();

  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null); // State for logo image
  const [logoPreview, setLogoPreview] = useState(null); // State for logo image preview
  const [cap, setCap] = useState(null); // State for cap image
  const [capPreview, setCapPreview] = useState(null); // State for cap image preview
  const [kop, setKop] = useState(null); // State for kop image
  const [kopPreview, setKopPreview] = useState(null); // State for kop image preview

  const appHandler = (e) => {
    e.preventDefault();

    // Create a FormData object to send both text and file data
    const formData = new FormData();
    formData.append("name", name);
    if (logo) formData.append("logo", logo); // Append logo image to the form
    if (cap) formData.append("cap", cap); // Append cap image to the form
    if (kop) formData.append("kop_surat", kop); // Append kop image to the form

    // Call the mutation function with the formData
    addAppName(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    if (app) {
      setName(app?.nama);
      setLogo(app?.logo);
      setCap(app?.cap);
      setKop(app?.kop_surat);
    }
  }, [app]);

  // Handle file input changes and set preview images
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file)); // Set the preview for the selected logo
  };

  const handleCapChange = (e) => {
    const file = e.target.files[0];
    setCap(file);
    setCapPreview(URL.createObjectURL(file)); // Set the preview for the selected cap
  };

  const handleKopChange = (e) => {
    const file = e.target.files[0];
    setKop(file);
    setKopPreview(URL.createObjectURL(file)); // Set the preview for the selected kop
  };

  return (
    <Layout>
      <Grid2 container>
        <Grid2 item size={{ xs: 12, md: 6 }} sx={{ px: 1 }}>
          <Paper
            sx={{ p: 1, display: "flex", gap: 2, flexDirection: "column" }}
          >
            <Typography variant="h6" fontWeight="bold">
              Pengaturan
            </Typography>
            <form
              onSubmit={appHandler}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <TextField
                label="Nama Aplikasi"
                placeholder="Nama Aplikasi"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />

              {/* Logo Upload */}
              <Grid2 container>
                <Grid2
                  item
                  size={{ xs: 12, md: 6 }}
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <img
                    src={logoPreview ? logoPreview : logo ? logo : logoCap}
                    alt="logo"
                    style={{ width: 150, height: 150, objectFit: "cover" }}
                  />

                  <Button
                    variant="contained"
                    component="label"
                    sx={{ width: 150 }}
                  >
                    Logo
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleLogoChange} // Store and preview selected logo file
                    />
                  </Button>
                </Grid2>

                {/* Cap Upload */}
                <Grid2
                  item
                  size={{ xs: 12, md: 6 }}
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <img
                    src={capPreview ? capPreview : cap ? cap : logoCap}
                    alt="cap"
                    style={{ width: 150, height: 150, objectFit: "cover" }}
                  />

                  <Button
                    variant="contained"
                    component="label"
                    sx={{ width: 150 }}
                  >
                    Cap
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleCapChange} // Store and preview selected cap file
                    />
                  </Button>
                </Grid2>
              </Grid2>

              {/* Kop Upload */}
              <Grid2
                item
                size={{ xs: 12 }}
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <img
                  src={kopPreview ? kopPreview : kop ? kop : kopDefault}
                  alt="kop"
                  style={{ width: "100%", objectFit: "cover" }}
                />
                <Button variant="contained" component="label" fullWidth>
                  Kop Surat
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleKopChange} // Store and preview selected kop file
                  />
                </Button>
              </Grid2>

              {/* Submit Button */}
              <Box align="end">
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={isLoading}
                >
                  Simpan
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 6 }} sx={{ px: 1 }}>
          <Admin />
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default Setting;
