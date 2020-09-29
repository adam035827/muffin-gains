import React, { Fragment, useState } from "react";

const CreateSplit = () => {
  const [split, setSplit] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        name: split,
        user_id: 0,
      };

      const response = await fetch(`/newSplit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <form className="d-flex mt-5" onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          value={split}
          onChange={(event) => setSplit(event.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default CreateSplit;
