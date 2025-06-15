
import { useState, useCallback } from 'react';

const toasts = [];
const listeners = [];

export const toast = (options) => {
  const id = Math.random().toString(36).substr(2, 9);
  const newToast = {
    id,
    title: options.title,
    description: options.description,
    variant: options.variant || 'default',
    ...options
  };
  
  toasts.push(newToast);
  listeners.forEach(listener => listener([...toasts]));
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    const index = toasts.findIndex(t => t.id === id);
    if (index > -1) {
      toasts.splice(index, 1);
      listeners.forEach(listener => listener([...toasts]));
    }
  }, 5000);
  
  return id;
};

export const useToast = () => {
  const [toastList, setToastList] = useState([...toasts]);
  
  const addListener = useCallback((listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);
  
  useState(() => {
    const removeListener = addListener(setToastList);
    return removeListener;
  });
  
  return {
    toast,
    toasts: toastList
  };
};
