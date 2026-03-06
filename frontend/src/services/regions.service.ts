import api from './api';
import { City, Area } from '@/types';

const regionsService = {
  async getCities(): Promise<City[]> {
    const response = await api.get('/regions/cities');
    return response.data;
  },

  async getAreasByCity(cityId: string): Promise<Area[]> {
    const response = await api.get(`/regions/areas?cityId=${cityId}`);
    return response.data;
  },

  async getAllAreas(): Promise<Area[]> {
    const response = await api.get('/regions/areas');
    return response.data;
  },
};

export default regionsService;