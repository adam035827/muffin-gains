import React, { Fragment, useState } from "react";

const UpdateExercise = (props) => {
  const [name, setName] = useState(props.exercise.name);
  const [date, setDate] = useState(props.exercise.last_modified_date);
  const [weight, setWeight] = useState(props.exercise.weight);
  const [reps, setReps] = useState(props.exercise.reps);
  const [sets, setSets] = useState(props.exercise.sets);
  const [isStrength, setIsStrength] = useState(props.exercise.is_strength);

  const archiveBody = {
    exercise_id: props.exercise.exercise_id,
    name: props.exercise.name,
    split_id: props.exercise.split_id,
    date: props.exercise.last_modified_date,
    weight: props.exercise.weight,
    reps: props.exercise.reps,
    sets: props.exercise.sets,
    is_strength: props.exercise.is_strength,
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateBody = {
        weight: weight,
        reps: reps,
        sets: sets,
      };

      const updateResponse = await fetch(
        `/updateExercise/${props.exercise.exercise_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateBody),
        }
      );

      const archiveResponse = await fetch(`/newArchivedExercise`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(archiveBody),
      });

      window.location = `/split/${props.exercise.split_id}`;
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
          disabled={true}
        />
        <input
          type="date"
          className="form-control"
          value={date.substr(0, 10)}
          disabled={true}
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
        <select className="form-control" value={isStrength} disabled={true}>
          <option value="true">Yes</option>
          <option value="false">no</option>
        </select>
        <button className="btn btn-secondary">Update</button>
      </form>
    </Fragment>
  );
};

export default UpdateExercise;
