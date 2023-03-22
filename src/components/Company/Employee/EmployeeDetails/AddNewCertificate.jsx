import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Slider,
  Upload,
  message,
  Modal,
  Select,
} from "antd";
import Axios from "axios";
import { ROOT_URL } from "../../../../App";
import * as actionTypes from "../../../../store/actions";
import { showNotification } from "../../../../util/notification";
import { CertificateForm } from "../styles";

const { Option } = Select;

const dummyData = {
  email: "sabina_williamson@gmail.com",
};

export const AddNewCertificate = ({ isUpdating = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = `${ROOT_URL}/company/employee/certificate`;
  const [query] = useSearchParams();

  /* -------------------- Upload handling --------------------------- */
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg"
    ) {
      window.open(file.response.downloadLink || file);
    } else {
      const correctedUrl = file.thumbUrl || file;
      setPreviewImage(correctedUrl);
      setPreviewOpen(true);
    }
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleUpload = (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const formData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    formData.append("file", file);
    formData.append("category", "Company Employee Certificate");
    Axios.post(`${ROOT_URL}/company/upload-document`, formData, config)
      .then((res) => {
        message.success("Uploaded successfully");
        onSuccess(res.data);
      })
      .catch((err) => {
        message.error("Upload Failed");
        onError(err);
      });
  };

  /* ----------------------- Form handling ---------------------------------------- */

  const currentEmployee =
    useSelector((state) => state.company.current_employee) || {};
  const {
    employeeDetail: { email: currentEmployeeEmail },
  } = currentEmployee;

  const onFinish = (values) => {
    const formData = values;
    formData["certificateLink"] =
      formData["certificateLink"].file.response.downloadLink;
    Axios.post(`${BASE_URL}/issue`, {
      ...formData,
    })
      .then((res) => {
        const { certificates } = res.data;
        showNotification(
          "Certificate Issued Successfully",
          "Certificate Issued Successfully",
          "success"
        );
        dispatch({
          type: actionTypes.SAVE_COMPANY_EMPLOYEE_CERTIFICATE,
          certificates: certificates,
        });

        const employeeId = query.get("id") || "";
        navigate(`?module=employee&view=details&id=${employeeId}`);
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (



    
    <CertificateForm>
      <div className="form-title">Enter New Certificates Details</div>
      <Form
        name="Certificate Form"
        initialValues={{ employeeEmail: currentEmployeeEmail }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="employeeEmail"
          label="Employee Eddmail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input E-mail!",
            },
          ]}
        >
          <Input
            disabled
            placeholder="Employee E-mail"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          name="certificateName"
          label="Certificate Name"
          rules={[
            {
              required: true,
              message: "Please input Certificate Name!",
            },
          ]}
        >
          <Input placeholder="Certificate Name" />
        </Form.Item>

        <Form.Item
          name="certificateCategory"
          label="Category"
          rules={[
            { required: true, message: "Please enter certificate category!" },
          ]}
        >
          <Select allowClear placeholder="Category" showSearch>
            <Option value="Academics">Academics</Option>
            <Option value="Corporate">Corporate</Option>
            <Option value="Internship">Internship</Option>
            <Option value="Hackathon">Hackathon</Option>
            <Option value="Online Course">Online Course</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="certificateLink"
          label="Certificate"
          className="cert-pload"
          rules={[
            {
              required: true,
              message: "Please upload certificate!",
            },
          ]}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            maxCount={1}
            customRequest={handleUpload}
          >
            {uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item className="submit-btn">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal
        open={previewOpen}
        title={false}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </CertificateForm>
  );
};

export default AddNewCertificate;
