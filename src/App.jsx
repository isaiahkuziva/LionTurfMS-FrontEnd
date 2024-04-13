import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SnackbarProvider } from "notistack";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components";
import { BrowserRouter as Router } from 'react-router-dom';
import { Circles } from "react-loading-icons";

import Signin from "./pages/auth/signin";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import CalibrationRecord from "./pages/calibrationRecords";
import CalibrationSchedule from "./pages/calibrationSchedules";
import Certificate from "./pages/certificates";
import Customer from "./pages/customers";
import Instrument from "./pages/instruments";
import Invoice from "./pages/invoices";
import Quotation from "./pages/quotations";

import ErrorPage from "./pages/errors";
import { getThemeColor } from "./helpers/constants";
import SingleUser from "./pages/users/singleUser";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div className={`absolute inset-0 z-[1005] flex flex-col items-center justify-center bg-black bg-opacity-60`}>
          <Circles height="3rem" speed={2} />
        </div>
      ) : (
        <Signin />
      )}
    </div>
  );
};



const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/signin",
    errorElement: <ErrorPage />,
    element: <Signin />,
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "calibrationSchedules",
        element: <CalibrationSchedule />,
      },
      {
        path: "calibrationRecords",
        element: <CalibrationRecord />,
      },
      {
        path: "certificates",
        element: <Certificate />,
      },
      {
        path: "customers",
        element: <Customer />,
      },
      {
        path: "instruments",
        element: <Instrument />,
      },
      {
        path: "invoices",
        element: <Invoice />,
      },
      {
        path: "quotations",
        element: <Quotation />,
      },
      {
        path: "profile",
        element: <SingleUser />,
      },
    ],
  },
]);

const App = () => {
  const theme = useSelector((state) => state.theme.value);
  const loading = useSelector((state) => state.loading.value);

  return (
    <Router>
      <SnackbarProvider maxSnack={3}>

        {/* <RouterProvider router={router} /> */}
        {<LoadingScreen theme={theme} />}
      </SnackbarProvider>
    </Router>
  );
};

export default App;

// <div>
//     <h1 className="text-3xl ">Test</h1>
//   </div>

