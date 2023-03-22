import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { ROOT_URL } from "../../../App";
import { showNotification } from "../../../util/notification";
import { CertificateForm } from "./styles";

const { Option } = Select;

export const AddDocs = ({ isUpdating = false }) => {
//   const navigate = useNavigate();
//   const BASE_URL = `${ROOT_URL}/company/external-certificates`;

//   /* -------------------- Upload handling --------------------------- */
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
  const handlePngUpload = (file) => {
    const isPNG =
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg";
    if (!isPNG) {
      message.error(`${file.name} is not an Image file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  };

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
    // Axios.post(`${ROOT_URL}/company/upload-document`, formData, config)
    //   .then((res) => {
    //     message.success("Uploaded successfully");
    //     onSuccess(res.data);
    //   })
    //   .catch((err) => {
    //     message.error("Upload Failed");
    //     onError(err);
    //   });
  };

//   /* ----------------------- Form handling ---------------------------------------- */

//   const onFinish = (values) => {
//     const formData = values;
//     formData["certificateUrl"] =
//       formData["certificateUrl"].file.response.downloadLink;

//     Axios.get(`${BASE_URL}/check-external-user-email`, {
//       params: {
//         userEmail: formData.userEmail,
//       },
//     })
//       .then((res) => {
//         if (!res.data.valid) {throw new Error('User Email is Invalid')}
//         Axios.post(`${BASE_URL}/`, {
//           ...formData,
//         })
//           .then((res) => {
//             showNotification(
//               "Certificate Issued Successfully",
//               "Certificate Issued Successfully",
//               "success"
//             );
//             navigate(`?module=external&view=list`);
//           })
//           .catch((err) => {
//             console.log(err);
//             showNotification("Server Error", "500 Server Error", "error");
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//         showNotification("Server Error", err.message, "error");
//       });
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

  return (
    <CertificateForm>
      <div className="form-title">Add Documents</div>

      <Form
        name="Certificate Form"
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="Coursename"
          label="Course Name"
          rules={[
            {
              type: "text",
              message: "The input is not valid Course Name!",
            },
            {
              required: true,
              message: "Please input Course Name!",
            },
          ]}
        >
          <Input placeholder="Course Name"  />
        </Form.Item>

        <Form.Item
          name="Givenby"
          label="Given By"
          rules={[
            {
              required: true,
              message: "Please input Given By!",
            },
          ]}
        >
          <Input placeholder="Given By" />
        </Form.Item>

        <Form.Item
          name="Givenby"
          label="Start date"
          for="startDate"
          rules={[
            {
              required: true,
              message: "Please input date!",
            },
          ]}
        >
        <input id="startDate" class="form-control" type="date" />
        </Form.Item>

        {/* <label for="startDate">Start</label> */}




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
          name="certificateUrl"
          label="Certificate"
        //   className="cert-upload"
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
        // open={previewOpen}
        title={false}
        footer={null}
        // onCancel={handleCancel}
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

export default AddDocs;