import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        role="alert"
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-6 py-4 rounded-xl text-white font-medium shadow-2xl transition-transform duration-400 max-w-[90vw] text-center ${
          toast.show ? 'translate-y-0' : 'translate-y-32'
        } ${toast.type === 'error' ? 'bg-red-800' : 'bg-emerald-800'}`}
      >
        {toast.message}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
