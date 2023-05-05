import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../function/auth";

const AdminRoutes = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token)
      currentAdmin(user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          console.log("Admin Route Err: ", err);
          setOk(false);
        });
  }, [user]);

  return ok ? <>{children}</> : <LoadingToRedirect />;
};

export default AdminRoutes;
