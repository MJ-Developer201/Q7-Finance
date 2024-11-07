import { useEffect, useState, useContext } from "react";
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
  Typography,
  Avatar,
  Alert,
  AlertTitle,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";

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

export default function ProfileCard() {
  const authContext = useContext(AuthContext);
  const apiGatewayUrl = import.meta.env.VITE_API_GATEWAY_URL || "";
  const userId = authContext?.userId;
  const [userData, setUserData] = useState<UserData[]>([]);
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

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

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

  if (!userData.length) {
    return <div>No user data found</div>;
  }

  return (
    <Container sx={{ paddingTop: "5%", paddingBottom: "3%" }}>
      {userData.map((user) => (
        <Card key={user.userId} elevation={1} sx={{ marginBottom: "1rem" }}>
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
                    sx={{
                      width: "80px",
                      height: "80px",
                    }}
                    src={user.avatarUrl || ""}
                  >
                    {user.username ? user.username.charAt(0).toUpperCase() : ""}
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
                <Link to="/profile-form" style={{ textDecoration: "none" }}>
                  <Button variant="contained" name="btnAddMore">
                    Edit Profile
                  </Button>
                </Link>
              </CardActions>
            </Grid>
          </Grid>
          <Divider />
          <CardContent>
            <Grid container spacing={6}>
              <Grid display={"flex"} item xs={12} sm={6}>
                <PersonIcon sx={{ color: "blue" }} />
                <Typography sx={{ paddingLeft: "1rem" }} variant="body1">
                  <b>Username: </b>
                  {user.username}
                </Typography>
              </Grid>
              {user.age && (
                <Grid display={"flex"} item xs={12} sm={6}>
                  <AccessTimeIcon sx={{ color: "green" }} />
                  <Typography sx={{ paddingLeft: "1rem" }} variant="body1">
                    <b>Age: </b>
                    {user.age}
                  </Typography>
                </Grid>
              )}
              {user.bio && (
                <Grid display={"flex"} item xs={12} sm={6}>
                  <FingerprintIcon sx={{ color: "purple" }} />
                  <Typography sx={{ paddingLeft: "1rem" }} variant="body1">
                    <b>Bio: </b>
                    {user.bio}
                    <br />
                  </Typography>
                </Grid>
              )}
              <Grid display={"flex"} item xs={12} sm={6}>
                <MailOutlineIcon sx={{ color: "red" }} />
                <Typography sx={{ paddingLeft: "1rem" }} variant="body1">
                  <b>Email: </b>
                  {user.email}
                </Typography>
              </Grid>
              {user.position && (
                <Grid display={"flex"} item xs={12} sm={6}>
                  <GroupsIcon sx={{ color: "orange" }} />
                  <Typography sx={{ paddingLeft: "1rem" }} variant="body1">
                    <b>Position: </b>
                    {user.position}
                  </Typography>
                </Grid>
              )}
              {user.location && (
                <Grid display={"flex"} item xs={12} sm={6}>
                  <PublicIcon sx={{ color: "teal" }} />
                  <Typography sx={{ paddingLeft: "1rem" }} variant="body1">
                    <b>Location: </b>
                    {user.location}
                  </Typography>
                </Grid>
              )}
              {/* {user.organization && (
                <Grid display={"flex"} item xs={12} sm={6}>
                  <DomainOutlinedIcon sx={{ color: "brown" }} />
                  <Typography sx={{ paddingLeft: "1rem" }} variant="body1">
                    <b>Organization: </b>
                    {user.organization}
                  </Typography>
                </Grid>
              )} */}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
