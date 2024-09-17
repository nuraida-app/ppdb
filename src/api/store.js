import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { authApi } from "./service/authApi";
import { paymentApi } from "./service/paymentApi";
import { eduApi } from "./service/eduApi";
import { yearApi } from "./service/yearApi";
import { schoolApi } from "./service/schoolApi";
import { postApi } from "./service/postApi";
import { contactApi } from "./service/contactApi";
import { formApi } from "./service/formApi";
import { areaApi } from "./service/areaApi";
import { statisticApi } from "./service/staticticApi";
import { userApi } from "./service/userApi";
import { chatApi } from "./service/chatApi";
import { appApi } from "./service/appApi";

const store = configureStore({
  reducer: {
    user: authReducer,
    [appApi.reducerPath]: appApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [eduApi.reducerPath]: eduApi.reducer,
    [yearApi.reducerPath]: yearApi.reducer,
    [schoolApi.reducerPath]: schoolApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [formApi.reducerPath]: formApi.reducer,
    [areaApi.reducerPath]: areaApi.reducer,
    [statisticApi.reducerPath]: statisticApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      appApi.middleware,
      authApi.middleware,
      userApi.middleware,
      paymentApi.middleware,
      eduApi.middleware,
      yearApi.middleware,
      schoolApi.middleware,
      postApi.middleware,
      contactApi.middleware,
      formApi.middleware,
      areaApi.middleware,
      statisticApi.middleware,
      chatApi.middleware,
    ]),
});

export default store;
