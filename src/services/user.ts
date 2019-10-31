import request from '@/utils/request';

export interface UserRegisterParams {
  email: string;
  password: string;
  confirm: string;
  username: string;
  type: string;
}

export async function queryUserMessages(): Promise<any> {
  return request('/server/api/auth/getUserMessages');
}

export async function userRegister(registerData: UserRegisterParams): Promise<any> {
  return request('/server/api/auth/register',{
    method: 'POST',
    data: registerData,
  })
}
