import React from "react";
import "./signIn.css";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";

const SignIn = () => {
  const handleGoogleSignIn = async () => {
    const { user, data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error signing in:", error);
      return;
    }

    console.log("User:", data);
    console.log("Session:", user);
  };

  return (
    <>
      <section className="signIn mb center signIn-container">
        <div className="container">
          <form className="shadow">
            <h2 className="color">Sign into your account</h2> Or,&nbsp;
            <Link to="/signUp" style={{ textDecoration: "underline" }}>
              Create an account
            </Link>
            <br />
            <br />
            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <Link to="/signUp" style={{ textDecoration: "underline" }}>
              Forgot your password?
            </Link>
            <br />
            <br />
            <button>Sign In</button>
            <br />
            <h4 style={{ color: "gray" }}>
              ------------------------- OR -------------------------
            </h4>
            <br />
            <button onClick={handleGoogleSignIn}>Sign In with Google</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignIn;
