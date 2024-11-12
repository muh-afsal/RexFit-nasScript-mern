/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser  } from '../../redux/actions/authActions.js'; 
import AuthNavbar from "../../components/navbars/AuthNavbar";
import gymworkoutImage from "../../../src/assets/images/gymWorkoutingBoys.jpg";


// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate()


  const handleSubmit = async (values) => {
    console.log('login started');
    
    setIsLoading(true);
    try {
      const response=await dispatch(loginUser (values)).unwrap();
      if (response.success) {
        const role = response.user.role;
        
        if (role === 'member') {
          navigate('/member');
        } else if (role === 'trainer') {
          navigate('/trainer');
        } else if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/login');
        }
      } else {
        setLoginError('Some error occurred while logging in!');
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(error)

    } finally {
      setIsLoading(false);
    }
  };

  // const handleGoogleLogin = async (credentialResponse) => {
  //   setIsLoading(true);
  //   try {
  //     const result= await dispatch(
  //       googleLogin({ id_token: credentialResponse.credential })
  //     ).unwrap();

  //     if (result.success) {
  //       const role = result.user.role;

  //       if (role === "member") {
  //         navigate("/member");
  //       } else if (role === "trainer") {
  //         navigate("/trainer");
  //       } else if (role === "admin") {
  //         navigate("/admin");
  //       } else {
  //         navigate("/signup");
  //       }
  //     } else {
  //       setLoginError("Some error occurred while signup!");
  //     }
  //   } catch (error) {
  //     console.error("Google Login failed:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <AuthNavbar />
      <div className="w-full h-screen pt-[60px] flex justify-center items-center bg--500 dark:bg-dark-bg dark:text-dark-text "
        style={{
          backgroundImage: `url(${gymworkoutImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="w-full h-full flex justify-center pb-4 items-center flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-black dark:opacity-70 opacity-40"></div>
          <div className="flex flex-col items-center p-7 lg:p-9 rounded-xl dark:bg-neutral-500/10 bg-neutral-100/10 backdrop-blur-lg ">
            <div className="flex flex-col bg--400 justify-center items-center text-center p-4 mb-4">
              <h1 className="mb-2 font-extrabold text-2xl lg:text-3xl">
                Welcome to <span className="text-rex-green">RexFit</span>,
              </h1>
              <h1 className="mb-2 font-extrabold text-2xl lg:text-3xl">
                Sign In to get Started.
              </h1>
              <h4 className="text-gray-400 text-sm">
                Enter your details to proceed further
              </h4>
            </div>
            {loginError && (
                      <div className="text-red-500 text-sm mt-2 mb-4">
                        {loginError}
                      </div>
                    )}

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="flex w-[100%] md:w-[400px] flex-col justify-center items-center text-center gap-4">
                  <div className="w-full">
                    <Field
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="bg-slate-100 p-2 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border border-gray-200 focus:border-blue-200 focus:outline-none focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm flex justify-start"
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="bg-slate-100 p-2 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border border-gray-200 focus:border-blue-200 focus:outline-none focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm flex justify-start"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-rex-green text-black font-bold p-2 rounded-lg hover:opacity-95 disabled:opacity-80 mt-4 w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Log in"}
                  </button>

                  <div>
                    <p className="text-blue-500 dark:to-blue-400 hover:cursor-pointer text-sm font-medium">
                      Forgot password?
                    </p>
                  </div>

                  {/* <p className="text-white">or</p>

                  <div className="flex justify-center w-full">
                    <GoogleLogin
                      onSuccess={handleGoogleLogin}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                      size="large"
                      shape="circle"
                      width="300"
                    />
                  </div> */}
                </Form>
              )}
            </Formik>

            <p className="mt-5 text-sm font-semibold text-white dark:text-white">
              Don't have an Account
              <Link to="/signup">
                <span className="text-blue-400 dark-links"> Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;