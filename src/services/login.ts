import request from 'umi-request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
  verificationCode: string;
}

export async function accountLogin(params: LoginParamsType) {
  return request('/api/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function currentUserLogout() {
  return request('/api/auth/logout');
}

export async function handleOauthLogin(code: string){
  return request(`/api/oauth/login/${code}`);
}
