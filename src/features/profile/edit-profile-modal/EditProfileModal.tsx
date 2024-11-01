import React, { ChangeEvent, useState } from "react";
import { Modal, Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useUpdateProfile } from "../api/profileCrud";

interface EditProfileModalProps {
  open: boolean;
  handleClose: () => void;
  data: {
    id: string;
    username: string;
    age: number;
    bio: string;
    email: string;
    position: string;
    location: string;
    avatarUrl: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  handleClose,
  data,
  handleChange,
}) => {
  const [formData, setFormData] = useState(data);
  const updateProfileMutation = useUpdateProfile();

  const handleSubmit = () => {
    updateProfileMutation.mutate(formData, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    handleChange(e);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Edit Profile
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;
