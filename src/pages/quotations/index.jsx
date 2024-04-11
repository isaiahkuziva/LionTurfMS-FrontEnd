import { useState, useEffect, useCallback } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";

import {
  dataGridStyle,
  handleDarkThemeStyling,
  API,
  QUOTATION_ENDPOINTS,
  USER_ENDPOINTS,
  getAxiosError,
  isPermitted,
  isMasterUser,
  API_URL,
} from "../../helpers/constants";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import AddQuotation from "./addQuotation";
import { hideLoading, showLoading } from "../../redux/slices/loadingSlice";

const Admins = () => {
  const loaderData = useLoaderData();
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("security");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numQuotations, setNumQuotations] = useState(loaderData?.numQuotations || 0);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.value);
  const currentUser = useSelector((state) => state.user.value);

  const [data, setData] = useState(() => {
    const temp = loaderData?.calibrationRecords || [];
    return temp;
  });

  console.log("Quotation Data: ", JSON.stringify(data))
  console.log("Loader Data: ", loaderData);

  useEffect(() => {
    dispatch(showLoading());
    API.get(QUOTATION_ENDPOINTS.get)
      .then((response) => {
        setData(response.data?.quotations);
        setNumQuotations(response.data?.numQuotations);
      })
      .catch((error) => {
        enqueueSnackbar(getAxiosError(error), { variant: "error" });
      })
      .finally(() => {
        dispatch(hideLoading());
      });
  }, []);


  // for searching
  useEffect(() => {
    if (keyword?.length && keyword?.length > 3) {
      setLoading(true);
      API.get(`${QUOTATION_ENDPOINTS.get}?keyword=${keyword}&quotationId=${quotationId}`)
        .then((response) => {
          setData(response.data?.quotations);
        })
        .catch((error) => {
          enqueueSnackbar(getAxiosError(error), { variant: "error" });
        })
        .finally(() => setLoading(false));
    }
  }, [keyword]);


  const onChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const handlePage = (value) => {
    const page = value?.page + 1;
    setLoading(true);
    API.get(`${QUOTATION_ENDPOINTS.get}?page=${page}&${quotationId}`)
      .then((response) => {
        setData(response.data?.quotations);
      })
      .catch((error) => {
        enqueueSnackbar(getAxiosError(error), { variant: "error" });
      })
      .finally(() => setLoading(false));
  };

  const deleteQuotation = (id) => {
    confirmAlert({
      title: "Delete Admin",
      message: "Are you sure you want to do this?",
      buttons: [
        {
          label: "Confirm",
          onClick: () => {
            dispatch(showLoading());
            API.delete(`${QUOTATION_ENDPOINTS.delete}${id}`)
              .then(() => {
                enqueueSnackbar("Successfully deleted!", {
                  variant: "success",
                });
              })
              .catch((error) => {
                enqueueSnackbar(getAxiosError(error), { variant: "error" });
              })
              .finally(() => {
                dispatch(hideLoading());
              });
          },
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
    });
  };

  const editQuotation = useCallback(
    (value, oldValue) =>
      new Promise((resolve, reject) => {
        const { _id, status, permission, firstName, lastName } = value;
        if (
          value &&
          (status !== oldValue?.status || permission !== oldValue?.permission)
        ) {
          confirmAlert({
            title: `UPDATE ${firstName?.toUpperCase()} ${lastName?.toUpperCase()}`,
            message: `Are you sure you want to do this?`,
            closeOnClickOutside: false,
            buttons: [
              {
                label: "Confirm",
                onClick: () => {
                  dispatch(showLoading());
                  API.patch(`${QUOTATION_ENDPOINTS.update}${_id}`, {
                    status,
                    permission,
                  })
                    .then(() => {
                      enqueueSnackbar("Successfully updated!", {
                        variant: "success",
                      });
                      resolve(value);
                    })
                    .catch((error) => {
                      enqueueSnackbar(getAxiosError(error), {
                        variant: "error",
                      });
                      resolve(oldValue);
                    })
                    .finally(() => {
                      dispatch(hideLoading());
                    });
                },
              },
              {
                label: "Cancel",
                onClick: () => {
                  resolve(oldValue);
                },
              },
            ],
          });
        } else {
          resolve(oldValue); // Nothing was changed
        }
      }),
    []
  );

  const columns = [

    {
      field: "companyName",
      headerName: "CompanyName",
      fontWeight: "bold",
      flex: 1,
      minWidth: 180,
      editable: false,
    },
    {
      field: "customerDetails",
      headerName: "customerDetails",
      flex: 1,
      minWidth: 180,
      editable: false,
    },
    {
      field: "destination",
      headerName: "Destination",
      flex: 1,
      minWidth: 180,
      editable: false,
    },

    {
      field: "customerId",
      headerName: "CustomerId",
      flex: 1,
      minWidth: 180,
      editable: false,
    },
  
  // {
  //   field: "editor",
  //   headerName: "Editor",
  //   flex: 1,
  //   minWidth: 180,
  //   editable: false,
  //   valueGetter: async (params) => {
  //     try {
  //       const item = data.find(item => item.editor === params.value);

  //       if (!item) {
  //         return "N/A"; 
  //       }
  //       const editorData = await API.get(`${USER_ENDPOINTS.get}/${params.value}`);
  //       const editorInfo = editorData.data;
  //       return `${editorInfo.firstName} ${editorInfo.lastName}`;
  //     } catch (error) {
  //       console.error("Error fetching editor's username:", error);
  //       return "N/A";
  //     }
  //   },
  // },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      minWidth: 180,
      editable: false,
    },
    {
      field: "quotationId",
      headerName: "QuotationId",
      flex: 1,
      minWidth: 180,
      editable: false,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      flex: 1,
      minWidth: 180,
      editable: false,
    },
    {
      field: "termOfPayment",
      headerName: "Terms Of Payment",
      flex: 1,
      minWidth: 180,
      editable: false,
    },
    isMasterUser(currentUser) && {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<MdDelete className={`text-lg text-red`} />}
          label="Delete"
          onClick={() => deleteQuotation(params?.id)}
        />,
      ],
    },
  ].filter(Boolean); 


  return (
    <div className={``}>
      <h2 className={`text-2xl font-semibold`}>Quotations</h2>
      {/* ============= searchbox and add button */}
      <div className={`mt-8 flex items-center justify-between`}>
        <input
          value={keyword}
          onChange={onChange}
          className={`h-12 w-96 rounded-full bg-skin-fill-base px-6 outline-none focus:border-skin-inverted ${handleDarkThemeStyling(
            currentTheme,
            "bg-custom-gradient-light text-white",
            " placeholder-color-gray"
          )}`}
          placeholder="Search by keyword..."
        />

        {isPermitted(currentUser) && (
          <button
            className={`h-11 w-32 rounded-xl bg-skin-fill-inverted text-white duration-300 ease-in-out hover:drop-shadow-2xl`}
            onClick={() => setShowModal(true)}
          >
            Add Quotation
          </button>
        )}
      </div>

      <div
        className={`mt-12 overflow-hidden rounded-3xl px-8 py-4 shadow-lg ${handleDarkThemeStyling(
          currentTheme,
          "bg-custom-gradient-light text-white",
          "bg-skin-fill"
        )}`}
      >
        <DataGrid
          autoHeight
          rows={data}
          rowCount={numQuotations}
          getRowId={(row) => row?._id}
          columns={columns}
          loading={loading}
          paginationMode="server"
          onPaginationModelChange={handlePage}
          rowHeight={60}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          className={`capitalize`}
          sx={dataGridStyle(currentTheme)}
          processRowUpdate={editQuotation}
        />
      </div>

      {showModal && (
        <AddQuotation
          showModal={showModal}
          setShowModal={setShowModal}
          currentTheme={currentTheme}
          navigate={navigate}
        />
      )}
    </div>
  );
};

export default Admins;