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

export const Editprofile = ({ isUpdating = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = `${ROOT_URL}/student/home/certificate`;
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
        navigate(`?module=student&view=details&id=${employeeId}`);
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
      
      <body class="bg-color">
        <section class="container mt-5">
          <div class="row justify-content-md-center">
            <form class="col-md-6 col-sm-12 bg-white p-5 rounded shadow">
              <div class="col-12 text-center">
                <h3 class="text-primary"><strong>Fill your Details</strong></h3>
              </div>
              <div class="mb-3">
                <label for="text" class="form-label">Student Name</label>
                <input type="text" class="form-control" for="form3Example1c" />
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Registration Number</label>
                <input type="number" class="form-control" for="phoneno" />
              </div>
              <div class="mb-3">
                <label for="" class="form-label"> Address</label>
                <input type="text" class="form-control" id="email" />
              </div>

              <div class="mb-3">
                <label for="" class="form-label"> Postcode</label>
                <input type="number" class="form-control" id="" />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Parent's name</label>
                <input type="email" class="form-control" id="email" />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Contact phone</label>
                <input type="email" class="form-control" for="phoneno" />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email id </label>
                <input type="email" class="form-control" for="phoneno" />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Linkedin  </label>
                <input type="email" class="form-control" for="phoneno" />
              </div>

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




              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="terms" />
                <label class="form-check-label" for="terms">I agree terms and conditions.</label>
              </div>
              <div class="text-center mt-3">
                <button type="submit" class="btn btn-primary btn-rounded w-75">Submit</button>
              </div>


            </form>
          </div>
        </section>
      </body>















      {/* <Form
        // name="Certificate Form"
        // initialValues={{ employeeEmail: currentEmployeeEmail }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        // autoComplete="off"
      >
        <Form.Item
          name="Studentname"
          label="Student Name"
          rules={[
            {
              type: "text",
              message: "The input is not valid Studentname!",
            },
            {
              required: true,
              message: "Please input Studentname!",
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
          name="Registrationnumber"
          label="Registration Number"
          rules={[
            {
              type: "number",
              // message: "The input is not valid registration no!",
            },
            {
              required: true,
              message: "Please input Registration Number!",
            },
          ]}
        >
          <Input placeholder="Registration Number" />
        </Form.Item>








        <Form.Item
          name="Parentsname"
          label="Parent's Name"
          rules={[
            {
              required: true,
              message: "Please input Parent's Name!",
            },
          ]}
        >
          <Input placeholder="Parent's Name" />
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
      </Form> */}
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

export default Editprofile;
