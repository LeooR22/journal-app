import React from "react";

import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import Sidebar from "../../../components/journal/Sidebar";

import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";

jest.mock("../../../actions/auth", () => ({
  startLogout: jest.fn(),
}));
jest.mock("../../../actions/notes", () => ({
  startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "uyIbiw38PqRcD7B2BfMwHutCIl33",
    name: "Leo",
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: null,
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider>
);

describe("pruebas en <Siedbar/>", () => {
  test("debe de mostrarse Correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("debe de llamar el startLogout", () => {
    wrapper.find("button").prop("onClick")();
    expect(startLogout).toHaveBeenCalled();
  });
  test("debe de llamar el startNewNote", () => {
    wrapper.find(".journal__new-entry").prop("onClick")();
    expect(startNewNote).toHaveBeenCalled();
  });
});
