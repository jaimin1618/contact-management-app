import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ContactSlice = createSlice({
  name: "Contact",
  initialState: initialState,
  reducers: {
    addContact: function (state, action) {
      const newContact = action.payload;
      state.push(newContact);

      return state.sort((a, b) => a.id < b.id);
    },
    saveContact: function (state, action) {
      const newState = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );

      state = newState;
      return state;
    },
    removeContact: function (state, action) {
      const id = action.payload;
      state = state.filter((c) => c.id !== id && c);
      return state;
    },
  },
});

// export slice/reducers & actions
export default ContactSlice;
export const ContactActions = ContactSlice.actions;
