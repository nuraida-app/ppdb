import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { Fragment } from "react";

const User = () => {
  return (
    <Fragment>
      <Paper sx={{ p: 1 }}>
        <Typography fontWeight="bold">User Info</Typography>
        <form className="user-info">
          <TextField label="Email" />

          <TextField label="Password lama" />

          <TextField label="Password baru" />

          <Box alignSelf="end">
            <Button variant="contained" color="success">
              Update
            </Button>
          </Box>
        </form>
      </Paper>
    </Fragment>
  );
};

export default User;
