import React from "react";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then((cred) => {
        firestore
          .collection("users")
          .doc(cred.user.uid)
          .set({ userType: "disposer" });
        history.push("/todos");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const history = useHistory();
  return (
    <div>
      <h1>Sign In</h1>

      <button
        onClick={(event) => {
          event.preventDefault();
          signInWithGoogle();
        }}
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default SignIn;
