import React, { useCallback, useState } from "react";
import { Logo } from "../assets";
import { UserAuthInput } from "../components";
import { FaEnvelope, FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { AnimatePresence, motion, opacity } from "framer-motion";
import { MdPassword } from "react-icons/md";
import { signINWithGitHub, signINWithGoogle } from "../utils/helpers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { fadeInOut } from "../animations";

const SignUp = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const createNewUser = async () => {
    if (getEmailValidationStatus) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const loginWithEmailPassword = async () => {
    if (getEmailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((usercred) => {
          if (usercred) {
            console.log(usercred);
          }
        })
        .catch((err) => {
          console.log(err.message);
          if (err.message.includes("user-not-found")) {
            setAlert(true);
            setAlertMsg("Invalid Id : User not found");
          } else if (err.message.includes("wrong-password")) {
            setAlert(true);
            setAlertMsg("Password incorrect!");
          } 
          else {
            setAlert(true);
            setAlertMsg("Invalid credential!🙂");
            // setAlertMsg("Temporarily disabled sue to many failed login🙂");
          }
          setInterval(() => {
            setAlert(false);
          }, 4000);
        });
    }
  };

  return (
    <div className="w-full py-0 mt-0">
      {/* <img
        src={Logo}
        alt="Logoo"
        className="object-contain w-32 opacity-50 h-auto"
      /> */}

      <div className="w-full flex flex-col items-center justify-center py-8">
        <p className="py-7 text-2xl text-primaryText">Join With Us!✨</p>
        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary items-center justify-center gap-8">
          {/* email */}
          <UserAuthInput
            label="Email"
            placeHolder="Email"
            isPass={false}
            key="Email"
            setStateFunction={setemail}
            Icon={FaEnvelope}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />
          {/* password */}
          <UserAuthInput
            label="Password"
            placeHolder="Password"
            isPass={true}
            key="Password"
            setStateFunction={setPassword}
            Icon={MdPassword}
          />

          {/* alert section */}
          <AnimatePresence>
            {alert && (
              <motion.p
                key={"AlertMessage"}
                {...fadeInOut}
                className="text-red-500 flex items-center justify-center my-3"
              >
                {alertMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {/* login button */}
          {!isLogin ? (
            <motion.div
              onClick={createNewUser}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500 my-3"
            >
              <p className="text-xl text-white">Sign Up </p>
            </motion.div>
          ) : (
            <motion.div
              onClick={loginWithEmailPassword}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500 my-3"
            >
              {/* my-3 added by me own not mentioned anywhere */}
              <p className="text-xl text-white">Log In </p>
            </motion.div>
          )}

          {/* account text section */}
          {!isLogin ? (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Already Have an account !{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="cursor-pointer text-emerald-500"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Doesn't Have an account !{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="cursor-pointer text-emerald-500"
              >
                Create Here
              </span>
            </p>
          )}

          {/* or section */}
          {/* my-3 added by me own not mentioned anywhere */}
          <div className="flex items-center justify-center gap-12 my-3">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>

          {/* sign in with google */}

          <motion.div
            onClick={signINWithGoogle}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg[rgba(256,256,256,0.4)] cursor-pointer"
          >
            {/* 2xl added by me own original : 3xl */}
            <FcGoogle className="text-2xl" />
            <p className="text-md text-white">Sign in with Google</p>
          </motion.div>

          {/* or section */}
          {/* my-3 added by me own not mentioned anywhere */}
          <div className="flex items-center justify-center gap-12 my-3">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>

          {/* sign in with github */}

          <motion.div
            onClick={signINWithGitHub}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg[rgba(256,256,256,0.4)] cursor-pointer"
          >
            {/* 2xl added by me own original : 3xl */}
            <FaGithub className="text-2xl text-white" />
            <p className="text-md text-white">Sign in with GitHub</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
