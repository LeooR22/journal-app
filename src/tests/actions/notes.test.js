/**
 * @jest-environment node
 */

import * as fs from "fs";

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import {
  startLoadingNotes,
  startNewNote,
  startSaveNotes,
  startUploading,
} from "../../actions/notes";
import { db } from "../../firebase/firebase-config";
import types from "../../types/types";
import { fileUpload } from "../../helpers/fileUpload";

jest.mock("../../helpers/fileUpload", () => ({
  fileUpload: jest.fn(() => {
    return "asdasdas";
  }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "TESTING",
  },
};

let store = mockStore(initState);

describe("Pruebas con las acciones de notes", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("debe de crear una nueva nota startNewNote", async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();
    // console.log(actions);

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    //docId .... action.... payload... id
    //await ...... db...... doc("")...... delete()

    const docId = actions[0].payload.id;
    await db.doc(`/TESTING/journal/notes/${docId}`).delete();
  });

  test("startLoadingNotes debe cargar las notas", async () => {
    await store.dispatch(startLoadingNotes("TESTING"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test("startSavedNote debe de actualizar la nota", async () => {
    const note = {
      id: "3tkTMJjpxA1CFWOVmbUu",
      title: "titulo",
      body: "body",
    };

    await store.dispatch(startSaveNotes(note));

    const actions = store.getActions();
    // console.log(actions);

    expect(actions[0].type).toBe(types.notesUpdated);

    const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();

    expect(docRef.data().title).toBe(note.title);
  });

  // PASAR DEPENDECIAS A VERSION DEL CURSO

  // test("startUploading debe de actualizar el url del entry", async () => {
  //   fs.writeFileSync("foto.jpg", "");
  //   const file = fs.readFileSync("foto.jpg");
  //   await store.dispatch(startUploading(file));

  //   const docRef = await db
  //     .doc("/TESTING/journal/notes/XGi93phl5NTi66Csvce0")
  //     .get();
  //   expect(docRef.data().url).toBe("https://hola-mundo.com/cosa.jpg");
  // });
});
