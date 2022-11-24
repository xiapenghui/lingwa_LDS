import { stringify } from "querystring";
import { history } from "umi";
import { getProduct, postListInit } from "@/services/demand/demandPlan";
import { setAuthority } from "@/utils/authority";
import { getPageQuery } from "@/utils/utils";
import { message } from "antd";
import { resolve } from "path";

const TableName = "demandPlan";
const Model = {
  namespace: TableName,
  state: {
    TableList: [],
    productList: {},
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
    /**
     *
     * @param {getProduct} 查询初始化
     * @param {query} 查询
     */

    // 查询工厂名称信息
    *getProduct({ payload }, { call, put, select }) {
      const data = yield call(getProduct);
      if (data.status !== "200") {
        return message.error(data.message);
      } else if (data.status == "200") {
        yield put({
          type: "querySuccessed",
          payload: {
            type: "getProduct",
            data: data.list,
          },
        });
        return message.success(data.message);
      }
    },

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
