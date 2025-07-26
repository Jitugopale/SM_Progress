import React from "react";
import { Card } from "../ui/card";
import {Link} from "react-router-dom"

const LoginPage = () => {
  return (
    <div className="register">
      <div className="register-back flex items-center h-screen w-full">
        <Card className="max-w-md mx-auto my-auto p-4">
           <div className="max-w-sm mx-auto sm:max-w-sm">
          <div className="mb-1">
            <h1 className="text-3xl font-bold min-w-md sm:min-w-md">Create your Account</h1>
          </div>
          <div className="mb-4">
            <p className="text-sm">Already have an account? <Link to="/login" className="text-blue-600 font-medium">Login here.</Link></p>
          </div>
          <div className="max-w-sm">
            <form>    
            <label
              htmlFor="website-admin"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Business Email
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </span>
              <input
                type="text"
                id="website-admin"
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="business@gmail.com"
              />
            </div>

            <label
              htmlFor="website-admin"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Set Password
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </span>
              <input
                type="password"
                id="website-admin"
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="**********"
              />
            </div>
            <div className="mt-3">
              <p>Forget Password ?</p>
            </div>
            <div>
              <button className="w-full text-center bg-blue-500 rounded-sm p-2 mt-2">Submit</button>
            </div>
          </form>
          </div>
        </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
