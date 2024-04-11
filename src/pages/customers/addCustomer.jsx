import MuiModal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  CUSTOMER_ENDPOINTS,
  API,
  getAxiosError,
  handleDarkThemeStyling,
} from "../../helpers/constants";
import { hideLoading, showLoading } from "../../redux/slices/loadingSlice";
import { useSnackbar } from "notistack";
import { useState, useRef } from "react";
import { Dropdown } from "../../components";
import { IoMdClose } from "react-icons/io";
import "react-phone-number-input/style.css";
import select from '../../assets/select.png'
import { useDropzone } from "react-dropzone";
import { selectCurrentUser } from '../../redux/slices/userSlice';



const AddCustomer = ({ showModal, setShowModal, currentTheme, navigate, }) => {
  
  const [values, setValues] = useState({
    customerId: "",
    name: "",
    email: "",
    phoneNumber: "",
  });

  //const [sentCode, setSentCode] = useState();
  const [isCustomerAdded, setIsCustomerAdded] = useState('false')
  //const [isCodeSent, setIsCodeSent] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const loading = useSelector((state) => state.loading.value);
  const fileInputRef = useRef(null);

  const currentUser = useSelector(selectCurrentUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (values && currentUser) {
      dispatch(showLoading());
      const requestData = {
        ...values,
        editor: currentUser._id,
      };
      API.post(`${CUSTOMER_ENDPOINTS.add}`, requestData)
        .then(() => {
          enqueueSnackbar(`Record successfully added`, { variant: "success" });
          setValues(null);
          setShowModal(false);
        })
        .catch((error) => {
          enqueueSnackbar(getAxiosError(error), { variant: "error" });
        })
        .finally(() => {
          dispatch(hideLoading());
        });
    }
  };

  return (
    <MuiModal open={showModal} onClose={() => setShowModal(false)}>
      <div
        className={`m-auto mt-12 w-1/2 rounded-2xl p-8 ${handleDarkThemeStyling(
          currentTheme,
          "bg-custom-gradient-light",
          "bg-skin-fill"
        )}`}
      >
        <form
          onSubmit={ submit }
          className={``}
        >
            <div>
              <div className="flex justify-between space-x-4">
                <input
                  name="Name"
                  type="string"
                  placeholder="Name"
                  required
                  className={`mb-4 h-12 w-full rounded-xl border border-skin-base px-4 placeholder-color-gray outline-none duration-300 ease-in hover:border-skin-inverted focus:border-skin-inverted ${handleDarkThemeStyling(
                    currentTheme,
                    "bg-transparent text-white",
                    ""
                  )}`}
                  onChange={handleChange}
                  value={values.name}
                />

                <input
                  name="customerId"
                  type="number"
                  placeholder="Customer ID"
                  required
                  className={`mb-4 h-12 w-full rounded-xl border border-skin-base px-4 placeholder-color-gray outline-none duration-300 ease-in hover:border-skin-inverted focus:border-skin-inverted ${handleDarkThemeStyling(
                    currentTheme,
                    "bg-transparent text-white",
                    ""
                  )}`}
                  onChange={handleChange}
                  value={values.customerId}
                />
              </div>

              <input
                name="email"
                type="email"
                placeholder="Company Email"
                required
                className={`mb-4 h-12 w-full rounded-xl border border-skin-base px-4 text-gray-500 placeholder-opacity-50 outline-none duration-300 ease-in hover:border-skin-inverted focus:border-skin-inverted ${handleDarkThemeStyling(
                  currentTheme,
                  "bg-transparent text-white",
                  ""
                )}`}
                onChange={handleChange}
                value={values.email}
                style={{ color: '#6B7280', '::placeholder': { color: '#6B7280' } }}
              />

              <div className="flex justify-between space-x-4">
              <input
                name="phoneNumber"
                type="number"
                placeholder="PhoneNumber"
                required
                className={`mb-4 h-12 w-full rounded-xl border border-skin-base px-4 text-gray-500 placeholder-opacity-50 outline-none duration-300 ease-in hover:border-skin-inverted focus:border-skin-inverted ${handleDarkThemeStyling(
                  currentTheme,
                  "bg-transparent text-white",
                  ""
                )}`}
                onChange={handleChange}
                value={values.phoneNumber}
                style={{ color: '#6B7280', '::placeholder': { color: '#6B7280' } }}
              />
              </div>
              </div>

          <div className={`mt-8 flex items-center justify-end gap-2`}>
            <button
              disabled={loading}
              className={`h-10 w-24 rounded-xl text-sm duration-300 ease-in-out hover:drop-shadow-2xl ${handleDarkThemeStyling(
                currentTheme,
                "border border-skin-base bg-custom-gradient-light text-white",
                "bg-skin-fill-base"
              )}`}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className={`h-10 w-24 rounded-xl bg-skin-fill-inverted text-sm  duration-300 ease-in-out hover:drop-shadow-2xl`}
            >
              {loading
                ? "Wait..."
                : sentCode
                ? "Submit"
                : "Next"}
            </button>
          </div>
        </form>
      </div>
    </MuiModal>
  );
};

export default AddCustomer;
