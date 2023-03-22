// import { useState } from "react";

// import { TimelineBody, HeaderContainer, Body } from "./styles";

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
  AlignCenterOutlined ,
} from "@ant-design/icons";
import Axios from "axios";
import { ROOT_URL } from "../../../App";
import * as actionTypes from "../../../store/actions";
import { showNotification } from "../../../util/notification";
import { HeaderContainer, Academicsstyle, AcademicTable } from "./styles";

export const Lifeskillcertificate = () => {
  const BASE_URL = `${ROOT_URL}/student/documents`;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [AcademicsList, setAcademicsList] = useState([]);

  const fetchAcademicsList = () => {
    // Axios.get(`${BASE_URL}/academics`, {})
    //   .then((res) => {
    //     setAcademicsList(res.data.Academicss);
    //     dispatch({
    //       type: actionTypes.SAVE_ADMIN_COMPANIES,
    //       Academics_list: res.data.companies,
    //     });
    //     showNotification(
    //       "List Fetched Successfully",
    //       "List Fetched Successfully",
    //       "success"
    //     );
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     showNotification("Server Error", "Internal Server Error", "error");
    //   });
  };

  useEffect(() => {
    fetchAcademicsList();
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

  const handleCarrierskill = () => {
    navigate("?module=Academics&view=new");
  };

  const handleCarrierskillDetails = (Academics) => {
    navigate(`?module=Academics&view=details&id=${Academics.id}`);
  };

  const handleAcademicsRemove = (Academics) => {
    console.log(Academics.id, "Remove");

    Axios.delete(`${BASE_URL}/`, {
      data: {
        AcademicsId: Academics.id,
      },
    })
      .then((res) => {
        const remainingEmps = (AcademicsList || []).filter(
          (currAcademics) => currAcademics.id !== Academics.id
        );
        setAcademicsList(remainingEmps);
        showNotification(
          "Academics Updated Successfully",
          `Academics removed Successfully`,
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
      title: "Certificate ID",
      dataIndex: "CertificateID",
      key: "CertificateID",
      render: (AcademicsID) => (
        <Tooltip title={AcademicsID}>
          <HeaderContainer width={100}>{AcademicsID}</HeaderContainer>
        </Tooltip>
      ),
    },
    {
      title: "Certificate Name",
      dataIndex: "CertificateName",
      key: "CertificateName",
      sorter: (a, b) => a.AcademicsName > b.AcademicsName,
      ...getColumnSearchProps("AcademicsName"),
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
      ...getColumnSearchProps("Category"),
    },
    {
      title: "Issues On on",
      dataIndex: "IssuesOn",
      key: "IssuesOn",
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
            <FolderViewOutlined onClick={() => handleCarrierskillDetails(record)} />
          </Tooltip>
          <Tooltip title="Remove">
            <DeleteOutlined onClick={() => handleAcademicsRemove(record)} />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Academicsstyle>
      <AcademicTable>
        <div className="title ">Life Skills Certificates</div>
        {/* <div className="">
          <Button onClick={handleCarrierskill}>
            <AlignCenterOutlined />  Filter
          </Button>
        </div> */}
      </AcademicTable>
      <Table
        columns={columns}
        dataSource={AcademicsList}
        pagination={{
          defaultPageSize: 6,
        }}
      />
    </Academicsstyle>
  );
};


