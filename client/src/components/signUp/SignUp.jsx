import React from "react";
import "./signUp.css";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";

const SignUp = () => {
  const handleGoogleSignUp = async () => {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error signing up:", error);
      return;
    }

    console.log("User:", user);
    console.log("Session:", session);
  };
  return (
    <>
      <section className="signUp mb center signUp-container">
        <div className="container">
          <form className="shadow">
            <h2 className="color">Create an account</h2> Or,&nbsp;
            <Link to="/signIn" style={{ textDecoration: "underline" }}>
              Sign into your account
            </Link>
            <br />
            <br />
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <br />
            <button>Sign Up</button>
            <h4 style={{ color: "gray" }}>
              ------------------------- OR -------------------------
            </h4>
            <br />
            <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
