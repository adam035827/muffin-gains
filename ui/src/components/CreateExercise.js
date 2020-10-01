import React, { Fragment, useState } from "react";

const CreateExercise = (props) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [isStrength, setIsStrength] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        name: name,
        split_id: props.split_id,
        date: date,
        weight: weight,
        reps: reps,
        sets: sets,
        is_strength: isStrength,
      };

      const response = await fetch(`/newExercise`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = `/split/${props.split_id}`;
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
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="date"
          className="form-control"
          value={date.toISOString().substr(0, 10)}
          onChange={(event) => setDate(event.target.value)}
        />
        <input
          type="text"
          className="form-control"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
        />
        <input
          type="text"
          className="form-control"
          value={reps}
          onChange={(event) => setReps(event.target.value)}
        />
        <input
          type="text"
          className="form-control"
          value={sets}
          onChange={(event) => setSets(event.target.value)}
        />
        <select
          className="form-control"
          value={isStrength}
          onChange={(event) => setIsStrength(event.target.value)}
        >
          <option value="true">Yes</option>
          <option value="false">no</option>
        </select>
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default CreateExercise;
