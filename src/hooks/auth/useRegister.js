import { useReducer } from "react";
import AuthService from "../../services/auth";
const actions = {
  start: "START",
  fulfill: "FULFILL",
  reject: "REJECT",
};

const initialRegisterPayload = {
  data: null,
  loading: false,
  error: null,
};
const registerReducer = (state, action) => {
  console.log(action);
  if (action.type === actions.start) {
    return {
      data: null,
      loading: true,
      error: null,
    };
  }
  if (action.type === actions.fulfill) {
    return {
      ...initialRegisterPayload,
      data: action.payload.data,
    };
  }
  if (action.type === actions.fulfill)
    return {
      ...initialRegisterPayload,
      error: action.payload.error,
    };
};

const useRegister = () => {
  const [registerPayload, dispatch] = useReducer(
    registerReducer,
    initialRegisterPayload
  );

  const registerHandler = async (registerParamPayload) => {
    dispatch({ type: actions.start });
    try {
      const response = await AuthService.post("/signup", registerParamPayload);
      const data = await response.data;
      dispatch({ type: actions.fulfill, payload: { data } });
      // await sendVerificationMail(response.user);
    } catch (error) {
      dispatch({ type: actions.reject, payload: { error } });
    }
  };
  return { registerPayload, registerHandler };
};

export default useRegister;
