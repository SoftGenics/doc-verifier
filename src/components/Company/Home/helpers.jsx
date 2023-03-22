import { Form, Select } from "antd";

const { Option } = Select;

export const getFormattedData = (data) => {
  let correctedData = {
    ...data,
    correspondentName: data.correspondent.name,
    correspondentEmail: data.correspondent.email,
    correspondentEmploymentProofUrl: data.correspondent.employmentProofUrl,
    correspondentIdentityProofUrl: data.correspondent.identityProofUrl,
    correspondentAadhaarNumber: data.correspondent.aadhaarNumber,
    correspondentPhoneNumber: data.correspondent.phoneNumber,
  };
  delete correctedData["correspondent"];
  return correctedData;
};

export const getCorrectedFormData = (values, certificateQuota) => {
  const correctedData = { ...values };
  const correspondent = {
    name: correctedData.correspondentName,
    email: correctedData.correspondentEmail,
    employmentProofUrl: correctedData.correspondentEmploymentProofUrl,
    identityProofUrl: correctedData.correspondentIdentityProofUrl,
    aadhaarNumber: correctedData.correspondentAadhaarNumber,
    phoneNumber: correctedData.correspondentPhoneNumber,
  };
  delete correctedData.correspondentName;
  delete correctedData.correspondentEmail;
  delete correctedData.correspondentEmploymentProofUrl;
  delete correctedData.correspondentIdentityProofUrl;
  delete correctedData.correspondentAadhaarNumber;
  delete correctedData.correspondentPhoneNumber;
  correctedData["correspondent"] = correspondent;
  correctedData["certificateQuota"] = certificateQuota;
  if (correctedData["logoUrl"].file) {
    correctedData["logoUrl"] =
      correctedData["logoUrl"].file.response.downloadLink;
  }
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
