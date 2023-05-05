import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink
} from "firebase/auth";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../function/auth"

const RegisterComplete = () => {
  
  const navigate = useNavigate();
  const [email, setemail] = useState();
  const dispatch = useDispatch();


  useEffect(() => {
    setemail(window.localStorage.getItem("emailForSignIn"));
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
        
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then( async (result) => {
          console.log("result", result); // udemy data of user
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          const { user } = result;
          const idTokenResult = user.getIdTokenResult();
          await createOrUpdateUser((await idTokenResult).token)
        .then( async (res) => {

          // dispatch is used to display data in redux
          dispatch({
            type:'LOGGD_IN_USER',
            payload:{
                name: res.data.name,
                email: res.data.email,
                token: (await idTokenResult).token,
                role: res.data.role,
                _id: res.data._id,
            }
            })
        })
        .catch((err) => console.log("error of token: ", err));

          navigate("/")
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          const errorCode = error.code;
            const errorMessage = error.message;
            toast(
              `Error Code : ${errorCode}, Error Message: ${errorMessage}`)
        });




    }
  };

  const completeRegistrationForm = () => (
    <form>
      <input
        type="email"
        className="form-control border-0 border-bottom border border-2"
        value={email}
        onChange={(e) => {
            setemail(e.target.value);
          }}
        disabled
      />
      <br />
      <button
        type="submit"
        className="btn btn-raised border border-1"
        onClick={handleSubmit}
      >
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h4>Register Complete</h4>
        {completeRegistrationForm()}
      </div>
    </div>
    <ToastContainer />
  </div>
  );
};
export default RegisterComplete;
