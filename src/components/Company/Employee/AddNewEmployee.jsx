import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message, Modal, DatePicker } from "antd";
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
import { EmployeeForm } from "./styles";


export const AddNewEmployee = ({ isUpdating = false }) => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const BASE_URL = `${ROOT_URL}/company/employee`;

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

  const initialValues = getFormattedData(
    useSelector((state) => state.company.current_employee.employeeDetail) || {},
    isUpdating
  );
  console.log(initialValues)

  const onFinish = (values) => {
    const formData = getCorrectedFormData(values);
    if (isUpdating) {
      Axios.put(`${BASE_URL}/`, {
        id: initialValues._id,
        ...formData,
      })
        .then((res) => {
          showNotification(
            "Employee Updated Successfully",
            "Employee Updated Successfully",
            "success"
          );
          navigate(`?module=employee&view=details&id=${initialValues._id}`);
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
            "Employee Registered Successfully",
            "Employee Registered Successfully",
            "success"
          );
          navigate(`?module=employee&view=list`);
        })
        .catch((err) => {
          console.log(err);
          showNotification("Server Error", "Internal Server Error", "error");
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    const formData = getCorrectedFormData(errorInfo.values);
    console.log("Failed:", errorInfo, formData);
  };

  useEffect(() => {
    if (isUpdating) {
      setFileList([{ url: initialValues.profilePictureUrl }]);
    }
  }, []);

  return (
    <EmployeeForm>
      <div className="form-title">
        {isUpdating ? "Edit" : "Enter New"} Employee Details
      </div>
      <Form
        name="Employee Form"
        initialValues={isUpdating ? initialValues : {}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input Name!",
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="contactNumber"
          label="Contact Number"
          rules={[{ required: true, message: "Please input phone number!" }]}
        >
          <Input addonBefore={prefixSelector} placeholder="Phone Number" />
        </Form.Item>

        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={[{ required: true, message: "Please select Date of Birth!" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="profilePictureUrl"
          label="Profile Picture"
          rules={[
            {
              required: true,
              message: "Please upload Profile Picture!",
            },
          ]}
        >
          <Upload
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

        <Form.Item
          name="linkedInUrl"
          label="LinkedIn Url"
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

        {/* ------------------------- Company Data --------------------- */}

        <Form.Item
          name="email"
          label="Company Email"
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

        <Form.Item
          name="uniqueId"
          label="Company Unique ID"
          rules={[
            {
              required: true,
              message: "Please input Company Unique ID!",
            },
          ]}
        >
          <Input placeholder="Company Unique ID" />
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
    </EmployeeForm>
  );
};

export default AddNewEmployee;
