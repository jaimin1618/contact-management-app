import { configureStore } from "@reduxjs/toolkit";
import ContactSlice from "./ContactSlice";

const AppStore = configureStore({
  reducer: { Contact: ContactSlice.reducer },
});

export default AppStore;
