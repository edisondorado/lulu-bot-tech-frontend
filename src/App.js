import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import ProfileAdmin from "./components/ProfileAdmin";
import ProfileLeader from "./components/ProfileLeader";
import Forbidden from "./components/Forbidden";
import Admins from "./components/Admins";
import Archive from "./components/Archive";
import Leaders from "./components/Leaders";
import LeadersArchive from "./components/LeadersArchive";
import Blacklist from "./components/Blacklist";
import DownloadTools from "./components/DownloadTools";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/download/tools" element={<DownloadTools />} />
        <Route path="/blacklist" element={<Blacklist />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/profile/admin/:id" element={<ProfileAdmin />} />
        <Route path="/profile/leader/:id" element={<ProfileLeader />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/admins/archive" element={<Archive />} />
        <Route path="/leaders/" element={<Leaders />} />
        <Route path="/leaders/archive" element={<LeadersArchive />} />
      </Routes>
    </>
  );
}

export default App;
