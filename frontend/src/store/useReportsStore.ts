import { create } from 'zustand';
import reportsService from '@/services/reports.service';
import { Report, ReportsFilter, SortOption, UrgencyLevel, ReportStatus, CreateReportFormData } from '@/types';

interface ReportsState {
  reports: Report[];
  currentReport: Report | null;
  loading: boolean;
  error: string | null;
  filters: ReportsFilter;
  currentPage: number;
  totalPages: number;
  totalReports: number;
  
  // Actions
  fetchReports: (filters?: ReportsFilter) => Promise<void>;
  fetchReportById: (id: string) => Promise<void>;
  createReport: (data: Omit<CreateReportFormData, 'mediaFiles'>) => Promise<void>;
  updateReport: (id: string, data: any) => Promise<void>; // Will update this with proper type later
  deleteReport: (id: string) => Promise<void>;
  toggleReaction: (reportId: string, isFake: boolean) => Promise<void>;
  flagReport: (reportId: string, reason: string) => Promise<void>;
  setFilters: (filters: ReportsFilter) => void;
  resetFilters: () => void;
  setCurrentPage: (page: number) => void;
}

const useReportsStore = create<ReportsState>()((set: (partial: Partial<ReportsState>) => void, get: () => ReportsState) => ({
  reports: [],
  currentReport: null,
  loading: false,
  error: null,
  filters: {},
  currentPage: 1,
  totalPages: 0,
  totalReports: 0,

  fetchReports: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const currentFilters = get().filters;
      const currentPage = get().currentPage;
      const params = {
        ...currentFilters,
        ...filters,
        page: (filters as ReportsFilter).page || currentPage,
      };
      
      const response = await reportsService.getAllReports(params);
      
      set({
        reports: response.data,
        totalPages: Math.ceil(response.meta.limit > 0 ? response.data.length / response.meta.limit : 1),
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch reports', loading: false });
    }
  },

  fetchReportById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const report = await reportsService.getReportById(id);
      set({ currentReport: report, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch report', loading: false });
    }
  },

  createReport: async (data: Omit<CreateReportFormData, 'mediaFiles'>) => {
    set({ loading: true, error: null });
    try {
      const report = await reportsService.createReport(data);
      // Add the new report to the beginning of the list
      set({ reports: [report, ...get().reports], loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to create report', loading: false });
      throw error;
    }
  },

  updateReport: async (id: string, data: any) => {
    set({ loading: true, error: null });
    try {
      const updatedReport = await reportsService.updateReport(id, data);
      // Update the report in the list
      set({
        reports: get().reports.map(report => 
          report.id === id ? updatedReport : report
        ),
        currentReport: updatedReport,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to update report', loading: false });
      throw error;
    }
  },

  deleteReport: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await reportsService.deleteReport(id);
      // Remove the report from the list
      set({
        reports: get().reports.filter(report => report.id !== id),
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to delete report', loading: false });
      throw error;
    }
  },

  toggleReaction: async (reportId: string, isFake: boolean) => {
    try {
      await reportsService.toggleReaction(reportId, isFake);
      // Update the current report's reactions
      const currentState = get();
      if (currentState.currentReport && currentState.currentReport.id === reportId) {
        // Update the current report
        const currentReport = { ...currentState.currentReport };
        // Update the reactions array - this is a simplified approach
        // In a real app, you'd want to update the reaction counts more precisely
        set({ currentReport });
      }
    } catch (error: any) {
      set({ error: error.message || 'Failed to toggle reaction' });
      throw error;
    }
  },

  flagReport: async (reportId: string, reason: string) => {
    try {
      await reportsService.flagReport(reportId, reason);
    } catch (error: any) {
      set({ error: error.message || 'Failed to flag report' });
      throw error;
    }
  },

  setFilters: (filters: ReportsFilter) => {
    const currentFilters = get().filters;
    const newFilters = { ...currentFilters, ...filters };
    set({ filters: newFilters, currentPage: 1 });
    // Fetch reports with new filters
    get().fetchReports(newFilters);
  },

  resetFilters: () => {
    set({ filters: {}, currentPage: 1 });
    get().fetchReports({});
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
    get().fetchReports({ page });
  },
}));

export default useReportsStore;