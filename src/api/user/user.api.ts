import axios from 'axios';

export function getListProvincesAPI() {
  return axios.get('https://provinces.open-api.vn/api/p');
}

export function getListDistrictsAPI(province_code: string) {
  return axios.get(
    `https://provinces.open-api.vn/api/p/${province_code}/?depth=2`,
  );
}
export function getListWardsAPI(district_code: string) {
  return axios.get(
    `https://provinces.open-api.vn/api/d/${district_code}?depth=2`,
  );
}
