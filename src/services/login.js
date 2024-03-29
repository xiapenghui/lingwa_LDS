import request from '@/utils/request';
import globalConfig from '../../config/defaultSettings';
const path = `${globalConfig.ip}:${globalConfig.port.sspalds_role}/sspalds-role`
 


// const path = "http://localhost:8072/sspalds-role";
export async function fakeAccountLogin(params) {
  return request(`${path}/api/login/account`, {
    // return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
