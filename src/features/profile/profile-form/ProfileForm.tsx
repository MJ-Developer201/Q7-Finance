import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../App";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  Avatar,
  Alert,
  AlertTitle,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import DomainOutlinedIcon from "@mui/icons-material/DomainOutlined";

interface UserData {
  userId: string;
  username: string;
  age?: string;
  bio?: string;
  email: string;
  position?: string;
  location?: string;
  organization?: string;
  avatarUrl?: string;
}

export default function ProfileForm() {
  const authContext = useContext(AuthContext);
  const apiGatewayUrl = import.meta.env.VITE_API_GATEWAY_URL || "";
  const userId = authContext?.userId;
  const [userData, setUserData] = useState<UserData>({
    userId: "",
    username: "",
    age: "",
    bio: "",
    email: "",
    position: "",
    location: "",
    organization: "",
    avatarUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(`Fetching data for userId: ${userId}`);
        const response = await axios.get(`${apiGatewayUrl}/profile/${userId}`);
        console.log("API response:", response.data);
        setUserData(response.data);
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiGatewayUrl}/profile`, userData);
      console.log("API response:", response.data);
      setShowAlert(true);
    } catch (error: any) {
      console.error("Error submitting user data:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error && showAlert) {
    return (
      <Alert severity="error" onClose={() => setShowAlert(false)}>
        <AlertTitle>Error</AlertTitle>
        Error fetching user data: {error}
      </Alert>
    );
  }

  return (
    <Container sx={{ paddingTop: "5%", paddingBottom: "3%" }}>
      <form onSubmit={handleSubmit}>
        <Card elevation={1} sx={{ marginBottom: "1rem" }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ padding: "0.3rem" }}
          >
            <Grid>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ width: "80px", height: "80px" }}
                    src={userData.avatarUrl || ""}
                  >
                    {userData.username
                      ? userData.username.charAt(0).toUpperCase()
                      : ""}
                  </Avatar>
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <CardActions>
                <Button variant="contained" type="submit" name="btnSubmit">
                  Save Profile
                </Button>
              </CardActions>
            </Grid>
          </Grid>
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <PersonIcon sx={{ color: "blue", marginRight: "0.5rem" }} />
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <AccessTimeIcon
                    sx={{ color: "green", marginRight: "0.5rem" }}
                  />
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    value={userData.age}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <FingerprintIcon
                    sx={{ color: "purple", marginRight: "0.5rem" }}
                  />
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={userData.bio}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <MailOutlineIcon
                    sx={{ color: "red", marginRight: "0.5rem" }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <GroupsIcon sx={{ color: "orange", marginRight: "0.5rem" }} />
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    value={userData.position}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <PublicIcon sx={{ color: "teal", marginRight: "0.5rem" }} />
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={userData.location}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
}
