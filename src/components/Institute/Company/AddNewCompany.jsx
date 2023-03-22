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

export const AddNewCompany = ({ isUpdating = false }) => {
  const navigate = useNavigate();
  const BASE_URL = `${ROOT_URL}/institute/company`;

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
      // setCertificateQuota(initialValues.certificateQuota);
    }
  }, []);

  return (
    <CompanyForm>
      <div className="form-title">
        {isUpdating ? "Edit" : "Enter New"} Certificate Details
      </div>

      <Form
        name="Company Form"
        initialValues={isUpdating ? initialValues : {}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="Student Name"
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
          name="secondaryNumber"
          label="Student ID"
          rules={[
            {
              required: true,
              message: "Please input Student ID!",
            },
          ]}
        >
          <Input placeholder="Student ID" />
        </Form.Item>

        <Form.Item
          name="cinNumber"
          label="Select Category"
          rules={[
            {
              required: true,
              message: "Please input the Corporate Identification Number!",
            },
          ]}
        >
          <select
            class="form-control dropdown-toggle"
            id="exampleFormControlSelect1"
          >
            <option>Select Category</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </Form.Item>

    

        <Form.Item
          name="cinNumber"
          label="Select Course"
          rules={[
            {
              required: true,
              message: "Please input the Corporate Identification Number!",
            },
          ]}
        >
          <select
            class="form-control dropdown-toggle"
            id="exampleFormControlSelect1"
          >
            <option>Select Course</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </Form.Item>

        <Form.Item
          name="cinNumber"
          label="Select Template"
          rules={[
            {
              required: true,
              message: "Please input the Corporate Identification Number!",
            },
          ]}
        >
          <select
            class="form-control dropdown-toggle"
            id="exampleFormControlSelect1"
          >
            <option>Select Template</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </Form.Item>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            All entered data have been cross verified
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

export default AddNewCompany;
