import types from "../../types/types";

describe("Pruebas en types", () => {
  const typesDefault = {
    login: "[Auth] Login",
    logout: "[Auth] Logout",
    ////
    uiSetError: "[UI] Set Error",
    uiRemoveError: "[UI] Remove Error",
    ////
    uiStartLoading: "[UI] Start Loading",
    uiFinishLoading: "[UI] Finish Loading",
    //
    notesAddNew: "[Notes] New note",
    notesActive: "[Notes] Set active note",
    notesLoad: "[Notes] Load notes",
    notesUpdated: "[Notes] Update note ",
    notesFileUrl: "[Notes] Update image url",
    notesDelete: "[Notes] Delete note",
    notesLogoutCleaning: "[Notes] Logout Cleaning",
  };

  test("debe de tener todo los tipos por default", () => {
    expect(typesDefault).toEqual(types);
  });
});
