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
  /**
   * Routes
   * /add
   * /edit/:id
   * /
   *
   *
   */

  return (
    <div>
      <Provider store={AppStore}>
        <ToastContainer />
        <Nav />
        <Routes>
          <Route path="/contact-management-app" element={<Home />} />
          <Route path="/contact-management-app/add" element={<AddContact />} />
          <Route
            path="/contact-management-app/edit/:id"
            element={<EditContact />}
          />
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
