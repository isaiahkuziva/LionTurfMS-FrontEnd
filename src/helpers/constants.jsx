import axios from "axios";
import { FaUsers } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import {
  MdDashboard,
  MdFormatQuote,
  MdInsertDriveFile,
  MdPeople,
  MdReceipt,
  MdScale,
  MdSchedule,
  MdSettings,
} from "react-icons/md";

export const THEMES = {
  yellow: "YELLOW",
  dark: "DARK",
};

export const THEME_COLORS = {
  yellow: "#ffff00",
  dark: "#ffc107",
};

export const getThemeColor = (currentTheme) => {
  const color =
    currentTheme === THEMES.yellow ? THEME_COLORS.yellow : THEME_COLORS.dark;

  return color;
};

//export const API_URL = import.meta.env.VITE_API_URL;
export const API_URL = "http://localhost:5000/api/";

export const COMPANY_NAME = "COMPANY NAME";

export const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const AUTH_ENDPOINTS = {
  login: "auth/login",
  emailVerification: "auth/email-verification",
  logout: "auth/logout",
  forgotPassword: "auth/forgot-password",
  validateCode: "auth/validate-code",
  authenticate: "/users/authenticate",
};

export const USER_ENDPOINTS = {
  get: "users/",
  update: "/users/",
  delete: "/users/",
  add: "/users/add",
};

export const CALIBRATIONSCHEDULE_ENDPOINTS = {
  get: "calibrationSchedules/",
  update: "/calibrationSchedules/",
  delete: "/calibrationSchedules/",
  add: "/calibrationSchedules/add",
};

export const CALIBRATIONRECORD_ENDPOINTS = {
  get: "calibrationRecords/",
  update: "/calibrationRecords/",
  delete: "/calibrationRecords/",
  add: "/calibrationRecords/add",
};

export const CERTIFICATE_ENDPOINTS = {
  get: "certificates/",
  update: "/certificates/",
  delete: "/certificates/",
  add: "/certificates/add",
};

export const CUSTOMER_ENDPOINTS = {
  get: "customers/",
  update: "/customers/",
  delete: "/customers/",
  add: "/customers/add",
};

export const INSTRUMENT_ENDPOINTS = {
  get: "instruments/",
  update: "/instruments/",
  delete: "/instruments/",
  add: "/instruments/add",
};

export const QUOTATION_ENDPOINTS = {
  get: "quotations/",
  update: "/quotations/",
  delete: "/quotations/",
  add: "/quotations/add",
};

export const INVOICE_ENDPOINTS = {
  get: "invoices/",
  update: "/invoices/",
  delete: "/invoices/",
  add: "/invoices/add",
};

export const BOOKING_ENDPOINTS = {
  get: "bookings/",
  update: "/bookings/",
  delete: "/bookings/",
  add: "/bookings/add",
  addWorker: "/bookings/add-worker/",
  removeWorker: "/bookings/remove-worker/",
  weekly: "/bookings/last7daysbookings",
};

export const getAxiosError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    return error.response.data;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return error.request.data;
  } else {
    console.error(error);
    return "Internal error occured!";
    // return error.message;
  }
};

export const listScrollbarStyle = `overflow-y-auto h-full scrollbar scrollbar-w-1 scrollbar-thumb-transparent ease-in-out duration-300
hover:scrollbar-thumb-[#737b8b] group-hover:scrollbar-thumb-[#ccc] scrollbar-thumb-rounded-full scrollbar-track-transparent 
scrollbar-w-[4px]`;

export const handleDarkThemeStyling = (currentTheme, style1, style2) => {
  return currentTheme === THEMES.dark ? style1 : style2;
};

