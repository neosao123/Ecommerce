import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firbaseAuthh from "../../firebase";
import { Button } from "antd";
import { AudioMutedOutlined, MailOutlined } from "@ant-design/icons";
import { GoogleOutlined } from "@ant-design/icons";
import authh from "../../firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { linkWithCredential, EmailAuthProvider } from "firebase/auth";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import axios from "axios";
import { async } from "@firebase/util";
import { createOrUpdateUser } from "../../function/auth";
import { currentUser } from "../../function/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));
  console.log("user in login", user);

  useEffect(() => {
    const intended = location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) navigate("/");
    }
  }, [user, navigate]);

  const roleBasedRedirect = (res) => {
    // check if intented
    const intended = location.state;
    if (intended) {
      console.log(intended);
      navigate(`/${intended.from}`);
    } else {
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/history");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    //console.table(email,password);

    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      // url: "http://localhost:3000/login/complete",
      // This must be true.
      handleCodeInApp: true,
    };

    try {
      sendSignInLinkToEmail(firbaseAuthh, email, actionCodeSettings)
        .then(() => {
          // console.log("okkkkkkkkk");
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem("emailForSignIn", email);
          // ...
          toast.success(
            `Verifcation Link has been sent to your ${email}. Please check your inbox & click the link to complete the sign-up process`
          );
          setEmail("");
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(
            `Error Code : ${errorCode}, Error Message: ${errorMessage}`
          );
          setLoading(false);
          // ...
        });
    } catch (error) {
      console.log("error----", error);
    }
  };

  const googleLogin = async () => {
    signInWithPopup(authh, provider).then(async (result) => {
      const { user } = result;
      const idTokenResult = user.getIdTokenResult();
      const token_val = idTokenResult.token;
      await createOrUpdateUser((await idTokenResult).token)
        .then(async (res) => {
          // dispatch is used to display data in redux

          dispatch({
            type: "LOGGD_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: (await idTokenResult).token,
              role: res.data.role,
              _id: res.data._id,
            },
          });

          roleBasedRedirect(res);
        })
        .catch((err) => console.log("error of token: ", err));
    });
  };

  const loginForm = () => (
    <form>
      <input
        type="email"
        className="form-control border-0 border-bottom border border-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        autoFocus
      />

      <br />
      {/* <input
        type="password"
        className="form-control border-0 border-bottom border border-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your Password"
        
      /> */}
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="middle"
        // disabled={(!email || password.length < 6)}
      >
        Login with Email
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>
          {loginForm()}

          <Button
            onClick={googleLogin}
            type="primary"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="middle"
          >
            Login with Google
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Login;
