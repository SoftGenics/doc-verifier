import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Highlighter from "react-highlight-words";
import moment from "moment";
import { Button, Input, Space, Table, Tooltip } from "antd";
import {
  DeleteOutlined,
  FolderViewOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import { ROOT_URL } from "../../../App";
import * as actionTypes from "../../../store/actions";
import { showNotification } from "../../../util/notification";
import { Ellipsis, Employees, TableHeader } from "./styles";


export const EmployeeList = () => {
  const BASE_URL = `${ROOT_URL}/company/employee`;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [employeeList, setEmployeeList] = useState([]);

  const fetchEmployeeList = () => {
    Axios.get(`${BASE_URL}/list`, {})
      .then((res) => {
        setEmployeeList(res.data.employees);
        dispatch({
          type: actionTypes.SAVE_ADMIN_COMPANIES,
          employee_list: res.data.companies,
        });
        showNotification(
          "List Fetched Successfully",
          "List Fetched Successfully",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);

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

  const handleAddEmployee = () => {
    navigate("?module=employee&view=new");
  };

  const handleEmployeeDetails = (employee) => {
    navigate(`?module=employee&view=details&id=${employee.id}`);
  };

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
      title: "Employee ID",
      dataIndex: "employeeID",
      key: "employeeID",
      render: (employeeID) => <Tooltip title={employeeID}><Ellipsis width={100}>{employeeID}</Ellipsis></Tooltip>,
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      sorter: (a, b) => a.employeeName > b.employeeName,
      ...getColumnSearchProps("employeeName"),
    },
    {
      title: "Employee Email",
      dataIndex: "employeeEmail",
      key: "employeeEmail",
      ...getColumnSearchProps("employeeEmail"),
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
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div>
          <Tooltip title="View">
            <FolderViewOutlined onClick={() => handleEmployeeDetails(record)} />
          </Tooltip>
          <Tooltip title="Remove">
            <DeleteOutlined onClick={() => handleEmployeeRemove(record)} />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Employees>
      <TableHeader>
        <div className="title ">Employees</div>
        <div className="">
          <Button onClick={handleAddEmployee}>
            <UserAddOutlined /> Add new Employee
          </Button>
        </div>
      </TableHeader>
      <Table
        columns={columns}
        dataSource={employeeList}
        pagination={{
          defaultPageSize: 6,
        }}
      />
    </Employees>
  );
};

export default EmployeeList;
