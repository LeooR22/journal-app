import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { startSaveNotes, startUploading } from "../../actions/notes";

const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);

  const handleSaveNote = () => {
    dispatch(startSaveNotes(note));
  };

  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };

  return (
    <div className="notes__appbar">
      <span>28 de agosto 2020</span>

      <input
        id="fileSelector"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div>
        <button className="btn" onClick={handlePictureClick}>
          Picture
        </button>
        <button className="btn" onClick={handleSaveNote}>
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesAppBar;