export const dataGridStyle = (currentTheme) => {
  return {
    ".MuiDataGrid-columnSeparator": {
      display: "none",
    },
    "&.MuiDataGrid-root": {
      color: handleDarkThemeStyling(currentTheme, "#fafafa", "black"),
      border: "none",
      // height: "110vh",

      "*::-webkit-scrollbar": {
        width: 5,
        height: 5,
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "#cecece",
        borderRadius: 12,
      },
    },
    "& .MuiDataGrid-columnHeaders": {
      borderColor: handleDarkThemeStyling(currentTheme, "#737b8b", "#edf2f6"),
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: 700,
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "none",
    },
    "& .MuiDataGrid-row": {
      borderRadius: 2,
      "&:hover": {
        background: handleDarkThemeStyling(
          currentTheme,
          "transparent",
          "#edf2f6"
        ),
        color: getThemeColor(currentTheme),
      },
    },
  };
};

export const paginationStyle = (currentTheme) => {
  return {
    ".MuiPaginationItem-rounded": {
      color: currentTheme === THEMES.dark && "white",
    },
    ".Mui-selected": {
      backgroundColor: getThemeColor(currentTheme),
    },
  };
};

export const isPermitted = (currentUser) => {
  const temp = currentUser?.permission !== "READ-ONLY";
  return temp;
};

export const isMasterUser = (currentUser) => {
  const temp = currentUser?.permission === "FULL-ACCESS";
  return temp;
};

export const reactSelectStyle = (currentTheme) => {
  return {
    container: (styles, state) => ({
      ...styles,
      padding: 0,
    }),
    valueContainer: (styles, state) => ({
      ...styles,
      height: "3rem",
      padding: "0 1.25rem",
    }),
    control: (styles, state) => ({
      ...styles,
      borderRadius: "1rem",
      backgroundColor: "transparent",
      "&:hover": {
        border: `0.0625rem solid ${getThemeColor(currentTheme)}`,
      },
    }),

    multiValueRemove: (styles, state) => ({
      ...styles,
      borderRadius: "50%",
    }),
    multiValue: (styles, state) => ({
      ...styles,
      // backgroundColor: "#edf2f6",
      // fontSize: "14px",
      // padding: "0.25rem",
      borderRadius: "1rem",
    }),
    // singleValue: (styles, state) => ({
    //   ...styles,
    //   // backgroundColor: "#edf2f6",
    //   fontSize: "14px",
    //   padding: "8px",
    //   borderRadius: "1rem",
    // }),
    option: (styles, state) => ({
      ...styles,
      "&:first-child": {
        borderRadius: "1rem 1rem 0 0",
      },
      "&:last-child": {
        borderRadius: "0 0 1rem 1rem",
      },
    }),
    menuList: (provided, state) => ({
      ...provided,
      borderRadius: "1rem",
      border: "none",
      padding: 0,
    }),
    menu: (provided, state) => ({
      ...provided,
      borderRadius: "1rem",
      border: "none",
      padding: 0,
    }),
  };
};

// side bar pages
export const sidebarPageList = [
  {
    name: "dashboard",
    route: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    name: "users",
    route: `/users`,
    icon: <FaUsers />,
  },
  {
    name: "calibrationSchedules",
    route: `/calibrationSchedules`,
    icon: <MdSchedule />,
  },
  {
    name: "calibrationRecords",
    route: `/calibrationRecords`,
    icon: <MdInsertDriveFile />,
  },
  {
    name: "certificates",
    route: `/certificates`,
    icon: <IoIosDocument />,
  },
  {
    name: "customers",
    route: `/customers`,
    icon: <MdPeople />,
  },
  {
    name: "instruments",
    route: `/instruments`,
    icon: <MdScale />,
  },
  {
    name: "quotations",
    route: `/quotations`,
    icon: <MdFormatQuote />,
  },
  {
    name: "invoices",
    route: `/invoices`,
    icon: <MdReceipt />,
  },
  // {
  //   name: "vehicles",
  //   accordionId: `/vehicles/`,
  //   icon: <AiFillCar />,
  //   list: [
  //     {
  //       name: "all vehicles",
  //       route: `/vehicles`,
  //     },

  //   ],
  // },
  {
    name: "settings",
    route: `/settings`,
    icon: <MdSettings />,
  },
];
