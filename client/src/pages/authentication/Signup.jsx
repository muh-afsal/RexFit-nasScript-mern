import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../../redux/actions/authActions";
import OtpModal from "../../components/common/OtpEntry";
import AuthNavbar from "../../components/navbars/AuthNavbar";
import gymworkoutImage from "../../../src/assets/images/gymWorkoutingBoys.jpg";

// Validation schema
const validationSchema = Yup.object({
  role: Yup.string().required("Please select a user type"),
  username: Yup.string()
    .trim()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .trim()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupData, setSignupData] = useState(null);
  const navigate = useNavigate();
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setIsLoading(true);

      const signupData = {
        Username: values.username,
        email: values.email,
        password: values.password,
        role: values.role,
      };

      const result = await dispatch(signupUser(signupData)).unwrap();

      if (result.success && result.message === "OTP sent to your email") {
        setEmailForOtp(result.emailUsedForOTP);
        setSignupData(signupData);
        setOtpModalVisible(true);
      } else {
        console.log("some error occured while sending otp!");
      }

      resetForm();
    } catch (error) {
      console.error("Signup Error:", error);
      setSignupError(error);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };


  // const handleGoogleLogin = async (credentialResponse) => {
  //   setIsLoading(true);
  //   const { credential } = credentialResponse;
  //   console.log(credential,'kkkkkkkkkkkkkkkkkkkkkkkkkk');
    
  //   try {
  //    const result= await dispatch(
  //       googleLogin({ id_token: credential })
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
  //       setSignupError("Some error occurred while signup!");
  //     }
  //   } catch (error) {
  //     console.error("Google Login failed:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleOtpSubmit = async (otp) => {
    try {
      const result = await dispatch(
        signupUser({ ...signupData, otp })
      ).unwrap();
      if (result.success) {
        const role = result.user.role;

        if (role === "member") {
          navigate("/member");
        } else if (role === "trainer") {
          navigate("/trainer");
        } else if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/signup");
        }
      } else {
        setSignupError("Some error occurred while signup!");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
    } finally {
      setOtpModalVisible(false);
    }
  };

  return (
    <>
      <AuthNavbar />
      <div
        className="w-full h-screen pt-[60px] flex justify-center items-center dark:bg-dark-bg dark:text-dark-text"
        style={{
          backgroundImage: `url(${gymworkoutImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full h-full flex justify-center pb-4 items-center flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-black dark:opacity-70 opacity-40"></div>
          <div className="flex flex-col items-center p-7 lg:p-9 rounded-xl dark:bg-neutral-500/10 bg-neutral-100/10 backdrop-blur-lg">
            <div className="flex flex-col justify-center items-center text-center p-3">
              <h1 className="mb-2 font-extrabold text-2xl lg:text-3xl text-white">
                Welcome to <span className="text-rex-green ">RexFit</span>,
              </h1>
              <h1 className="mb-1 font-extrabold text-2xl lg:text-3xl text-white ">
                Sign Up to get Started.
              </h1>
              <h4 className="text-gray-400 text-sm">
                Choose your account type
              </h4>
            </div>

            <Formik
              initialValues={{
                role: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form className="flex w-[100%] md:w-[400px] flex-col justify-center items-center text-center gap-4">
                  <div className="w-full flex justify-center gap-4 ">
                    <button
                      type="button"
                      onClick={() => setFieldValue("role", "member")}
                      className={`px-6 py-2 rounded-lg transition-all duration-100 ${
                        values.role === "member"
                          ? "bg-rex-green text-black font-bold text-lg"
                          : "bg-gray-200 dark:bg-neutral-700 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      Member
                    </button>
                    <button
                      type="button"
                      onClick={() => setFieldValue("role", "trainer")}
                      className={`px-6 py-2 rounded-lg transition-all duration-100 ${
                        values.role === "trainer"
                          ? "bg-rex-green text-black font-bold text-lg"
                          : "bg-gray-200 dark:bg-neutral-700 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      Trainer
                    </button>
                  </div>

                  {!values.role && (
                    <div className="text-red-500 text-sm ">
                      Please select a user type
                    </div>
                  )}

                  {signupError && (
                    <div className="text-red-500 text-sm mt-2">
                      {signupError}
                    </div>
                  )}
                  <div className="w-full">
                    <Field
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="bg-neutral-200 p-2 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border border-gray-200 focus:border-blue-200 focus:outline-none focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 dark:text-red-400 text-sm text-left mt-1"
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="bg-neutral-200 p-2 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border border-gray-200 focus:border-blue-200 focus:outline-none focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 dark:text-red-400 text-sm text-left mt-1"
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Create Password"
                      className="bg-neutral-200 p-2 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border border-gray-200 focus:border-blue-200 focus:outline-none focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 dark:text-red-400 text-sm text-left mt-1"
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="bg-neutral-200 p-2 rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-600 dark:text-white border border-gray-200 focus:border-blue-200 focus:outline-none focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 dark:text-red-400 text-sm text-left mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-rex-green text-black font-bold p-2 rounded-lg hover:opacity-95 disabled:opacity-80 mt-4 w-full"
                    disabled={isLoading || isSubmitting}
                  >
                    {isLoading || isSubmitting ? "Loading..." : "Sign Up"}
                  </button>

                  {/* <p className="text-white">or</p>

                  <div className="flex justify-center w-full">
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        handleGoogleLogin(credentialResponse);
                      }}
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

            <p
              className="mt-5 text-sm font-semibold text-white 
            dark:text-white"
            >
              Already have an Account?
              <Link to="/login">
                <span className="text-blue-400 dark-links"> Log In</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      {otpModalVisible && (
        <OtpModal
          onClose={() => setOtpModalVisible(false)}
          email={emailForOtp}
          onSubmit={handleOtpSubmit}
        />
      )}
    </>
  );
};

export default Signup;
