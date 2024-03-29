import { stringify } from "querystring";
import { history } from "umi";
import { postListInit } from "@/services/demand/classPlan";
import { setAuthority } from "@/utils/authority";
import { getPageQuery } from "@/utils/utils";
import { message } from "antd";
import { resolve } from "path";

const TableName = "classPlan";
const Model = {
  namespace: TableName,
  state: {
    productList: [],
    TableList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname == `/demand/${TableName}`) {
          dispatch({
            type: "query",
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      const data = yield call(postListInit, payload);
      if (data.status !== "200") {
        return message.error(data.message);
      } else if (data.status == "200") {
        yield put({
          type: "querySuccessed",
          payload: {
            type: "postListInit",
            data: data.list,
          },
        });
        // return message.success(data.message);
      }
    },
  },
  reducers: {
    querySuccessed(state, { payload }) {
      if (payload.type === "getProduct") {
        return {
          ...state,
          ...payload,
          productList: payload.data,
        };
      } else if (payload.type === "postListInit") {
        return {
          ...state,
          ...payload,
          TableList: payload.data,
        };
      }
    },
  },
};
export default Model;
