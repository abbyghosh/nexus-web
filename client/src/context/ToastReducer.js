const ToastReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      return {
        isActive: true,
        msg: action.payload,
        severity: "success",
      };

    case "ERROR":
      return {
        isActive: true,
        msg: action.payload,
        severity: "error",
      };

    case "WARNING":
      return {
        isActive: true,
        msg: action.payload,
        severity: "warning",
      };

    case "DISABLE":
      return {
        isActive: false,
        msg: "",
        severity: "",
      };

    default:
      return state;
  }
};

export default ToastReducer;
