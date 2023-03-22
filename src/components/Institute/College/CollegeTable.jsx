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
import { Colleges, CustomModal, TableHeader } from "./styles";

export const CollegeTable = () => {
  const BASE_URL = `${ROOT_URL}/institute/college`;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collegeList, setCollegeList] = useState([]);
  const [currentContactInfo, setContactInfo] = useState(collegeList[0] || {});

  const fetchCollegeList = () => {
    Axios.get(`${BASE_URL}/lists`, {})
      .then((res) => {
        setCollegeList(res.data.colleges);
        dispatch({
          type: actionTypes.SAVE_ADMIN_COLLEGES,
          college_list: res.data.colleges,
        });
        showNotification(
          "College List Fetched Successfully",
          "College List Fetched Successfully",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  useEffect(() => {
    fetchCollegeList();
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

  const handleAddCollege = () => {
    navigate("?module=college&view=new");
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

  const handleCollegeDisplay = (collegeIndex) => {
    setContactInfo(collegeList[collegeIndex - 1]);
    showModal();
  };

  const handleCollegeEdit = (college) => {
    navigate(`?module=college&view=edit&id=${college.id}`);
  };

  const handleCollegeBlockUnblock = (college, isBlocked) => {
    const requiredState = isBlocked ? "unblock" : "block";
    const displayAction = isBlocked ? "Unblocked" : "Blocked";
    Axios.post(`${BASE_URL}/toggle-block`, {
      requiredState,
      collegeId: college.id,
    })
      .then((res) => {
        setCollegeList(res.data.colleges);
        showNotification(
          "College Updated Successfully",
          `College ${displayAction} Successfully`,
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  const handleCollegeDelete = (college) => {
    Axios.delete(`${BASE_URL}/delete`, {
      data: {
        collegeId: college.id,
      },
    })
      .then((res) => {
        setCollegeList(res.data.colleges);
        showNotification(
          "College Deleted Successfully",
          "College Deleted Successfully",
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
      title: "College ID",
      dataIndex: "collegeID",
      key: "collegeID",
    },
    {
      title: "College Name",
      dataIndex: "collegeName",
      key: "collegeName",
      sorter: (a, b) => a.collegeName > b.collegeName,
      ...getColumnSearchProps("collegeName"),
    },
    {
      title: "College Email",
      dataIndex: "collegeEmail",
      key: "collegeEmail",
      ...getColumnSearchProps("collegeEmail"),
    },
    {
      title: "Registered On",
      dataIndex: "registeredOn",
      key: "registeredOn",
      render: (registeredOn) =>
        moment(registeredOn).format("DD MMM YYYY | hh:mm"),
      sorter: (a, b) => moment.utc(a.registeredOn).diff(moment.utc(b.registeredOn)),
    },
    {
      title: "Quota Status",
      key: "quoteStatus",
      render: (college) =>
        `${college.certificatesUploaded} / ${college.certificatesQuota}`,
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
                    onClick={() => handleCollegeDisplay(record.index)}
                  />
                </Tooltip>
                <Tooltip title="Edit">
                  <EditOutlined onClick={() => handleCollegeEdit(record)} />
                </Tooltip>
              </>
            )}
            <Tooltip title={isBlocked ? "Unblock" : "Block"}>
              {isBlocked ? (
                <CheckCircleOutlined
                  onClick={() => handleCollegeBlockUnblock(record, isBlocked)}
                />
              ) : (
                <CloseCircleOutlined
                  onClick={() => handleCollegeBlockUnblock(record, isBlocked)}
                />
              )}
            </Tooltip>
            <Tooltip title="Delete">
              <DeleteOutlined onClick={() => handleCollegeDelete(record)} />
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
    <Colleges>
<TableHeader>
        <div className="title">Colleges</div>
        {/* <div className="actions">
          <Button onClick={handleAddCollege}>
            <UserAddOutlined /> Bulk add  Student
          </Button>
        </div> */}
        <div className="actions">
          <Button onClick={handleAddCollege}>
            <UserAddOutlined /> Add new Student
          </Button>
        </div>

        {/* <div className="actions">

          <div class="search"><input class="form-control" type="text"
            placeholder="search" aria-label="Search" /></div>
         
        </div> */}
        {/* <div className="actions">
          <Button onClick={handleAddCollege}>
            <AlignCenterOutlined /> Filter
          </Button>
        </div> */}
      </TableHeader>







      {/* <TableHeader>
        <div className="title">Colleges</div>
        <div className="actions">
          <Button onClick={handleAddCollege}>
            <UserAddOutlined /> Add new College
          </Button>
        </div>
      </TableHeader> */}
      <Table
        columns={columns}
        dataSource={collegeList || []}
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
              {currentContactInfo.collegeName} <br />
            </div>
            <div className="email">
              <MailOutlined />
              {currentContactInfo.collegeEmail}
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
    </Colleges>
  );
};

export default CollegeTable;
