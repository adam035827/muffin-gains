import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import CreateExercise from "./CreateExercise";
import UpdateExercise from "./UpdateExercise";

const Split = () => {
  let params = useParams();

  const [exercises, setExercises] = useState([]);

  const getExercises = async () => {
    try {
      const response = await fetch(`/getExercises/${params.split_id}`);
      const data = await response.json();

      setExercises(data);
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
            <th>Is For Strength</th>
          </tr>
        </thead>
      </table>
      {exercises.map((exercise) => (
        <UpdateExercise exercise={exercise}></UpdateExercise>
      ))}
      <CreateExercise split_id={params.split_id}></CreateExercise>
    </Fragment>
  );
};

export default Split;
