import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Highlighter from "react-highlight-words";
import moment from "moment";
import { Button, Input, Space, Table, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  SearchOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import { ROOT_URL } from "../../../App";
import * as actionTypes from "../../../store/actions";
import { showNotification } from "../../../util/notification";
import { Companies, CustomModal, TableHeader } from "./styles";

export const CompanyTable = () => {
  const BASE_URL = `${ROOT_URL}/admin/company`;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [currentContactInfo, setContactInfo] = useState(companyList[0] || []);

  const fetchCompanyList = () => {
    Axios.get(`${BASE_URL}/list`, {})
      .then((res) => {
        setCompanyList(res.data.companies);
        dispatch({
          type: actionTypes.SAVE_ADMIN_COMPANIES,
          company_list: res.data.companies,
        });
        showNotification(
          "Company List Fetched Successfully",
          "Company List Fetched Successfully",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  useEffect(() => {
    fetchCompanyList();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddCompany = () => {
    navigate("?module=company&view=new");
  };

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

  const handleCompanyDisplay = (companyIndex) => {
    setContactInfo(companyList[companyIndex - 1]);
    showModal();
  };

  const handleCompanyEdit = (company) => {
    navigate(`?module=company&view=edit&id=${company.id}`);
  };

  const handleCompanyBlockUnblock = (company, isBlocked) => {
    const requiredState = isBlocked ? "unblock" : "block";
    const displayAction = isBlocked ? "Unblocked" : "Blocked";
    Axios.post(`${BASE_URL}/toggle-block`, {
      requiredState,
      companyId: company.id,
    })
      .then((res) => {
        setCompanyList(res.data.companies);
        showNotification(
          "Company Updated Successfully",
          `Company ${displayAction} Successfully`,
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  const handleCompanyDelete = (company) => {
    Axios.delete(`${BASE_URL}/delete`, {
      data: {
        companyId: company.id,
      },
    })
      .then((res) => {
        setCompanyList(res.data.companies);
        showNotification(
          "Company Deleted Successfully",
          "Company Deleted Successfully",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

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
    {
      title: "Company ID",
      dataIndex: "companyID",
      key: "companyID",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a, b) => a.companyName > b.companyName,
      ...getColumnSearchProps("companyName"),
    },
    {
      title: "Company Email",
      dataIndex: "companyEmail",
      key: "companyEmail",
      ...getColumnSearchProps("companyEmail"),
    },
    {
      title: "Registered On",
      dataIndex: "registeredOn",
      key: "registeredOn",
      render: (registeredOn) =>
        moment(registeredOn).format("DD MMM YYYY | hh:mm"),
      sorter: (a, b) =>
        moment.utc(a.registeredOn).diff(moment.utc(b.registeredOn)),
    },
    {
      title: "Quota Status",
      key: "quoteStatus",
      render: (company) =>
        `${company.certificatesUploaded} / ${company.certificatesQuota}`,
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => {
        const isBlocked = record.status === "blocked";
        return (
          <div>
            {!isBlocked && (
              <>
                <Tooltip title="Contact Info">
                  <PhoneOutlined
                    onClick={() => handleCompanyDisplay(record.index)}
                  />
                </Tooltip>
                <Tooltip title="Edit">
                  <EditOutlined onClick={() => handleCompanyEdit(record)} />
                </Tooltip>
              </>
            )}
            <Tooltip title={isBlocked ? "Unblock" : "Block"}>
              {isBlocked ? (
                <CheckCircleOutlined
                  onClick={() => handleCompanyBlockUnblock(record, isBlocked)}
                />
              ) : (
                <CloseCircleOutlined
                  onClick={() => handleCompanyBlockUnblock(record, isBlocked)}
                />
              )}
            </Tooltip>
            <Tooltip title="Delete">
              <DeleteOutlined onClick={() => handleCompanyDelete(record)} />
            </Tooltip>
          </div>
        );
      },
      filters: [
        {
          text: "Blocked",
          value: "blocked",
        },
        {
          text: "Active",
          value: "Active",
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  return (
    <Companies>
      <TableHeader>
        <div className="title">Companies</div>
        <div className="actions">
          <Button onClick={handleAddCompany}>
            <UserAddOutlined /> Add new Company
          </Button>
        </div>
      </TableHeader>
      <Table
        columns={columns}
        dataSource={companyList}
        pagination={{
          defaultPageSize: 6,
        }}
        rowClassName={(record, index) =>
          record.status === "blocked" ? "blocked" : ""
        }
      />
      <CustomModal
        title={false}
        footer={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="contact-info">
          <div className="primary">
            <div className="name">
              {currentContactInfo.companyName} <br />
            </div>
            <div className="email">
              <MailOutlined />
              {currentContactInfo.companyEmail}
            </div>
          </div>
          <div className="secondary">
            <div>
              <UserOutlined />
              {currentContactInfo.correspondent?.name || "John"}
            </div>
            <div>
              <MailOutlined />
              {currentContactInfo.correspondent?.email || "Johnsingh@iitk"}
            </div>
            <div>
              <PhoneOutlined />
              {currentContactInfo.correspondent?.phoneNumber || "+91 875264724"}
            </div>
          </div>
        </div>

        <div className="img-wrapper">
          <img src="/images/admin-college-contact-info.svg" alt="logo" />
        </div>
      </CustomModal>
    </Companies>
  );
};

export default CompanyTable;
