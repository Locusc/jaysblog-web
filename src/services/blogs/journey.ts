import request from '@/utils/request';

export async function queryJourneyList(): Promise<any> {
  return request('/server/journey/list');
}
