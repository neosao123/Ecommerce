import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  } from "../../function/category";
import { LoadingOutlined } from "@ant-design/icons";
import { getSubs } from "../../function/sub";

function SubList() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        className="col-2 btn btn-outline-primary btn-sm fst-italic p-2 m-3 categoryBtn"
      >
        <Link className="text-decoration-none" to={`/sub/${s.slug}`}>{s.name}</Link>
      </div>
    ));

  return (
    <>
      <div className="container mb-3">
        <div className="row">
          {loading ? <LoadingOutlined /> : showSubs()}
        </div>
      </div>
    </>
  );
}

export default SubList;
