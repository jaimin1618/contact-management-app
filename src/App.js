import "./App.css";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";

// redux
import AppStore from "./store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <div>
      <Provider store={AppStore}>
        <ToastContainer />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
