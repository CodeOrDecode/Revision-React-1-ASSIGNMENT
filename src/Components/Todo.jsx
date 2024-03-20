import React from "react";
import Todoinput from "./Todoinput";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Todoitem from "./Todoitem";

const Todo = () => {
  const [alltodo, setAlltodo] = useState(null);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState(null);
  const [updatetitle, setUpdatetitle] = useState("");
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [assignval, setAssignval] = useState("Assign To");
  const [pending, setPending] = useState(0);
  const [complete, setComplete] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dateval, setDateval] = useState("date");
  const [dateshow, setDateshow] = useState(false);
  const [datelogic, setDatelogic] = useState("");

  let secretUrl = import.meta.env.VITE_BASE_URL;


  const handleDateUpdate=async(val)=>{
    setDateshow(false);
    let obj = { date: datelogic };
    try {
      await axios({
        method: "patch",
        baseURL: secretUrl,
        url: `/todos/${val}`,
        data: obj,
      });
      getAllData();
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDate = async (event) => {
    setDateval(event.target.value);

    try {
      let { data } = await axios({
        method: "get",
        baseURL: `${secretUrl}`,
        url: `/todos`,
      });
      // console.log(data);
      let ascdata;
      if (event.target.value == "asc") {
        setVisible(false);
        ascdata = data.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        setAlltodo(ascdata);
      } else if (event.target.value == "desc") {
        setVisible(false);
        ascdata = data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setAlltodo(ascdata);
      } else {
        getAllData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllData = async () => {
    setVisible(true);
    setAssignval("Assign To");
    try {
      let { data } = await axios({
        method: "get",
        baseURL: `${secretUrl}`,
        url: `/todos?_page=${page}&_per_page=2`,
      });
      // console.log(data);
      setAlltodo(data.data);
      setTotalpage(data.pages);
      getFilterData2();
      getFilterData3();
    } catch (error) {
      console.log(error);
    }
  };

  const getFilterData2 = async () => {
    try {
      let { data } = await axios({
        method: "get",
        baseURL: `${secretUrl}`,
        url: `/todos?_page=${page}&_per_page=2`,
      });
      let pen = data.data.filter((ele) => {
        if (ele.status === false) {
          return ele;
        }
      });

      setPending(pen.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getFilterData3 = async () => {
    try {
      let { data } = await axios({
        method: "get",
        baseURL: `${secretUrl}`,
        url: `/todos?_page=${page}&_per_page=2`,
      });
      let pen = data.data.filter((ele) => {
        if (ele.status === true) {
          return ele;
        }
      });

      setComplete(pen.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getFilterData = async (val) => {
    try {
      let { data } = await axios({
        method: "get",
        baseURL: `${secretUrl}`,
        url: `/todos?assign=${val}`,
      });
      setVisible(false);
      setAlltodo(data);
      getPenA(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPenA = (data) => {
    console.log(data);
    let pen = 0;
    let com = 0;
    data.forEach((ele) => {
      if (ele.status === false) {
        pen = pen + 1;
      } else {
        com = com + 1;
      }
    });
    setPending(pen);
    setComplete(com);
  };

  const getpendorcompleted = async (val) => {
    try {
      let completedData;
      let { data } = await axios({
        method: "get",
        baseURL: `${secretUrl}`,
        url: `/todos`,
      });
      console.log(data);
      setVisible(false);
      if (val === "Pending") {
        completedData = data.filter((ele) => {
          if (ele.status == false) {
            return ele;
          }
        });
        setPending(completedData.length);
        setComplete(0);
      } else {
        completedData = data.filter((ele) => {
          if (ele.status == true) {
            return ele;
          }
        });
        setPending(0);
        setComplete(completedData.length);
      }

      setAlltodo(completedData);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (value, value2, value3) => {
    let obj = {
      title: value,
      status: false,
      assign: value2,
      date: value3,
    };
    try {
      await axios({
        method: "post",
        baseURL: secretUrl,
        url: "/todos",
        data: obj,
      });
      getAllData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios({
        method: "delete",
        baseURL: secretUrl,
        url: `/todos/${id}`,
      });
      getAllData();
    } catch (error) {
      console.log(error);
    }
  };

  const updatetodo = async (id, status) => {
    let obj = { status: !status };
    try {
      await axios({
        method: "patch",
        baseURL: secretUrl,
        url: `/todos/${id}`,
        data: obj,
      });
      getAllData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTitleUpdate = async (val) => {
    let obj = { title: updatetitle };
    try {
      await axios({
        method: "patch",
        baseURL: secretUrl,
        url: `/todos/${val}`,
        data: obj,
      });
      getAllData();
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssign = async (val, val2) => {
    let obj = { assign: val };
    try {
      await axios({
        method: "patch",
        baseURL: secretUrl,
        url: `/todos/${val2}`,
        data: obj,
      });
      getAllData();
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrev = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  function titleUpdate(value, val2) {
    setShow(true);
    setUpdatetitle(value);
    setId(val2);
  }

  function dateUpdate1(value, val2) {
    dateshownow();
    setDatelogic(value);
    setId(val2);
  }
  function dateshownow(){
    setDateshow(true);
  }

  function handleTitleChange(event) {
    setUpdatetitle(event.target.value);
  }

  function handleFilter1(val) {
    setAssignval(val);
    if (val === "A" || val === "B" || val === "C") {
      getFilterData(val);
    } else if (val === "Pending" || val === "Completed") {
      getpendorcompleted(val);
    } else {
      setVisible(true);
      getAllData();
    }
  }

  function handleDateOne(event) {
    setDatelogic(event.target.value);
  }

  useEffect(() => {
    getAllData();
  }, [page]);

  return (
    <div>
      <Todoinput addTodo={addTodo} />

      {show && (
        <input
          type="text"
          style={{ marginTop: "25px" }}
          placeholder="update title"
          value={updatetitle}
          onChange={handleTitleChange}
        />
      )}

      {show && (
        <button
          onClick={() => {
            handleTitleUpdate(id);
          }}
        >
          Update
        </button>
      )}

      {dateshow && <input
        type="date"
        value={datelogic}
        style={{ marginTop: "16px" }}
        onChange={handleDateOne}
      />}

      {dateshow && <button style={{ marginLeft: "16px" }} onClick={()=>{handleDateUpdate(id)}}>Update Date</button>}

      <h3>Complete is : {complete}</h3>
      <h3>Pending is : {pending}</h3>

      <select
        value={assignval}
        style={{ marginTop: "16px" }}
        onChange={(e) => {
          handleFilter1(e.target.value);
        }}
      >
        <option value="Assign To">Assign To - </option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        style={{ marginLeft: "16px" }}
        value={dateval}
        onChange={handleDate}
      >
        <option value="date">Date</option>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>

      {alltodo &&
        alltodo.map((ele, index) => {
          return (
            <Todoitem
              key={ele.id}
              {...ele}
              deleteTodo={deleteTodo}
              updatetodo={updatetodo}
              titleUpdate={titleUpdate}
              handleAssign={handleAssign}
              dateUpdate1={dateUpdate1}
            />
          );
        })}

      {visible && (
        <button onClick={handlePrev} disabled={page === 1}>
          Prev
        </button>
      )}
      {visible && <button>{page}</button>}
      {visible && (
        <button onClick={handleNext} disabled={page === totalpage}>
          Next
        </button>
      )}
    </div>
  );
};

export default Todo;
