import { useState, useEffect } from 'react';
import { CategoryData, CSVData, ImageAsset, AssetResponse } from '../types/assets';
import { loadCategoryData, loadCategoryImage, loadCSVData } from '../services/assetLoader';
import { useLanguage } from '../context/LanguageContext';

export function useCategoryData(category: string) {
  const { currentLanguage } = useLanguage();
  const [data, setData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await loadCategoryData(currentLanguage.code, category);
      
      if (response.success && response.data) {
        setData(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to load category data');
        setData(null);
      }
      
      setLoading(false);
    }

    fetchData();
  }, [category, currentLanguage]);

  return { data, loading, error };
}

export function useCategoryImage(category: string, name: string) {
  const { currentLanguage } = useLanguage();
  const [imageData, setImageData] = useState<ImageAsset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      setLoading(true);
      const response = await loadCategoryImage(currentLanguage.code, category, name);
      
      if (response.success && response.data) {
        setImageData(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to load image');
        setImageData(null);
      }
      
      setLoading(false);
    }

    fetchImage();
  }, [category, name, currentLanguage]);

  return { imageData, loading, error };
}

export function useCSVData(category: string) {
  const { currentLanguage } = useLanguage();
  const [data, setData] = useState<CSVData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await loadCSVData(currentLanguage.code, category);
      
      if (response.success && response.data) {
        setData(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to load CSV data');
        setData(null);
      }
      
      setLoading(false);
    }

    fetchData();
  }, [category, currentLanguage]);

  return { data, loading, error };
}