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
  Tooltip,
  Modal,
  Image,
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
import { isEmpty } from "lodash";

const { TextArea } = Input;

export const EditCompany = () => {
  const navigate = useNavigate();
  const BASE_URL = `${ROOT_URL}/company`;
  const [certificateQuota, setCertificateQuota] = useState(0);
  const [isOldPasswordPresent, setOldPasswordPresent] = useState(false);

  /* -------------------- Upload handling --------------------------- */
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    const correctedUrl = file.thumbUrl || file.url;
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

  /* -------------------- Form handling --------------------------- */

  const initialValues = getFormattedData(
    useSelector((state) => state.company.company_details) || {}
  );

  const onFinish = (values) => {
    const formData = getCorrectedFormData(values, certificateQuota);
    Axios.put(`${BASE_URL}/update-details`, {
      id: initialValues._id,
      ...formData,
    })
      .then((res) => {
        showNotification(
          "Company Updated Successfully",
          "Company Updated Successfully",
          "success"
        );
        navigate(`?module=home&view=list`);
      })
      .catch((err) => {
        console.log(err);
        showNotification("Server Error", "Internal Server Error", "error");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    setCertificateQuota(initialValues.certificateQuota);
    setFileList([{ url: initialValues.logoUrl }]);
  }, []);

  return (
    <CompanyForm className="container"
      style={{padding:'10px',  marginTop:'-8%',marginRight:'100%'
         
      }}>
      <div className="form-title">Edit Company Details</div>



      
      <Tooltip title="Cannot be edited, Contact Administrator for editing!">


        <Row style={{ margin: "1rem 0" }}>
          <Col span xs={6} md={8} style={{ marginTop: "0.25rem" }}>
            Certificate Quota
          </Col>
          <Col span xs={4} md={8}  >
            <Slider
              min={0}
              max={10000}
              onChange={setCertificateQuota}
              value={certificateQuota}
              disabled
            />
          </Col>
          <Col span xs={6} md={8}>
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
              disabled
            />
          </Col>
        </Row>
      </Tooltip>
      <Form
        name="Company Form"
        initialValues={initialValues}
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
          name="secondaryNumber"
          label="Secondary Number"
          rules={[
            {
              required: true,
              message: "Please input secondary phone number!",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            placeholder="Secondary Phone Number"
          />
        </Form.Item>
        <Tooltip title="Cannot be edited, Contact Administrator for editing!">
          <Form.Item
            name="cinNumber"
            label="Corporate Identification Number"
            rules={[
              {
                required: true,
                message: "Please input the Corporate Identification Number!",
              },
            ]}
          >
            <Input disabled placeholder="Corporate Identification Number" />
          </Form.Item>
        </Tooltip>
        <Form.Item name="faxNumber" label="Fax Number">
          <Input placeholder="Fax number" />
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
          name="secondaryEmail"
          label="Secondary Email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input secondary E-mail!",
            },
          ]}
        >
          <Input placeholder="Secondary E-mail" />
        </Form.Item>

        <Form.Item
          name="oldPassword"
          label="Old Password"
          rules={[
            ({ getFieldValue }) =>
              setOldPasswordPresent(!isEmpty(getFieldValue("old-password"))),
          ]}
        >
          <Input.Password
            placeholder="Old Password"
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item name="newPassword" label="New Password">
          <Input.Password
            disabled={!isOldPasswordPresent}
            placeholder="New Password"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["new-password"]}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new-password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm Password"
            autoComplete="new-password"
            disabled={!isOldPasswordPresent}
          />
        </Form.Item>

        <Form.Item name="motto" label="Motto">
          <Input placeholder="Motto" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input description!",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Description" />
        </Form.Item>

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

        <Form.Item name="instagramUrl" label="Instagram URL">
          <Input placeholder="Instagram URL" />
        </Form.Item>

        <Form.Item name="twitterUrl" label="Twitter URL">
          <Input placeholder="Twitter URL" />
        </Form.Item>

        <Form.Item name="facebookUrl" label="Facebook URL">
          <Input placeholder="Facebook URL" />
        </Form.Item>

        <Form.Item name="youtubeUrl" label="YouTube URL">
          <Input placeholder="YouTube URL" />
        </Form.Item>

        {/* ------------------------- Correspondent --------------------- */}
        <div className="correspondent-section">
          <div className="correspondent-title">Correspondent Details</div>
          <Form.Item
            name="correspondentName"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input Correspondent Name!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="correspondentEmail"
            label="Email"
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
            <Input placeholder="E-mail" />
          </Form.Item>

          <Form.Item
            name="correspondentEmploymentProofUrl"
            label="Employment Proof URL"
            rules={[
              {
                required: true,
                message: "Please input Employment Proof URL!",
              },
            ]}
          >
            <Input placeholder="Employment Proof URL" />
          </Form.Item>

          <Form.Item
            name="correspondentIdentityProofUrl"
            label="Identity Proof URL"
            rules={[
              {
                required: true,
                message: "Please input Identity Proof URL!",
              },
            ]}
          >
            <Input placeholder="Identity Proof URL" />
          </Form.Item>

          <Form.Item
            name="correspondentAadhaarNumber"
            label="Aadhaar Number"
            rules={[
              {
                required: true,
                message: "Please input aadhaar number!",
              },
            ]}
          >
            <Input placeholder="Aadhaar Number" />
          </Form.Item>

          <Form.Item
            name="correspondentPhoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: "Please input phone number!" }]}
          >
            <Input addonBefore={prefixSelector} placeholder="Phone Number" />
          </Form.Item>
        </div>

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

export default EditCompany;
