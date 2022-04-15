import React from "react";

import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import NoteScreen from "../../../components/notes/NoteScreen";

import { activeNote, startDeleting } from "../../../actions/notes";

jest.mock("../../../actions/notes", () => ({
  activeNote: jest.fn(),
  startDeleting: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "12",
    name: "Leo",
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: 1234,
      title: "hola",
      body: "mundo",
      date: 0,
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>
);

describe("pruebas en <NoteScreen/>", () => {
  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de disparar el active note", () => {
    wrapper.find("input[name='title']").simulate("change", {
      target: {
        name: "title",
        value: "Hola de nuevo",
      },
    });

    expect(activeNote).toHaveBeenLastCalledWith(1234, {
      body: "mundo",
      title: "Hola de nuevo",
      id: 1234,
      date: 0,
    });
  });
});
