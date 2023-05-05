import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form>
    <div className="row form-group">
      <div className="col-12">
        <label className="text-secondary my-1 col-12" style={{ fontSize: ".8rem" }}>Name</label>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-11">
            <input
              className="form-control my-2"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoFocus
              required
              style={{fontSize: ".8rem"}}
            ></input>
          </div>
          <div className="col-1 d-flex align-items-center">
            <button
              className="btn btn-outline-primary my-1"
              onClick={handleSubmit}
              style={{fontSize: ".9rem"}}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
);

export default CategoryForm;
