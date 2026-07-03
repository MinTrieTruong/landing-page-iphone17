import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-rose-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast border border-gray-200 dark:border-gray-800 dark:bg-zinc-900 bg-white"
        >
          {getIcon(toast.type)}
          <span className="flex-grow text-sm font-medium text-gray-800 dark:text-gray-200">
            {toast.message}
          </span>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
