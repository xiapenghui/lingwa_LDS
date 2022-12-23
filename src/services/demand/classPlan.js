import request from "@/utils/request";
import globalConfig from "../../../config/defaultSettings";
// const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_adm}/yshyerp-adm/api/customer`
const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_sspa}`;
// const ip = `http://smartflow.diskstation.me:8107`;

/**
 * 查询
 */
export async function echartsInit(params) {
  return request(`${ip}/WebAPI/api/AutoClassPlanShow/List`, {
    method: "POST",
    data: { ...params },
  });
}

//求和
export async function tableShow(params) {
  return request(`${ip}/WebAPI/api/AutoClassPlanShow/ListInfo`, {
    method: "POST",
    data: { ...params },
  });
}


//折线
export async function ListLine(params) {
  return request(`${ip}/WebAPI/api/AutoClassPlanShow/ListLine`, {
    method: "POST",
    data: { ...params },
  });
}

 
//折线
export async function Modify(params) {
  return request(`${ip}/WebAPI/api/AutoClassPlanShow/Modify`, {
    method: "POST",
    data: { ...params },
  });
}