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
} from "antd";
import Axios from "axios";
import { ROOT_URL } from "../../../App";
import { start, stop } from "../../../util/progress";
import { showNotification } from "../../../util/notification";
import {
  getCorrectedFormData,
  getFormattedData,
  prefixSelector,
  stateOption,
} from "./helpers";
import { CompanyForm } from "./styles";

const { TextArea } = Input;

export const AddNewPending = ({ isUpdating = false }) => {
  const navigate = useNavigate();
  const BASE_URL = `${ROOT_URL}/institute/courses`;

  /* -------------------- Upload handling --------------------------- */
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    const correctedUrl = file.thumbUrl || file;
    setPreviewImage(correctedUrl);
    setPreviewOpen(true);
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
    Axios.post(`${ROOT_URL}/admin/upload-document`, formData, config)
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

  const initialValues = getFormattedData(
    useSelector((state) => state.admin.current_company) || {},
    isUpdating
  );

  const onFinish = (values) => {
    const formData = getCorrectedFormData(values, isUpdating);
    if (isUpdating) {
      Axios.put(`${BASE_URL}/`, {
        id: initialValues._id,
        ...formData,
      })
        .then((res) => {
          showNotification(
            "Company Updated Successfully",
            "Company Updated Successfully",
            "success"
          );
          navigate(`?module=courses&view=list`);
        })
        .catch((err) => {
          console.log(err);
          showNotification("Server Error", "Internal Server Error", "error");
        });
    } else {
      Axios.post(`${BASE_URL}/`, {
        ...formData,
      })
        .then((res) => {
          showNotification(
            "Company Registered Successfully",
            "Company Registered Successfully",
            "success"
          );
          navigate(`?module=courses&view=list`);
        })
        .catch((err) => {
          console.log(err);
          showNotification("Server Error", "Internal Server Error", "error");
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (isUpdating) {
      // setCertificateQuota(initialValues.certificateQuota);
    }
  }, []);

  return (
    <CompanyForm>
      <div className="form-title">
        {isUpdating ? "Edit" : "Enter New"} Pending Details
      </div>

      <Form
        name="Company Form"
        initialValues={isUpdating ? initialValues : {}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        

        {isUpdating === false && (
          <Form.Item
            name="logoUrl"
            label="upload Your Certificate"
            rules={[
              {
                required: true,
                message: "Please input Logo URL!",
              },
            ]}
          >
            <Upload
              action={`${ROOT_URL}/admin/upload-document`}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              maxCount={1}
              beforeUpload={handlePngUpload}
              customRequest={handleUpload}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
        )}

        <div class="form-check">
          {/* <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          /> */}
          <label class="form-check-label" for="flexCheckDefault">
           Attach file size of your documents should not exceed 10MB
          </label>
        </div>

        <Form.Item className="submit-btn">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* <Modal
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
      </Modal> */}
    </CompanyForm>
  );
};

export default AddNewPending;
