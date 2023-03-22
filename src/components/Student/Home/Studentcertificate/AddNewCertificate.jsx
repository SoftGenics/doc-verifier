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

export const AddNewstudentCertificate = ({ isUpdating = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = `${ROOT_URL}/home/certificate`;
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
                <h3 class="text-primary">
                  <strong>Fill your Detailss</strong>
                </h3>
              </div>
              <div class="mb-3">
                <label for="text" name="name" class="form-label">
                  Student Name
                </label>
                <input type="text" class="form-control" for="form3Example1c" />
              </div>
              <div class="mb-3">
                <label for="" name="Registration_no" class="form-label">
                  Registration Number
                </label>
                <input type="number" class="form-control" for="phoneno" />
              </div>
              <div class="mb-3">
                <label for="" class="form-label">
                  {" "}
                  Address
                </label>
                <input type="text" class="form-control" id="email" />
              </div>

              {/* <div class="mb-3">
                <label for="" class="form-label"> Postcode</label>
                <input type="number" class="form-control" id="" />
              </div> */}
              <div class="mb-3">
                <label for="text" name="parentsname" class="form-label">
                  Parent's name
                </label>
                <input type="email" class="form-control" id="email" />
              </div>

              <div class="mb-3">
                <label
                  for="contactNumber"
                  name="contactNumber"
                  class="form-label"
                >
                  Contact phone
                </label>
                <input type="email" class="form-control" for="phoneno" />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">
                  Email id{" "}
                </label>
                <input type="email" class="form-control" for="phoneno" />
              </div>

              <div class="mb-3">
                <label for="linkedinUrl" class="form-label">
                  Linkedin{" "}
                </label>
                <input type="text" class="form-control" for="linkedinUrl" />
              </div>

              <Form.Item
                name="profilePictureUrl"
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
                <label class="form-check-label" for="terms">
                  I agree terms and conditions.
                </label>
              </div>
              <div class="text-center mt-3">
                <button type="submit" class="btn btn-primary btn-rounded w-75">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </body>

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

export default AddNewstudentCertificate;
