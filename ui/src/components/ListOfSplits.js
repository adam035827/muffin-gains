import React, { Fragment, useEffect, useState } from "react";

const ListOfSplits = () => {
  const [splits, setSplits] = useState([]);

  const getSplits = async () => {
    try {
      const response = await fetch("/getSplits/");
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
            <td>Split</td>
            <td>User Id</td>
          </tr>
        </thead>
        <tbody>
          {splits.map((split) => (
            <tr>
              <td>{split.split_id}</td>
              <td>{split.name}</td>
              <td>{split.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListOfSplits;
