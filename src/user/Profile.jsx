import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Layout from "../components/layout/Layout";
import {
  Box,
  Button,
  Divider,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "./styles.css";
import User from "./User";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useSelector } from "react-redux";
import { useGetFormQuery } from "../api/service/formApi";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const { data: profile } = useGetFormQuery(user?.id, { skip: !user?.id });

  const photo = profile?.berkas?.find((item) => item["Foto"])?.Foto;

  const boxRef = useRef();
  return (
    <Layout>
      <Grid2 container>
        <Grid2 item size={{ xs: 12, md: 8 }} sx={{ p: 2 }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <ReactToPrint
              trigger={() => (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<LocalPrintshopIcon />}
                >
                  Print
                </Button>
              )}
              content={() => boxRef.current}
            />
          </Box>
          <Paper
            ref={boxRef}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              px: 2,
              py: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <img
                src="/nibs.png"
                style={{ width: 80, height: 80, objectFit: "cover" }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" fontSize={14}>
                  YAYASAN IZZATUL MUHSININ
                </Typography>
                <Typography variant="subtitle1" fontSize={12}>
                  NURAIDA ISLAMIC BOARDING SCHOOL
                </Typography>
                <Typography variant="subtitle2" fontSize={10}>
                  Membina Generasi Rabbani, Berpertasi Menuju Ridho Ilahi
                </Typography>
                <Typography variant="body2" fontSize={8}>
                  Jl Guru Mukhtar No 01 Rt 03 Rw 03 Kp Petir Kel Cimahpar Kec
                  Bogor Utara Kota Bogor
                </Typography>
              </Box>
            </Box>
            <Divider />

            <Typography variant="subtitle1" fontWeight="bold" fontSize={14}>
              {`Kode Pendaftaran: ${profile?.kode_pendaftaran}`}
            </Typography>

            <Typography variant="subtitle1" fontWeight="bold" fontSize={14}>
              Data Diri
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                p: 1,
              }}
            >
              <Table className="custom-table">
                <tbody>
                  <tr>
                    <td style={{ width: "150px" }}>Jenjang</td>
                    <td align="center" style={{ width: "30px" }}>
                      :
                    </td>
                    <td>{profile?.jenjang}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "150px" }}>Nama</td>
                    <td align="center" style={{ width: "30px" }}>
                      :
                    </td>
                    <td>{profile?.nama}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "150px" }}>Tempat Tanggal Lahir</td>
                    <td align="center" style={{ width: "30px" }}>
                      :
                    </td>
                    <td>{profile?.tempat_lahir}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "150px" }}>Jenis Kelamin</td>
                    <td align="center" style={{ width: "30px" }}>
                      :
                    </td>
                    <td>
                      {profile?.kelamin === "f" ? "Perempuan" : "Laki Laki"}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "150px" }}>Agama</td>
                    <td align="center" style={{ width: "30px" }}>
                      :
                    </td>
                    <td>{profile?.agama}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "150px" }}>Anak Ke</td>
                    <td align="center" style={{ width: "30px" }}>
                      :
                    </td>
                    <td>{profile?.anak_ke}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "150px" }}>Jumlah Saudara</td>
                    <td align="center" style={{ width: "30px" }}>
                      :
                    </td>
                    <td>{profile?.jml_saudara}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "150px" }}>No Akta Lahir</td>
                    <td align="center" style={{ width: "30px" }}>
                      :
                    </td>
                    <td>{profile?.no_akta}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "150px" }}>No KK</td>
                    <td align="center" style={{ width: "30px" }}>
                      :
                    </td>
                    <td>{profile?.no_kk}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "150px" }}>NIK</td>
                    <td align="center" style={{ width: "30px" }}>
                      :
                    </td>
                    <td>{profile?.nik}</td>
                  </tr>

                  <tr>
                    <td style={{ width: "150px" }}>NISN</td>
                    <td align="center" style={{ width: "30px" }}>
                      :
                    </td>
                    <td>{profile?.nisn}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "150px" }}>Tinggi Badan</td>
                    <td align="center" style={{ width: "30px" }}>
                      :
                    </td>
                    <td>{profile?.tinggi} cm</td>
                  </tr>
                  <tr>
                    <td style={{ width: "150px" }}>Berat Badan</td>
                    <td align="center" style={{ width: "30px" }}>
                      :
                    </td>
                    <td>{profile?.berat} kg</td>
                  </tr>

                  <tr>
                    <td style={{ width: "150px" }}>Lingkar Kepala</td>
                    <td align="center" style={{ width: "30px" }}>
                      :
                    </td>
                    <td>{profile?.kepala} cm</td>
                  </tr>
                </tbody>
              </Table>

              <img
                src={photo}
                style={{ width: "150px", height: "152px", objectFit: "cover" }}
              />
            </Box>

            <Typography variant="subtitle1" fontWeight="bold" fontSize={14}>
              Alamat
            </Typography>
            <Box sx={{ p: 1 }}>
              <Grid2 container>
                <Grid2 item size={{ xs: 6, md: 6 }} sx={{ p: 1 }}>
                  <Table className="custom-table">
                    <tbody>
                      <tr>
                        <td style={{ width: "150px" }}>Provinsi</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.provinsi}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Kota / Kabupaten</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.regional}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Kecamatan</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.kecamatan}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Desa / Kelurahan</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.desa}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Rw / Rt</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.rt_rw}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Grid2>
                <Grid2 item size={{ xs: 6, md: 6 }} sx={{ p: 1 }}>
                  <Table className="custom-table">
                    <tbody>
                      <tr>
                        <td style={{ width: "150px" }}>Alamat</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.alamat}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Kode Pos</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.kode_pos}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Jarak Ke Sekolah</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.jarak} km</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Menit Ke Sekolah</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.menit} menit</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Transportasi</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.transportasi}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Grid2>
              </Grid2>
            </Box>

            <Typography variant="subtitle1" fontWeight="bold" fontSize={14}>
              Data Orang Tua
            </Typography>
            <Box sx={{ p: 1 }}>
              <Grid2 container>
                <Grid2 item size={{ xs: 6, md: 6 }} sx={{ p: 1 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    fontSize={14}
                  >
                    Ayah
                  </Typography>
                  <Table className="custom-table">
                    <tbody>
                      <tr>
                        <td style={{ width: "150px" }}>NIK</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.nik_ayah}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Nama</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.nama_ayah}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Tempat Tanggal Lahir</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{`${profile?.lahir_ayah}, ${new Date(
                          profile?.tanggal_ayah
                        ).toLocaleDateString("id-ID")}`}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Pendidikan</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.pendidikan_ayah}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Pekerjaan</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.pekerjaan_ayah}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Penghasilan</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{`Rp ${profile?.penghasilan_ayah}`}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>No Tlp</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.tlp_ayah}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Grid2>
                <Grid2 item size={{ xs: 6, md: 6 }} sx={{ p: 1 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    fontSize={14}
                  >
                    Ibu
                  </Typography>
                  <Table className="custom-table">
                    <tbody>
                      <tr>
                        <td style={{ width: "150px" }}>NIK</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.nik_ibu}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Nama</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.nama_ibu}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Tempat Tanggal Lahir</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{`${profile?.lahir_ibu}, ${new Date(
                          profile?.tanggal_ibu
                        ).toLocaleDateString("id-ID")}`}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Pendidikan</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.pendidikan_ibu}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Pekerjaan</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.pekerjaan_ibu}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Penghasilan</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{`Rp ${profile?.penghasilan_ibu}`}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>No Tlp</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.tlp_ibu}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Grid2>
              </Grid2>
            </Box>

            <Typography variant="subtitle1" fontWeight="bold" fontSize={14}>
              Lainnya
            </Typography>
            <Paper sx={{ p: 1 }}>
              <Grid2 container>
                <Grid2 item size={{ xs: 6, md: 6 }} sx={{ p: 1 }}>
                  <Typography
                    ariant="subtitle1"
                    fontWeight="bold"
                    fontSize={14}
                  >
                    Sekolah Asal
                  </Typography>
                  <Table className="custom-table">
                    <tbody>
                      <tr>
                        <td style={{ width: "150px" }}>NPSN</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.npsn}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Nama Sekolah</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.nama_sekolah}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Provinsi</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.provinsi_sekolah}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Kota / Kabupaten</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.regional_sekolah}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Kecamatan</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.kec_sekolah}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "150px" }}>Desa / Kelurahan</td>
                        <td align="center" style={{ width: "30px" }}>
                          :
                        </td>
                        <td>{profile?.desa_sekolah}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Grid2>
              </Grid2>
            </Paper>
          </Paper>
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 4 }} sx={{ p: 2 }}>
          <User />
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default Profile;
