import request from "@/utils/request";
import globalConfig from "../../../config/defaultSettings";
const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_sspa}`;
// const ip = `http://smartflow.diskstation.me:8107`;

/**
 * 查询条件初始化
 */
// export async function getDropDownInit(params) {
//   return request(`${ip}/WebAPI/api/Common/GetProductAreaTextValuePair`, {
//     method: 'POST',
//     data: { ...params },
//   });
// }

//工厂名称接口
export async function getProduct() {
  return request(`${ip}/WebAPI/api/Common/GetProductFamilyIdText`, {
    method: "POST",
  });
}

/**
 * 查询
 */
export async function postListInit(params) {
  return request(`${ip}/WebAPI/api/AutoClassDisPatch/List`, {
    method: "POST",
    data: { ...params },
  });
}

// 线体接口
export async function getLine(params) {
  return request(`${ip}/WebAPI/api/Common/GetProductLineTextIdText`, {
    method: 'POST',
    data: { ...params }
  });
}


// 成员
export async function EmployeeNoList(params) {
  return request(`${ip}/WebAPI/api/AutoClassDisPatch/EmployeeNoList`, {
    method: "POST",
    data: { ...params },
  });
}
 
//编辑
export async function Modify(params) {
  return request(`${ip}/WebAPI/api/AutoClassDisPatch/Modify`, {
    method: "POST",
    data: { ...params },
  });
}
 
 
//产线
export async function LineInfo(params) {
  return request(`${ip}/WebAPI/api/AutoClassDisPatch/LineInfo`, {
    method: "POST",
    data: { ...params },
  });
}


// 可用人员
export async function ClassCUseWorker(params) {
  return request(`${ip}/WebAPI/api/AutoClassDisPatch/ClassCUseWorker`, {
    method: "POST",
    data: { ...params },
  });
}

 
//  增加班次弹窗
export async function AddClass(params) {
  return request(`${ip}/WebAPI/api/AutoClassDisPatch/AddClass`, {
    method: "POST",
    data: { ...params },
  });
}
