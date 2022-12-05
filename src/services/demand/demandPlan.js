import request from "@/utils/request";
import globalConfig from "../../../config/defaultSettings";
// const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_adm}/yshyerp-adm/api/customer`
const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_sspa}`;
// const ip = `http://smartflow.diskstation.me:8107`;
/**
 * 查询条件初始化
 */

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
  return request(`${ip}/WebAPI/api/AutoClassShowInfo/ListInfo`, {
    method: "POST",
    data: { ...params },
  });
}


