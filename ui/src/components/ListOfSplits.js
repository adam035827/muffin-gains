import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const ListOfSplits = () => {
  const [splits, setSplits] = useState([]);

  const deleteSplit = async (id) => {
    try {
      const deleteSplit = await fetch(`/deleteSplit/${id}`, {
        method: "DELETE",
      });

      getSplits();
    } catch (err) {
      console.log(err.message);
    }
  };

  const getSplits = async () => {
    try {
      const response = await fetch(`/getSplits/`);
      const data = await response.json();

      setSplits(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getSplits();
  }, []);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Split</th>
            <th>Select</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {splits.map((split) => (
            <tr key={split.split_id}>
              <td>{split.name}</td>
              <td>
                <NavLink to={`/split/${split.split_id}`}>
                  <button className="btn btn-dark">Select</button>
                </NavLink>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteSplit(split.split_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListOfSplits;
