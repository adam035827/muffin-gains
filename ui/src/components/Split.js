import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

const Split = () => {
  let params = useParams();

  const [exercises, setExercises] = useState([]);

  const getExercises = async () => {
    try {
      const response = await fetch(`/getExercises/${params.split_id}`);
      const data = await response.json();
      console.log(data);

      setExercises(data);
      console.log(exercises);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Weight</th>
            <th>Reps</th>
            <th>Sets</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise.exercise_id}>
              <td>{exercise.name}</td>
              <td>
                {moment(exercise.last_modified_date).format("MM/DD/YYYY")}
              </td>
              <td>{exercise.weight}</td>
              <td>{exercise.reps}</td>
              <td>{exercise.sets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Split;
