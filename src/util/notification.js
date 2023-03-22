import { notification } from "antd";

export const showNotification = (
  name,
  message,
  status,
  placement = "bottomLeft"
) => {

  notification.destroy()

  if (status === "success") {
    notification.success({
      name,
      message,
      placement,
    });
  } else if (status === "error") {
    notification.error({
      name,
      message,
      placement,
    });
  } else if (status === "warning") {
    notification.warning({
      name,
      message,
      placement,
    });
  }
};
