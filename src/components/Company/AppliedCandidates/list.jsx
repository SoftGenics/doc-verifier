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
import { ROOT_URL } from "../../../App";
import * as actionTypes from "../../../store/actions";
import { showNotification } from "../../../util/notification";
import { Candidates, Ellipsis, TableHeader } from "./styles";

export const CandidateList = () => {
  const BASE_URL = `${ROOT_URL}/company/application`;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [candidateList, setCandidateList] = useState([]);

  const fetchCandidateList = () => {
    Axios.get(`${BASE_URL}/list`, {})
      .then((res) => {
        setCandidateList(res.data.applications);
        dispatch({
          type: actionTypes.SAVE_ADMIN_COMPANIES,
          candidate_list: res.data.companies,
        });
        showNotification(
          "Application List Fetched Successfully",
          "Application List Fetched Successfully",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  useEffect(() => {
    fetchCandidateList();
    // setCandidateList(dummyData);
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

  const handleCandidateDetails = (candidate) => {
    navigate(`?module=applied&view=details&id=${candidate.id}`);
  };

  const handleCandidateReject = (candidate) => {
    Axios.put(`${BASE_URL}/reject`, {
      applicationId: candidate.id,
    })
      .then((res) => {
        setCandidateList(res.data.applications);
        showNotification(
          "Application Updated Successfully",
          `Application Rejected Successfully`,
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  const handleCandidateAccept = (candidate) => {
    Axios.put(`${BASE_URL}/accept`, {
      applicationId: candidate.id,
    })
      .then((res) => {
        setCandidateList(res.data.applications);
        showNotification(
          "Application Updated Successfully",
          `Application Accepted Successfully`,
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
      title: "Application ID",
      dataIndex: "applicationID",
      key: "applicationID",
      render: (applicationID) => (
        <Tooltip title={applicationID}>
          <Ellipsis width={100}>{applicationID}</Ellipsis>
        </Tooltip>
      ),
    },
    {
      title: "Candidate Name",
      dataIndex: "candidateName",
      key: "candidateName",
      sorter: (a, b) => a.candidateName > b.candidateName,
      ...getColumnSearchProps("candidateName"),
    },
    {
      title: "Candidate Email",
      dataIndex: "candidateEmail",
      key: "candidateEmail",
      ...getColumnSearchProps("candidateEmail"),
    },
    {
      title: "Applied On",
      dataIndex: "appliedOn",
      key: "appliedOn",
      render: (appliedOn) => moment(appliedOn).format("DD MMM YYYY | hh:mm"),
      sorter: (a, b) => moment.utc(a.appliedOn).diff(moment.utc(b.appliedOn)),
    },
    {
      title: "Application Status",
      key: "status",
      align: "center",
      render: ({ status }) => {
        switch (status) {
          case "accepted":
            return (
              <div className="cert-status">
                <div className="s-node node"></div>Accepted
              </div>
            );
          case "pending":
            return (
              <div className="cert-status">
                <div className="p-node node"></div>Pending
              </div>
            );
          case "invalid":
            return (
              <div className="cert-status">
                <div className="f-node node"></div>Invalid
              </div>
            );
          default:
            return "--";
        }
      },
      align: "center",
      filters: [
        {
          text: "Accepted",
          value: "accepted",
        },
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Rejected",
          value: "rejection",
        },
      ],
      defaultFilteredValue: ["pending", "accepted"],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Certificates",
      key: "certificateStats",
      render: ({ certificateStats }) => {
        return (
          <div className="cert-stats">
            <Tooltip title="Verified">
              <div className="s-node cert-node">{certificateStats.verified}</div>
            </Tooltip>
            <Tooltip title="Pending">
              <div className="p-node cert-node">{certificateStats.pending}</div>
            </Tooltip>
            <Tooltip title="Rejected">
              <div className="f-node cert-node">{certificateStats.rejected}</div>
            </Tooltip>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => {
        const isRejected = record.status === "rejected";
        const isAccepted = record.status === "accepted";
        return (
          <div>
            {!isRejected && (
              <>
                <Tooltip title="View">
                  <FolderViewOutlined
                    onClick={() => handleCandidateDetails(record)}
                  />
                </Tooltip>
              </>
            )}
            <Tooltip title="Reject">
              <CloseCircleOutlined
                className={isRejected && "grey-out"}
                onClick={() => handleCandidateReject(record)}
              />
            </Tooltip>
            <Tooltip title="Accept">
              <CheckCircleOutlined
                className={isAccepted && "grey-out"}
                onClick={() => handleCandidateAccept(record)}
              />
            </Tooltip>
          </div>
        );
      },
      filters: [
        {
          text: "Rejected",
          value: "rejected",
        },
        {
          text: "Accepted",
          value: "accepted",
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  return (
    <Candidates>
      <TableHeader>
        <div className="title">Applications</div>
      </TableHeader>
      <Table
        columns={columns}
        dataSource={candidateList}
        pagination={{
          defaultPageSize: 6,
        }}
      />
    </Candidates>
  );
};

export default CandidateList;
