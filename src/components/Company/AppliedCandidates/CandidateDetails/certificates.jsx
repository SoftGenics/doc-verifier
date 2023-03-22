import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Highlighter from "react-highlight-words";
import moment from "moment";
import { Button, Input, Space, Table, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FolderViewOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import { ROOT_URL } from "../../../../App";
import * as actionTypes from "../../../../store/actions";
import { showNotification } from "../../../../util/notification";
import { Certificates, TableHeader, CustomModal } from "../styles";

export const CertificateList = ({ certificateList, setCertificateList }) => {
  const BASE_URL = `${ROOT_URL}/admin/certificate`;

  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleCertificateDisplay = (certificate) => {
    setCurrentCertificate(certificate.url);
    showModal();
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
      dataIndex: "certificateID",
      key: "certificateID",
    },
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
    {
      title: "Status",
      key: "status",
      render: ({ status }) => {
        switch (status) {
          case "verified":
            return (
              <div className="cert-status">
                <div className="s-node node"></div>Verified
              </div>
            );
          case "pending":
            return (
              <div className="cert-status">
                <div className="p-node node"></div>Pending
              </div>
            );
          case "rejected":
            return (
              <div className="cert-status">
                <div className="f-node node"></div>Rejected
              </div>
            );
          default:
            return "--";
        }
      },
      align: "center",
      filters: [
        {
          text: "Verified",
          value: "verified",
        },
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Rejected",
          value: "rejected",
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div>
          <Tooltip title="View">
            <FolderViewOutlined
              onClick={() => handleCertificateDisplay(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

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

  return (
    <Certificates>
      <TableHeader>
        <div className="title">Certificates</div>
      </TableHeader>
      <Table
        columns={columns}
        dataSource={certificateList}
        pagination={{
          defaultPageSize: 6,
        }}
      />
      <CustomModal
        title={false}
        footer={false}
        open={isModalOpen}
        onOk={handleOk}
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

export default CertificateList;
