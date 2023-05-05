import { React } from "react";
import AdminNav from "../../components/nav/AdminNav";

const AdminDashboard = () => {
  return (
    <>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col">
            <h5 className="mb-3">Admin Dashoboard</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
