import "./App.css";
import Sidebar from "./global/components/Sidebar";
import Homepage from "./pages/components/Homepage";
import ProfilePage from "./pages/components/ProfilePage";
import ProfileFormPage from "./pages/components/ProfileFormPage";
import { Routes, Route } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import { SignOutProvider } from "./global/context/SignOutContext";
import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import theme from "./global/theme/muiTheme";
import { Container, ThemeProvider } from "@mui/material";

Amplify.configure(awsExports);

// Define the AuthContext with inferred types
interface AuthContextType {
  username: string;
  userId: string;
  signInDetails: any;
}

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
// Create the AuthContext
export const AuthContext = createContext<AuthContextType | null>(null);
export const ProfileContext = createContext<UserData | null>(null);

function App({ signOut }: { signOut: () => void; user: any }) {
  const [authState, setAuthState] = useState<AuthContextType | null>(null);
  const [profileState, setProfileState] = useState<UserData | null>(null);

  // Fetch the current user on mount
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const { username, userId, signInDetails } = await getCurrentUser();
        // console.log(`The username: ${username}`);
        // console.log(`The userId: ${userId}`);
        // console.log(`The signInDetails: ${signInDetails?.loginId}`);
        setAuthState({ username, userId, signInDetails });
      } catch (err) {
        console.log(err);
      }
    }

    fetchCurrentUser();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <ProfileContext.Provider value={profileState}>
            <SignOutProvider signOut={signOut}>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile-form" element={<ProfileFormPage />} />
              </Routes>
              {/* <button onClick={signOut}>Sign out</button> */}
            </SignOutProvider>
          </ProfileContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>
    </Container>
  );
}

export default withAuthenticator(App);
