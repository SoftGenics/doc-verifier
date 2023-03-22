import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
import { showNotification } from "../../../util/notification";
import {
  getCorrectedFormData,
  getFormattedData,
  prefixSelector,
  stateOption,
} from "./helpers";
import { CollegeForm } from "./styles";

export const AddNewCollege = ({ isUpdating = false }) => {
  const navigate = useNavigate();
  const BASE_URL = `${ROOT_URL}/admin/college`;
  const [certificateQuota, setCertificateQuota] = useState(0);

  /* -------------------- Upload handling --------------------------- */
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [logoFileList, setLogoFileList] = useState([]);
  const [ugcFileList, setUGCFileList] = useState([]);
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

  const handleChange =
    (key) =>
    ({ fileList: newFileList }) => {
      if (key === "logo") {
        setLogoFileList(newFileList);
      } else {
        setUGCFileList(newFileList);
      }
    };

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

  const handlePngPdfUpload = (file) => {
    const isPNGOrPDF =
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "application/pdf";
    if (!isPNGOrPDF) {
      message.error(`${file.name} is not of appropriate file type`);
    }
    return isPNGOrPDF || Upload.LIST_IGNORE;
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

  /* -------------------- Form handling --------------------------- */

  const initialValues = getFormattedData(
    useSelector((state) => state.admin.current_college) || {},
    isUpdating
  );

  const onFinish = (values) => {
    const formData = getCorrectedFormData(values, certificateQuota, isUpdating);
    if (isUpdating) {
      Axios.put(`${BASE_URL}/`, {
        id: initialValues._id,
        ...formData,
      })
        .then((res) => {
          showNotification(
            "College Updated Successfully",
            "College Updated Successfully",
            "success"
          );
          navigate(`?module=college&view=list`);
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
            "College Registered Successfully",
            "College Registered Successfully",
            "success"
          );
          navigate(`?module=college&view=list`);
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
      setCertificateQuota(initialValues.certificateQuota);
    }
  }, []);

  return (
    <CollegeForm>
      <div className="form-title">
        {isUpdating ? "Edit" : "Enter New"} student Details
      </div>

      <Form
        name="College Form"
        initialValues={isUpdating ? initialValues : {}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Student Name"
          rules={[
            {
              required: true,
              message: "Please input student Name!",
            },
          ]}
        >
          <Input placeholder="Parent's Name" />
        </Form.Item>
        <Form.Item
          name="name"
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
          name="registrationNumber"
          label="Registration Number"
          rules={[
            { required: true, message: "Please input registration number!" },
          ]}
        >
          <Input placeholder="registration Number" />
        </Form.Item>

        <Form.Item
          name="Contactphone"
          label="Contact phone Number"
          rules={[
            {
              required: true,
              message: "Please input  phone number!",
            },
          ]}
        >
          <Input addonBefore={prefixSelector} placeholder=" Phone Number" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Primary Email"
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
          <Input placeholder="E-mail" autoComplete="new-password" />
        </Form.Item>

        {isUpdating === false && (
          <Form.Item
            name="logoUrl"
            label="Logo"
            rules={[
              {
                required: true,
                message: "Please input Logo URL!",
              },
            ]}
          >
            <Upload
              listType="picture-card"
              fileList={logoFileList}
              onPreview={handlePreview}
              onChange={handleChange("logo")}
              maxCount={1}
              beforeUpload={handlePngUpload}
              customRequest={handleUpload}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
        )}

        <Form.Item
          name="linkedinUrl"
          label="LinkedIn URL"
          rules={[
            {
              required: true,
              message: "Please input LinkedIn URL!",
            },
          ]}
        >
          <Input placeholder="LinkedIn URL" />
        </Form.Item>

        {/* ------------------------- Addresses --------------------- */}

        <Form.List name="addresses">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => (
                <div className="address-section" key={key} align="baseline">
                  <div className="address-title">
                    Address {index + 1}
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </div>
                  <br />
                  <Form.Item
                    name={[name, "completeAddress"]}
                    label="Complete Address"
                    rules={[
                      { required: true, message: "Missing Complete Address" },
                    ]}
                  >
                    <Input placeholder="Complete Address" />
                  </Form.Item>
                  <Form.Item
                    name={[name, "city"]}
                    label="City"
                    rules={[{ required: true, message: "Missing City" }]}
                  >
                    <Input placeholder="City" />
                  </Form.Item>
                  <Form.Item
                    name={[name, "state"]}
                    label="State"
                    rules={[{ required: true, message: "Missing State" }]}
                  >
                    {stateOption}
                  </Form.Item>
                  <Form.Item
                    name={[name, "pinCode"]}
                    label="Pincode"
                    rules={[{ required: true, message: "Missing Pin Code" }]}
                  >
                    <Input placeholder="Pin Code" />
                  </Form.Item>
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Address
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

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
    </CollegeForm>
  );
};

export default AddNewCollege;
