import { Form, Select } from "antd";
import moment from "moment";

const { Option } = Select;

export const getCorrectedFormData = (values, certificateQuota, isUpdating) => {
  const correctedData = { ...values };
  if (correctedData["profilePictureUrl"]?.file) {
    correctedData["profilePictureUrl"] =
      correctedData["profilePictureUrl"]?.file?.response?.downloadLink;
  }
  if (correctedData["dob"].isValid) {
    correctedData["dob"] = moment(correctedData["dob"]).format("YYYY-MM-DD");
  }

  return correctedData;
};

export const getFormattedData = (data, isUpdating) => {
  if (!isUpdating) return {};
  let correctedData = {
    ...data,
  };
  correctedData["dob"] = moment(correctedData["dob"], "YYYY-MM-DD");
  return correctedData;
};

export const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select defaultValue="91" style={{ width: 70 }}>
      <Option value="91">+91</Option>
    </Select>
  </Form.Item>
);

export const stateOption = (
  <Select allowClear placeholder="State" showSearch>
    <Option value="Andhra Pradesh">Andhra Pradesh</Option>
    <Option value="Arunachal Pradesh">Arunachal Pradesh</Option>
    <Option value="Assam">Assam</Option>
    <Option value="Bihar">Bihar</Option>
    <Option value="Chhattisgarh">Chhattisgarh</Option>
    <Option value="Goa">Goa</Option>
    <Option value="Gujarat">Gujarat</Option>
    <Option value="Haryana">Haryana</Option>
    <Option value="Himachal Pradesh">Himachal Pradesh</Option>
    <Option value="Jammu and Kashmir">Jammu and Kashmir</Option>
    <Option value="Jharkhand">Jharkhand</Option>
    <Option value="Karnataka">Karnataka</Option>
    <Option value="Kerala">Kerala</Option>
    <Option value="Madhya Pradesh">Madhya Pradesh</Option>
    <Option value="Maharashtra">Maharashtra</Option>
    <Option value="Manipur">Manipur</Option>
    <Option value="Meghalaya">Meghalaya</Option>
    <Option value="Mizoram">Mizoram</Option>
    <Option value="Nagaland">Nagaland</Option>
    <Option value="Odisha">Odisha</Option>
    <Option value="Punjab">Punjab</Option>
    <Option value="Rajasthan">Rajasthan</Option>
    <Option value="Sikkim">Sikkim</Option>
    <Option value="Tamil Nadu">Tamil Nadu</Option>
    <Option value="Telangana">Telangana</Option>
    <Option value="Tripura">Tripura</Option>
    <Option value="Uttarakhand">Uttarakhand</Option>
    <Option value="Uttar Pradesh">Uttar Pradesh</Option>
    <Option value="West Bengal">West Bengal</Option>
  </Select>
);
