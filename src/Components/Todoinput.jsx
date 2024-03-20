import React from "react";
import { useState } from "react";

const Todoinput = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [to, setTo] = useState("");
  const [dateVal, setDateVal] = useState("")

  function handleChange(event) {
    setTitle(event.target.value);
  }

  function handleSelect(event){
    setTo(event.target.value);
  }

  function handleDate(event){
    setDateVal(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="enter title"
        value={title}
        onChange={handleChange}
      />
   

      <select value={to} style={{marginLeft:"16px"}} onChange={handleSelect}>
        <option value="">Select to</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
      <input type="date" style={{marginLeft:"16px"}} value={dateVal} onChange={handleDate}/>

      <button style={{marginLeft:"16px"}}
        onClick={() => {
          addTodo(title,to,dateVal), setTitle(""),setTo(""),setDateVal("");
        }}
      >
        Add
      </button>
    </div>
  );
};

export default Todoinput;
