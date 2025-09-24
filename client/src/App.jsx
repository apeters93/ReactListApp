import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./pages/List.jsx";
import Tree from "./pages/Tree.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<div> HOME PAGE </div>} />
        <Route path="/list" element={<List />} />
        <Route path="/tree" element={<Tree />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
