import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import {
  login,
  logout,
  startLoginEmailPassword,
  startLogout,
} from "../../actions/auth";
import types from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe("pruebas con las acciones de auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("login y logout de crear la accion respectiva", () => {
    const uid = "ABC123";
    const displayName = "Fernando";

    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName,
      },
    });
    expect(logoutAction).toEqual({
      type: types.logout,
    });
  });

  test("debe de realizar el startLogout", async () => {
    await store.dispatch(startLogout());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.logout,
    });

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
    });
  });

  test("debe de iniciar el startLoginWithEmailAndPassword", async () => {
    await store.dispatch(startLoginEmailPassword("test@testing.com", "123456"));

    const actions = store.getActions();
    // console.log(actions);
    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: "uyIbiw38PqRcD7B2BfMwHutCIl33",
        displayName: null,
      },
    });
  });
});
