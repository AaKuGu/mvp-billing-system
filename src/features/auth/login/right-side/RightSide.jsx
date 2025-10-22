"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { redirect, useRouter } from "next/navigation";
import { BlueButton } from "@/re_usables/components/Button";

const RightSide = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between signup & signin
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    setFormData({ name: "", email: "", password: "" }); // Clear form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (isSignup) {
      console.log("Signing up with:", formData);
      const { data, error } = await authClient.signUp.email(
        {
          email, // user email address
          password, // user password -> min 8 characters by default
          name, // user display name
          //   image, // User image URL (optional)
          callbackURL: "/business-details", // A URL to redirect to after the user verifies their email (optional)
        },
        {
          onRequest: (ctx) => {
            //show loading
          },
          onSuccess: (ctx) => {
            router.push(`/business-details`);
            //redirect to the dashboard or sign in page
          },
          onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
          },
        }
      );
      console.log("data : ", data);
      // Add sign-up logic here
    } else {
      console.log("Signing in with:", {
        email: formData.email,
        password: formData.password,
      });

      await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "/business-details",
          rememberMe: true,
        },
        {
          onSuccess: () => {
            router.push(`/business-details`);
          },
        }
      );
    }
  };

  const googleLoginHandler = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/go/dashboard", // 👈 Redirect after successful login
    });
    console.log("google login : data : ", data);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">
        {isSignup ? "Sign Up" : "Sign In"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={toggleMode}
          className="text-blue-600 hover:underline"
        >
          {isSignup ? "Sign In" : "Sign Up"}
        </button>
      </p>

      <div>One Click Sign In/Sign Up</div>
      <BlueButton onClick={googleLoginHandler}>Login Via Google</BlueButton>
    </div>
  );
};

export default RightSide;
