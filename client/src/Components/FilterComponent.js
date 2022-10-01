import { memo } from "react";
import { Col, Form, Row } from "react-bootstrap";


function FilterComponent({ filerData, filerDataDate, searchByUserName, role }) {
  return (
    <Row className="mt-5">
      <Col sm={2}>
        <div className="input-group date" id="datepicker">
          <input
            type="date"
            className="form-control"
            id="date"
            onChange={(e) => filerDataDate(e.target.value)}
          />
        </div>
      </Col>
      <Col sm={8}></Col>
      <Col sm={2}>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => filerData(e.target.value)}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Onhold">On hold</option>
          <option value="Success">Complete</option>
        </Form.Select>
      </Col>

      {role === "admin" && (
        <Col>
          <div className="input-group mb-3 mt-4">
            <input
              type="search"
              className="form-control"
              placeholder="Search by User name"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => searchByUserName(e.target.value)}
            />
            <span className="input-group-text" id="basic-addon2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </span>
          </div>
        </Col>
      )}
    </Row>
  );
}

export default memo(FilterComponent);
