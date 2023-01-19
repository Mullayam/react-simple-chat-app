import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainForm = () => {
  const pushTo = useNavigate();
  const [getData, setgetData] = useState({ name: "", chatroom: "" });
  const [error, seterror] = useState("");
  const onChange = (e) => {
    setgetData({
      ...getData,
      [e.target.name]: e.target.value,
    });
  };
  const validation = () => {
    if (!getData.name) {
      seterror("Please Enter Name First");
      return false;
    }
    if (!getData.chatroom) {
      seterror("Please Select Chat Room");
      return false;
        
    }
    seterror("");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validation();
    if (isValid) {
      pushTo(`/chat/${getData.chatroom}`, { state: getData });
    }
     
  };
  return (
    <div className="px-3 py-4 shadow bg-white text-dark border rounded  m-2">
      <form className="form-group mb-4" onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <h2 className="text-warning mb-5">Talk</h2>
          {error ? <p class="form-text text-danger">{error}</p> : ""}
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={onChange}
            placeholder="Enter Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="chatroom" className="form-label">
            Rooms
          </label>
          <select
            className="form-select form-select-lg"
            onChange={onChange}
            name="chatroom"
          defaultValue=""
          >
            <option value="" selected>
              Select one
            </option>
            <option value="gaming">Gaming</option>
            <option value="coding">Coding</option>
            <option value="socialmedia">Social Media</option>
          </select>
        </div>
        <button type="submit" className="btn btn-outline-warning">
          Login
        </button>
      </form>
    </div>
  );
};

export default MainForm;
