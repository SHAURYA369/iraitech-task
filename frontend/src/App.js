import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import ProfileCard from "./components/profileCard/profileCard";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.common = {
  "Content-Type": "application/json",
};

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<ProfileCard />} />
        <Route
          path="/auth/login"
          element={
            <AppContainer>
              <AccountBox />
            </AppContainer>
          }
        />
        <Route path="/" element={<Navigate replace to="/profile" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
