import { useContext, useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { storage } from "../Components/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserAuthContextApi } from "../Context/UserAuthContext";

function Task() {
  const { id } = useParams();
  const { user } = useContext(UserAuthContextApi);
  const [oneTask, setOneTask] = useState({});
  const [file, setFile] = useState("");
  const [progressBar, setProgressBar] = useState(0);
  const navigate = useNavigate();
  const [dataDoc, setDataDoc] = useState({
    heading: "",
    description: "",
    status: "pending",
    file: ""
  });

  const [h, setH] = useState("");

  const getAllWorks = async () => {
    let result = await fetch(
      `https://todo-work-aman.herokuapp.com/work/${id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${user.token}`,
        },
      }
    );
    result = await result.json();
    setOneTask(result);
    setDataDoc({
      heading: result.heading,
      description: result.description,
      file: result.file,
    });
    // console.log("One", result);
  };

  const updateDoc = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, date);
    const id = oneTask._id;
    // console.log("Id", id);
    let result = await fetch(
      `https://todo-work-aman.herokuapp.com/work/${id}`,
      {
        method: "put",
        body: JSON.stringify(dataDoc),
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${user.token}`,
        },
      }
    );
    result = await result.json();
    navigate("/");
    // console.log("Update", result);
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      // console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
          setProgressBar(progress);
        },
        (error) => {
          // console.log("Upload is", error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("file available at", downloadURL);
            setDataDoc({ ...dataDoc, file: downloadURL });
            setProgressBar(0);
            // setFile((prev)=>({...prev, img:downloadURL}))
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  useEffect(() => {
    getAllWorks();
  }, [id]);

  // console.log("H", dataDoc);
  return (
    <Container>
      <Row>
        <Link to="/" className="mb-5 mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-arrow-left-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
          </svg>
          <span
            style={{ marginLeft: "10px", marginTop: "10px", fontSize: "20px" }}
          >
            Back
          </span>
        </Link>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Col sm={3}></Col>
        <Col sm={6}>
          {" "}
          <Card className="p-4">
            <Form onSubmit={updateDoc}>
              <Form.Group className="mb-3">
                <Form.Label>Heading</Form.Label>
                <Form.Control
                  placeholder={oneTask.heading}
                  value={dataDoc.heading}
                  onChange={(e) =>
                    setDataDoc({ ...dataDoc, heading: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  placeholder={oneTask.description}
                  as="textarea"
                  value={dataDoc.description}
                  onChange={(e) =>
                    setDataDoc({ ...dataDoc, description: e.target.value })
                  }
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Choose file</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <a
                    className="btn btn-primary"
                    style={{ marginTop: "30px", marginLeft: "10px" }}
                    href={dataDoc.file}
                    target="_blank"
                    download
                    rel="noreferrer"
                  >
                    Download
                  </a>
                </Col>
                {progressBar !== 0 && (
                  <ProgressBar now={progressBar} label={`${progressBar}%`} />
                )}
              </Row>
              <div className="d-flex justify-content-between mt-4">
                <div>
                  <Form.Label>Update Status</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) =>
                      setDataDoc({ ...dataDoc, status: e.target.value })
                    }
                  >
                    <option value="Pending">Select</option>
                    <option value="Onhold">On hold</option>
                    <option value="Success">Complete</option>
                  </Form.Select>
                </div>
              </div>
              <div className="d-grid gap-2 mt-4">
                <button className="btn btn-primary" type="submit">
                  {"Update Task"}
                </button>
              </div>
            </Form>
          </Card>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
  );
}

export default Task;
