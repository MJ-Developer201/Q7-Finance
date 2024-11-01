import "./App.css";
import Sidebar from "./global/components/Sidebar";
import Homepage from "./pages/components/Homepage";
import ProfilePage from "./pages/components/ProfilePage";
import { Routes, Route } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import { SignOutProvider } from "./global/context/SignOutContext";

Amplify.configure(awsExports);

function App({ signOut }: { signOut: () => void; user: any }) {
  return (
    <SignOutProvider signOut={signOut}>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      {/* <button onClick={signOut}>Sign out</button> */}
    </SignOutProvider>
  );
}

export default withAuthenticator(App);
