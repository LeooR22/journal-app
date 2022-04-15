import React from "react";
import { useSelector } from "react-redux";
import NoteScreen from "../notes/NoteScreen";
import Sidebar from "./Sidebar";
import NothinSelected from "./NothinSelected";

const JournalScreen = () => {
  const { active } = useSelector((state) => state.notes);

  // const notes from state.notes removed

  return (
    <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
      <Sidebar />

      <main>{active ? <NoteScreen /> : <NothinSelected />}</main>
    </div>
  );
};

export default JournalScreen;
