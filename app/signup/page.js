"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Apple from "../assets/images/signup/apple-icon.png";
import Cover from "../assets/images/signup/cover.png";
import Cross from "../assets/images/signup/cross.png";
import Facebook from "../assets/images/signup/facebook-icon.png";
import Lock from "../assets/images/signup/lock.png";
import Mail from "../assets/images/signup/mail.png";
import Shadow from "../assets/images/signup/shadow.png";
import X from "../assets/images/signup/x-icon.png";

import { useRouter } from "next/navigation";
import axios from "../lib/axiosInstance";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const togglePasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const payload = {
        first_name: data.first_name,
        username: data.username,
        email: data.email,
        password: data.password,
      };

      console.log("Submitting to API:", payload);

      const response = await axios.post(
        "https://api.mnimedu.com/api/auth/registration/",
        payload
      );
      console.log("Registration success", response.data);
      alert("Registration successful. You can now log in.");
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-[1400px] py-[137px]">
        <div className="rounded-3xl bg-secondary relative">
          <Image
            src={Shadow}
            alt="img"
            className="absolute left-[25%] hidden lg:block"
          />
          <div className="flex items-center gap-[100px] p-[39px]">
            <div className="lg:px-[100px] sm:px-0 md:px-0 flex-1/2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center">
                  <h2 className="text-[32px] font-bold text-center mb-[11px]">
                    Open your account
                  </h2>
                  <div className="flex gap-1">
                    <p className="font-semibold text-[14px]">
                      Already have an account?
                    </p>
                    <Link
                      href="/login"
                      className="font-semibold text-[14px] text-primary mb-[38px]"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
                {/* First Name */}
                <div className="mb-[30px] w-full">
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register("first_name", {
                      required: "First name is required",
                    })}
                    className={`w-full text-[14px] rounded-full py-[14px] px-[20px] border ${
                      errors.first_name ? "border-red-500" : "border-gray-500"
                    }`}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>

                {/* Username */}
                <div className="mb-[30px] w-full">
                  <input
                    type="text"
                    placeholder="Username"
                    {...register("username", {
                      required: "Username is required",
                    })}
                    className={`w-full text-[14px] rounded-full py-[14px] px-[20px] border ${
                      errors.username ? "border-red-500" : "border-gray-500"
                    }`}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div className="mb-[30px] w-full">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                      <Image className="w-[18px]" src={Mail} alt="img" />
                    </span>
                    <input
                      type="email"
                      placeholder="Email Address"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      className={`w-full text-[14px] rounded-full py-[14px] px-[44px] pr-[44px] border focus:outline-none focus:ring-0 focus:border-primary ${
                        errors.email ? "border-red-500" : "border-gray-500"
                      }`}
                    />
                    {/* Error Message */}
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                {/* Password */}
                <div className="mb-[30px] w-full">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                      <Image className="w-[18px]" src={Lock} alt="img" />
                    </span>

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className={`w-full text-[14px] rounded-full py-[14px] px-[44px] pr-[44px] border focus:outline-none focus:ring-0 focus:border-primary ${
                        errors.password ? "border-red-500" : "border-gray-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={togglePassword}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                    {/* Error Message */}
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Password Confirm */}
                <div className="mb-[30px] w-full">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                      <Image className="w-[18px]" src={Lock} alt="img" />
                    </span>

                    <input
                      type={showPasswordConfirm ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...register("confirmPassword", {
                        required: "Confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      className={`w-full text-[14px] rounded-full py-[14px] px-[44px] pr-[44px] border focus:outline-none focus:ring-0 focus:border-primary ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordConfirm}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"
                    >
                      {showPasswordConfirm ? <FiEyeOff /> : <FiEye />}
                    </button>
                    {/* Error Message */}
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-[14px] px-[24px] text-[14px] font-semibold rounded-full bg-primary hover:bg-gray-100 hover:text-secondary transition"
                >
                  Create Account
                </button>
              </form>
              <div className="flex flex-row items-center gap-4 text-gray-500 mt-[61px] mb-[37px]">
                <div className="bg-gray-500 w-full h-[1px]"></div>
                or
                <div className="bg-gray-500 w-full h-[1px]"></div>
              </div>

              <div className="flex gap-[30px]">
                <div className="bg-[#1E1E1E] hover:bg-primary transition p-4 flex-1/3 justify-items-center rounded-full">
                  <Image src={Facebook} alt="img" />
                </div>
                <div className="bg-[#1E1E1E] hover:bg-primary transition p-4 flex-1/3 justify-items-center rounded-full">
                  <Image src={Apple} alt="img" />
                </div>
                <div className="bg-[#1E1E1E] hover:bg-primary transition p-4 flex-1/3 justify-items-center rounded-full">
                  <Image src={X} alt="img" />
                </div>
              </div>

              <div>
                <p className="text-center mt-[50px] text-[14px] text-[#888888]">
                  By joining, you agree to the Fiverr{" "}
                  <span className="text-primary underline">
                    <a href="#">Terms of Service</a>
                  </span>{" "}
                  and to occasionally receive emails from us. Please read our{" "}
                  <span className="text-primary underline">
                    <a href="#">Privacy Policy</a>
                  </span>{" "}
                  to learn how we use your personal data.
                </p>
              </div>
            </div>
            <div className="flex-1/2 hidden lg:block">
              <div className="relative">
                <Image src={Cover} alt="img" className="w-full" />
                <a href="#">
                  <Image
                    src={Cross}
                    alt="img"
                    className="absolute top-0 right-0 sm:w-[10px] md:w-[30px] lg:w-[50px]"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
