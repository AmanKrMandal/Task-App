import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CardComponent from "../Components/CardComponent";
import FilterComponent from "../Components/FilterComponent";
import { UserAuthContextApi } from "../Context/UserAuthContext";

function Admin() {
  const { user } = useContext(UserAuthContextApi);
  const navigate = useNavigate();
  const [tastData, setTaskData] = useState([]);
  const [tastData1, setTaskData1] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const logoutHandle = () => {
    navigate("/login");
    localStorage.clear();
  };

  useEffect(() => {
    if (!user.regis) {
      navigate("/login");
    }
    // if (user.regis.role === "user") {
    //   return navigate("/");
    // }
  }, [navigate, user.regis, user]);

  const getAllWorks = async () => {
    let result = await fetch("https://aman-task-apps.onrender.com/works", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${user.token}`,
      },
    });
    result = await result.json();
    setTaskData(result);
  };
  useEffect(() => {
    getAllWorks();
  }, []);

  const deleteDoc = async (id) => {
    // console.log("idd", id);
    let result = await fetch(
      `https://aman-task-apps.onrender.com/work/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${user.token}`,
        },
      }
    );
    result = await result.json();
    window.location.reload();
    // console.log("Delete", result);
  };

  const filerData = (data) => {
    // console.log("Data", data);
    if (data === "") {
      const result = tastData.filter((value) => value);
      if (result.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
      setTaskData1(result);
      // console.log("filerData", result);
    } else {
      const result = tastData.filter((value) => value.status === data);
      if (result.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
      setTaskData1(result);
      // console.log("filerData", result);
    }
  };

  const filerDataDate = (data) => {
    // console.log("Data", data);

    const resultByDate = tastData.filter((value) => value.date === data);
    if (resultByDate.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    setTaskData1(resultByDate);
    // console.log("resultByDate", resultByDate);
  };

  const searchByUserName = (searchInput) => {
    const result = tastData.filter(
      (value) => value.username === searchInput
    );
    setTaskData1(result)
    // console.log("Admin search", result);
  };

   if (user.regis?.role === "user") {
      return navigate("/");
    }
  // console.log("User", user);
  // console.log("tastData", tastData);
  // console.log("tastData1", tastData1);
  return (
    <>
      <div className="d-flex justify-content-around bg-dark text-white p-2">
        <div className="mt-2 text-white">Task App</div>
        <button className="btn btn-danger" type="submit" onClick={logoutHandle}>
          Log out
        </button>
      </div>
      <Container>
        <Row>
          <FilterComponent
            filerData={filerData}
            filerDataDate={filerDataDate}
            searchByUserName={searchByUserName}
            role={ user.regis?.role}
          />
          <Col>
            {tastData.length === 0 && (
              <h1 className="text-center m-5">Not Data found</h1>
            )}
            <h1 className="text-center mt-5">{tastData.result}</h1>
            {notFound && <h1>No result found</h1>}
            {tastData1.length === 0 ? (
              <>
                {tastData.result !== "No result found" && (
                  <>
                    {notFound === false &&
                      tastData.map((value) => {
                        return (
                          <CardComponent
                            key={value._id}
                            value={value}
                            deleteDoc={deleteDoc}
                            user={user}
                          />
                        );
                      })}
                  </>
                )}
              </>
            ) : (
              <>
                {notFound === true && <h1>No result found</h1>}
                {notFound === false &&
                  tastData1.map((value) => {
                    return <CardComponent key={value._id} value={value} />;
                  })}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Admin;
