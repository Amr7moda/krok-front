import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { passwordReset } from "../components/services/auth";

const ForgetPassword = () => {
  const { t, i18n } = useTranslation("common");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    try {
      const response = await passwordReset({ email });
      setSuccessMessage(response.message);

      // Modify the debug_url to use the new base URL
      if (response.debug_url) {
        const updatedDebugUrl = response.debug_url.replace(
          "http://krokplus.com",
          "https://app.krokplus.com/api/v1/user"
        );

        // Redirect to the reset password page with the updated debug_url
        router.push({
          pathname: "/reset-password",
          query: { debug_url: updatedDebugUrl },
        });
      }
    } catch (err) {
      setError("Failed to send password reset link. Please try again.");
    }
  };

  return (
    <>
      <div className="w-full h-full">
        <NavBar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-2xl font-bold mb-4 text-black">{t("Forget Password")}</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-96"
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {t("Email Address")}
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && (
              <p className="text-green-500 text-sm">{successMessage}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {t("Send Reset Link")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
