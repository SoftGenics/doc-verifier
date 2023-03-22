import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Highlighter from "react-highlight-words";
import moment from "moment";
import { Button, Input, Space, Table, Tooltip } from "antd";
import {
  AlignCenterOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FolderViewOutlined,
  IdcardFilled,
  SearchOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import { ROOT_URL } from "../../../../App";
import * as actionTypes from "../../../../store/actions";
import { showNotification } from "../../../../util/notification";
import { Certificates, TableHeader, CustomModal } from "../styles";

export const CoursesList = ({
  CoursesList = [],
  setCoursesList,
  employeeId = "",
}) => {
  const BASE_URL = `${ROOT_URL}/student/Home/certificate`;

  const [employeeList, setEmployeeList] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState(null);
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  /** Action Handlers */
  const handleEmployeeRemove = (employee) => {
    console.log(employee.id, "Remove");

    Axios.delete(`${BASE_URL}/`, {
      data: {
        employeeId: employee.id,
      },
    })
      .then((res) => {
        const remainingEmps = (employeeList || []).filter((currEmployee) => currEmployee.id !== employee.id )
        setEmployeeList(remainingEmps)
        showNotification(
          "Employee Updated Successfully",
          `Employee removed Successfully`,
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };





  const handleIssueCertificate = () => {
    const employeeId = query.get("id") || "";
    navigate(`?module=employee&view=new-certificate&id=${employeeId}`);
  };

  const handleCertificateDisplay = (certificate) => {
    console.log(certificate);
    setCurrentCertificate(certificate.url);
    showModal();
  };

  const handleCertificateReject = (certificate, isRejected) => {
    const requiredState = isRejected ? "pending" : "rejected";
    const displayAction = isRejected ? "Unrejected" : "Rejected";
    Axios.put(`${BASE_URL}/reject`, {
      requiredState,
      certificateId: certificate.id,
      employeeId,
    })
      .then((res) => {
        dispatch({
          type: actionTypes.SAVE_COMPANY_CURRENT_EMPLOYEE,
          current_employee: res.data,
        });
        setCoursesList(res.data.certificates);
        showNotification(
          "certificate Updated Successfully",
          `certificate ${displayAction} Successfully`,
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  const handleCertificateVerify = (certificate, isVerified) => {
    const requiredState = isVerified ? "pending" : "verified";
    const displayAction = isVerified ? "Unverified" : "Verified";
    Axios.put(`${BASE_URL}/verify`, {
      requiredState,
      certificateId: certificate.id,
      employeeId,
    })
      .then((res) => {
        dispatch({
          type: actionTypes.SAVE_COMPANY_CURRENT_EMPLOYEE,
          current_employee: res.data,
        });
        setCoursesList(res.data.certificates);
        showNotification(
          "Certificate Updated Successfully",
          `Certificate ${displayAction} Successfully`,
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      var object = document.getElementById("obj");
      console.log(object);
      object.setAttribute("data", currentCertificate);
      var clone = object.cloneNode();
      console.log(clone);
      var parent = object.parentNode;
      parent.removeChild(object);
      parent.appendChild(clone);
    }
  }, [isModalOpen]);

  /** Filter components */
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              confirm({
                closeDropdown: false,
              });
              setSearchText("");
              setSearchedColumn(null);
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Clear
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "no",
      align: "center",
    },
    // {
    //   title: "Certificate ID",
    //   dataIndex: "certificateID",
    //   key: "certificateID",
    // },
    {
      title: "Certificate Name",
      dataIndex: "certificateName",
      key: "certificateName",
      sorter: (a, b) => a.certificateName > b.certificateName,
      ...getColumnSearchProps("certificateName"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Issued On",
      dataIndex: "issuedOn",
      key: "issuedOn",
      render: (issuedOn) => moment(issuedOn).format("DD MMM YYYY | hh:mm"),
      sorter: (a, b) => moment.utc(a.issuedOn).diff(moment.utc(b.issuedOn)),
    },
    // {
    //   title: "Status",
    //   key: "status",
    //   render: ({ status }) => {
    //     switch (status) {
    //       case "verified":
    //         return (
    //           <div className="cert-status">
    //             <div className="s-node node"></div>Verified
    //           </div>
    //         );
    //       case "pending":
    //         return (
    //           <div className="cert-status">
    //             <div className="p-node node"></div>Pending
    //           </div>
    //         );
    //       case "rejected":
    //         return (
    //           <div className="cert-status">
    //             <div className="f-node node"></div>Rejected
    //           </div>
    //         );
    //       default:
    //         return "--";
    //     }
    //   },
    //   align: "center",
    //   filters: [
    //     {
    //       text: "Verified",
    //       value: "verified",
    //     },
    //     {
    //       text: "Pending",
    //       value: "pending",
    //     },
    //     {
    //       text: "Rejected",
    //       value: "rejected",
    //     },
    //   ],
    //   onFilter: (value, record) => record.status === value,
    // },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (record) => {
    //     const isRejected = record.status === "rejected";
    //     const isVerified = record.status === "verified";
    //     return (
    //       <div>
    //         {/* {!isRejected && (
    //           <>
    //             <Tooltip title="View">
    //               <FolderViewOutlined
    //                 onClick={() => handleCertificateDisplay(record)}
    //               />
    //             </Tooltip>
    //           </>
    //         )} */}
    //         <Tooltip title={isRejected ? "Un-Reject" : "Reject"}>
    //           <CloseCircleOutlined
    //             className={isRejected && "grey-out"}
    //             onClick={() => handleCertificateReject(record, isRejected)}
    //           />
    //         </Tooltip>
    //         {/* <Tooltip title={isVerified ? "Un-Verify" : "Verify"}>
    //           <CheckCircleOutlined
    //             className={isVerified && "grey-out"}
    //             onClick={() => handleCertificateVerify(record, isVerified)}
    //           />
    //         </Tooltip> */}
    //       </div>
    //     );
    //   },
    // },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div>
         
          <Tooltip title="Remove">
            <DeleteOutlined onClick={() => handleEmployeeRemove(record)} />
          </Tooltip>
        </div>
      ),
    },




  ];

  return (
    <Certificates>
      <TableHeader>
        <div className="title">Courses</div>
        {/* <div className="actions">
          <Button onClick={handleIssueCertificate}>
          <AlignCenterOutlined /> Filter
          </Button>
        </div> */}
      </TableHeader>
      <Table
        columns={columns}
        dataSource={CoursesList}
        pagination={{
          defaultPageSize: 6,
        }}
      />
      <CustomModal
        title={false}
        footer={false}
        open={isModalOpen}
        onCancel={handleCancel}
        width={1200}
      >
        <div className="img-wrapper">
          <object id="obj" aria-label="certificate" />
        </div>
      </CustomModal>
    </Certificates>
  );
};

export default CoursesList;
