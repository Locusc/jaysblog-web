import request from 'umi-request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
  verificationCode: string;
}

export async function accountLogin(params: LoginParamsType) {
  return request('/server/api/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function currentUserLogout() {
  return request('/server/api/auth/logout');
}
