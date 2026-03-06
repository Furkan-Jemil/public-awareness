'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useReportsStore from '@/store/useReportsStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAuthStore from '@/store/useAuthStore';
import categoriesService from '@/services/categories.service';
import regionsService from '@/services/regions.service';
import { Category, City, Area, UrgencyLevel } from '@/types';

const CreateReportPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { createReport, error, loading } = useReportsStore();
  const [cities, setCities] = useState<City[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    urgencyLevel: '',
    cityId: '',
    areaId: '',
    specificPlaceName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    
    // Load initial data
    const fetchData = async () => {
      try {
        const [citiesData, categoriesData] = await Promise.all([
          regionsService.getCities(),
          categoriesService.getAllCategories(),
        ]);
        setCities(citiesData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [isAuthenticated, router]);

  // Update areas when city selection changes
  useEffect(() => {
    if (formData.cityId) {
      regionsService.getAreasByCity(formData.cityId).then(setAreas);
      setSelectedCity(formData.cityId);
    } else {
      setAreas([]);
    }
  }, [formData.cityId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setMediaFiles(files);

      // Create preview URLs for images/videos
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 255) {
      newErrors.title = 'Title must be less than 255 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }

    if (!formData.urgencyLevel) {
      newErrors.urgencyLevel = 'Urgency level is required';
    }

    if (!formData.cityId) {
      newErrors.cityId = 'City is required';
    }

    if (!formData.areaId) {
      newErrors.areaId = 'Area is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // In a real app, we would handle media uploads separately
      // For now, we'll just send the form data without media files
      await createReport({
        ...formData,
        mediaFiles: [] // We'll handle media upload separately in a real implementation
      });
      
      // Reset form and redirect to home
      setFormData({
        title: '',
        description: '',
        categoryId: '',
        urgencyLevel: '',
        cityId: '',
        areaId: '',
        specificPlaceName: '',
      });
      setMediaFiles([]);
      setPreviewUrls([]);
      router.push('/');
      router.refresh(); // Refresh to show the new report
    } catch (err) {
      console.error('Error creating report:', err);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Report</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a descriptive title"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide detailed information about the situation"
                rows={4}
                className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${errors.categoryId ? 'border-red-500' : ''}`}
                aria-label="Select Category"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-sm text-red-500">{errors.categoryId}</p>
              )}
            </div>

            {/* Urgency Level */}
            <div className="space-y-2">
              <label htmlFor="urgencyLevel" className="block text-sm font-medium text-gray-700">
                Urgency Level *
              </label>
              <select
                id="urgencyLevel"
                name="urgencyLevel"
                value={formData.urgencyLevel}
                onChange={handleChange}
                className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${errors.urgencyLevel ? 'border-red-500' : ''}`}
                aria-label="Select Urgency Level"
              >
                <option value="">Select urgency level</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
              </select>
              {errors.urgencyLevel && (
                <p className="text-sm text-red-500">{errors.urgencyLevel}</p>
              )}
            </div>

            {/* City and Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="cityId" className="block text-sm font-medium text-gray-700">
                  City *
                </label>
                <select
                  id="cityId"
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleChange}
                  className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${errors.cityId ? 'border-red-500' : ''}`}
                  aria-label="Select City"
                >
                  <option value="">Select a city</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.cityId && (
                  <p className="text-sm text-red-500">{errors.cityId}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="areaId" className="block text-sm font-medium text-gray-700">
                  Area *
                </label>
                <select
                  id="areaId"
                  name="areaId"
                  value={formData.areaId}
                  onChange={handleChange}
                  disabled={!selectedCity}
                  className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${errors.areaId ? 'border-red-500' : ''}`}
                  aria-label="Select Area"
                >
                  <option value="">
                    {!selectedCity ? "Select a city first" : "Select an area"}
                  </option>
                  {areas.map(area => (
                    <option key={area.id} value={area.id}>
                      {area.name}
                    </option>
                  ))}
                </select>
                {errors.areaId && (
                  <p className="text-sm text-red-500">{errors.areaId}</p>
                )}
              </div>
            </div>

            {/* Specific Place Name */}
            <div className="space-y-2">
              <label htmlFor="specificPlaceName" className="block text-sm font-medium text-gray-700">
                Specific Place Name
              </label>
              <Input
                id="specificPlaceName"
                name="specificPlaceName"
                value={formData.specificPlaceName}
                onChange={handleChange}
                placeholder="e.g., Central Market, Main Street Bridge"
                className={errors.specificPlaceName ? 'border-red-500' : ''}
              />
              {errors.specificPlaceName && (
                <p className="text-sm text-red-500">{errors.specificPlaceName}</p>
              )}
            </div>

            {/* Media Upload */}
            <div className="space-y-2">
              <label htmlFor="media" className="block text-sm font-medium text-gray-700">
                Media Evidence (Image/Video) *
              </label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">JPG, PNG, MP4 (MAX. 10MB)</p>
                  </div>
                  <input 
                    id="media" 
                    type="file" 
                    className="hidden" 
                    accept="image/*,video/*" 
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              
              {/* Media Preview */}
              {previewUrls.length > 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Preview:</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        {mediaFiles[index]?.type.startsWith('image/') ? (
                          <img 
                            src={url} 
                            alt={`Preview ${index}`} 
                            className="w-full h-24 object-cover rounded-md"
                          />
                        ) : (
                          <video 
                            src={url} 
                            className="w-full h-24 object-cover rounded-md"
                            muted
                          />
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs">{mediaFiles[index]?.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Report'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateReportPage;