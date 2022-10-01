import { memo } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function CardComponent({ value, deleteDoc, role, user }) {

  // console.log(role, "role")
  return (
    <Card className="p-4 mt-5">
      <div className="d-flex justify-content-between">
        <div className="p-1">
          <Link
            to={`addtask/${value._id}`}
            className="text-dark"
            style={{ textDecoration: "none", pointer: "cursor" }}
          >
            {role === "admin" && (
              <b style={{ marginRight: "10px" }}>User Name:{user.regis.name}</b>
            )}

            <b>{value.heading}</b>
          </Link>
        </div>

        <div className=" d-flex justify-content-between p-1">
          <div>
            {value.status === "Pending" && (
              <h6 className="text-success">{value.status}</h6>
            )}
            {value.status === "Success" && (
              <h6 className="text-danger">{value.status}</h6>
            )}
            {value.status === "Onhold" && (
              <h6 className="text-warning">{value.status}</h6>
            )}
          </div>
          {role === "user" && (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash-fill text-danger"
                viewBox="0 0 16 16"
                style={{
                  marginLeft: "5px",
                  marginTop: "-5px",
                  cursor: "pointer",
                }}
                onClick={() => deleteDoc(value._id)}
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default memo(CardComponent);
