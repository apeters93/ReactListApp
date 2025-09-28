import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./pages/List.jsx";
import Tree from "./pages/Tree.jsx";
import Interview from "./pages/Interview.jsx";
import Table from "./pages/Table.jsx";
// import SITickets from "./pages/SITickets.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<div> HOME PAGE </div>} />
        <Route path="/list" element={<List />} />
        <Route path="/tree" element={<Tree />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/table" element={<Table />} />
        {/* <Route path="/sitickets" element={<SITickets />} /> */}
        <Route path="*" element={<div>404 NOT FOUND</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
