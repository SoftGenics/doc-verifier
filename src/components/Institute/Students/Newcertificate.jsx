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

export const StudentDetails = ({ isUpdating = false }) => {
  const navigate = useNavigate();
  const BASE_URL = `${ROOT_URL}/institute/students`;
  const [certificateQuota, setCertificateQuota] = useState(0);

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
    const formData = getCorrectedFormData(values, certificateQuota, isUpdating);
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
          navigate(`?module=company&view=list`);
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
          navigate(`?module=company&view=list`);
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
    <CompanyForm>
      <div className="form-title">
        {isUpdating ? "Edit" : "Enter New"} Student Detailss
      </div>
      <Row style={{ margin: "1rem 0" }}>
        <Col span  md={12} style={{ marginTop: "0.25rem" }}>
        Student Quota
        </Col>
        <Col span xs={8} md={8}>
          <Slider
          
            min={0}
            max={10000}
            onChange={setCertificateQuota}
            value={certificateQuota}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={10000}
            style={{ margin: "0 16px" }}
            value={certificateQuota}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value?.replace(/\s?|(,*)/g, "")}
            onChange={setCertificateQuota}
          />
        </Col>
      </Row>
      <Form
        name="Company Form"
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
              message: "Please input Student Name!",
            },
          ]}
        >
          <Input placeholder="Student Name" />
        </Form.Item>

        <Form.Item
          name="Registration Number"
          label="Registration Number"
          rules={[{ required: true, message: "Please input Registration number!" }]}
        >
          <Input  placeholder="Registration Number" />
        </Form.Item>

        <Form.Item
          name="Parent's name"
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
          name="contactNumber"
          label="Contact Number"
          rules={[{ required: true, message: "Please input phone number!" }]}
        >
          <Input addonBefore={prefixSelector} placeholder="Phone Number" />
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

        <Form.Item
          name="linkedinUrl"
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

       



        {isUpdating === false && (
          <Form.Item
            name="logoUrl"
            label="Logo URL"
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
    </CompanyForm>
  );
};

export default StudentDetails;
