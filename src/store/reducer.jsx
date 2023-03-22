import { stop } from "../util/progress";
import * as actionTypes from "./actions";

const initialState = {
  admin: {
    college_list: [],
    company_list: [],
    current_college: {},
    current_company: {},
  },
  college: {},
  company: {
    company_details: {},
    applied: [],
    current_application: {
      applicationDetail: {},
      certificates: [],
    },
    employees: [],
    accepted_candidates: [],
    current_employee: {
      employeeDetail: {},
      certificates: [],
    },
    external_certificates: [],
  },
  loginInfo: {
    token: "",
  },
};

const reducer = (state = initialState, action) => {
  stop();
  switch (action.type) {
    /** ----------------- General Actions ---------------------- */
    case actionTypes.SET_LOGIN_INFO: {
      // console.log("Got Login Data")
      return {
        ...state,
        loginInfo: action.loginInfo,
      };
    }
    /** ----------------- ADMIN Actions ---------------------- */
    case actionTypes.SAVE_ADMIN_COLLEGES: {
      // console.log("Got admin college list")
      return {
        ...state,
        admin: {
          ...state.admin,
          college_list: action.college_list,
        },
      };
    }
    case actionTypes.SAVE_ADMIN_COMPANIES: {
      // console.log("Got admin company list")
      return {
        ...state,
        admin: {
          ...state.admin,
          company_list: action.company_list,
        },
      };
    }
    case actionTypes.SAVE_ADMIN_COLLEGE: {
      // console.log("Got admin current college data")
      return {
        ...state,
        admin: {
          ...state.admin,
          current_college: action.current_college,
        },
      };
    }
    case actionTypes.SAVE_ADMIN_COMPANY: {
      // console.log("Got admin current company data")
      return {
        ...state,
        admin: {
          ...state.admin,
          current_company: action.current_company,
        },
      };
    }
    /** ----------------- COLLEGE Actions ---------------------- */

    /** ----------------- COMPANY Actions ---------------------- */
    case actionTypes.SAVE_COMPANY_DETAILS: {
      // console.log("Got company details")
      return {
        ...state,
        company: {
          ...state.company,
          company_details: action.company_details,
        },
      };
    }

    case actionTypes.SAVE_COMPANY_CURRENT_EMPLOYEE: {
      // console.log("Got company employee data")
      return {
        ...state,
        company: {
          ...state.company,
          current_employee: action.current_employee,
        },
      };
    }

    case actionTypes.SAVE_COMPANY_EMPLOYEE_CERTIFICATE: {
      // console.log("Got company employee data")
      return {
        ...state,
        company: {
          ...state.company,
          current_employee: {
            ...state.company.current_employee,
            certificates: action.certificates,
          },
        },
      };
    }

    case actionTypes.SAVE_COMPANY_CURRENT_APPLICATION:{
      // console.log("Got company application data")
      return {
        ...state,
        company: {
          ...state.company,
          current_application: action.current_application,
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
