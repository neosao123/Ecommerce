import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firbaseAuthh from "../../firebase";




const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "http://localhost:3000/registe/complete",
      // This must be true.
      handleCodeInApp: true
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


  const registerForm = () => (
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
      <button
        type="submit"
        className="btn btn-raised border border-1"
        onClick={handleSubmit}
      >
        {loading ? (
          <span>
            <FontAwesomeIcon icon={faSpinner} /> wait..
          </span>
        ) : (
          <span>Register</span>
        )}
      </button>
    </form>
  );

  return (
    // <div>
    //   <h1>Sign In</h1>
    //   <div className="App">
    //     <br />
    //     <br />
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       onChange={(e) => {
    //         setEmail(e.target.value);
    //       }}
    //     ></input>
    //     <br />
    //     <br />

    //     <button onClick={signup}>Sign-up</button>
    //   </div>
    // </div>

     <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
      <ToastContainer
        // toastStyle={{ backgroundColor: "#292727", color: "#fff5f5" }}
      />
    </div>
  );
};
export default Register;
