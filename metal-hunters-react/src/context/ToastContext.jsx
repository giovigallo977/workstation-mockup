import { createContext, useCallback, useContext, useState } from "react";
import * as Toast from "@radix-ui/react-toast";

const ToastContext = createContext(null);
let uid = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message) => {
    const id = ++uid;
    setToasts(prev => [...prev, { id, message }]);
  }, []);

  const remove = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={showToast}>
      <Toast.Provider swipeDirection="right" duration={3200}>
        {children}
        {toasts.map(t => (
          <Toast.Root
            key={t.id}
            className="mh-toast-root"
            onOpenChange={(open) => { if (!open) remove(t.id); }}
          >
            <Toast.Description dangerouslySetInnerHTML={{ __html: t.message }} />
            <Toast.Close aria-label="Close" className="btn-close btn-close-white" />
          </Toast.Root>
        ))}
        <Toast.Viewport className="mh-toast-viewport" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
