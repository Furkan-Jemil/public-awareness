import api from './api';
import { Report, ReportsFilter, CreateReportFormData, UpdateReportFormData } from '@/types';

const reportsService = {
  async getAllReports(filter: ReportsFilter = {}): Promise<{ data: Report[]; meta: { page: number; limit: number } }> {
    const response = await api.get('/reports', { params: filter });
    return response.data;
  },

  async getReportById(id: string): Promise<Report> {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },

  async createReport(data: Omit<CreateReportFormData, 'mediaFiles'>): Promise<Report> {
    const response = await api.post('/reports', data);
    return response.data;
  },

  async updateReport(id: string, data: UpdateReportFormData): Promise<Report> {
    const response = await api.patch(`/reports/${id}`, data);
    return response.data;
  },

  async deleteReport(id: string): Promise<any> {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
  },

  async toggleReaction(reportId: string, isFake: boolean): Promise<any> {
    const response = await api.post(`/reports/${reportId}/react`, { isFake });
    return response.data;
  },

  async flagReport(reportId: string, reason: string): Promise<any> {
    const response = await api.post(`/reports/${reportId}/flag`, { reason });
    return response.data;
  },
};

export default reportsService;