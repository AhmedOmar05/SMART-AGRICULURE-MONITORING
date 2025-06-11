import React, { useState, useRef } from "react";
import firebase from "../otp";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid phone number with country code (e.g. +91...)");
      return;
    }

    if (recaptchaRef.current) {
      recaptchaRef.current.innerHTML = '<div id="recaptcha-container"></div>';
    }

    const verifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
      callback: () => {
        console.log("reCAPTCHA resolved");
      },
    });

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, verifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        alert("OTP sent to your number")

      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        alert(error.message);
      });
  };

  const handleVerifyOTP = () => {
    if (!verificationCode) {
      alert("Please enter the OTP.");
      return;
    }

    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );

    firebase
      .auth()
      .signInWithCredential(credential)
      .then((userCredential) => {
        console.log("User signed in:", userCredential.user);
        alert("Login successful!");
        navigate("/Dashboard");
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        alert(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-pink-200 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-4">OTP Authentication</h1>
        <p className="text-center text-gray-600 mb-6">
          Welcome to our secure login system. Please verify your phone number to continue.
        </p>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-green-700">Phone Number</span>
          </label>
          <input
            type="tel"
            placeholder="+91**********"
            className="input input-bordered w-full bg-white text-black"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button
            className="btn w-full mt-3 bg-white text-green-700 border border-green-500 shadow-md hover:bg-green-500 hover:text-white transition-all"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-green-700">OTP</span>
          </label>
          <input
            type="text"
            placeholder="Enter OTP"
            className="input input-bordered w-full bg-white text-black"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button
            className="btn w-full mt-3 bg-white text-pink-700 border border-pink-500 shadow-md hover:bg-pink-500 hover:text-white transition-all"
            onClick={handleVerifyOTP}
          >
            Verify OTP
          </button>
        </div>

        {/* reCAPTCHA container */}
        <div ref={recaptchaRef} className="mt-4"></div>
      </div>
    </div>
  );
};

export default Auth;
