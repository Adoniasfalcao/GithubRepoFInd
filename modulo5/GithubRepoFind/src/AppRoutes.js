import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Repository from "./pages/Repository/Repository";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={Main} />
        <Route path="/repository" Component={Repository} />
      </Routes>
    </BrowserRouter>
  );
}
