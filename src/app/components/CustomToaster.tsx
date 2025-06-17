"use client";
import { useState, useEffect } from "react";
import { faCheckCircle, faTimesCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ToastType = "success" | "error" | "loading";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

let toastId = 0;

export const useCustomToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = "success") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return { showToast, Toasts: () => <Toaster toasts={toasts} /> };
};

const Toaster: React.FC<{ toasts: Toast[] }> = ({ toasts }) => {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999] flex flex-col gap-3 items-center">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`min-w-[250px] px-4 py-3 rounded-lg shadow-lg text-white flex items-center gap-3 animate-slide-in-up ${
            toast.type === "success"
              ? "bg-green-600"
              : toast.type === "error"
              ? "bg-red-600"
              : "bg-gray-700"
          }`}
        >
          {toast.type === "success" && <FontAwesomeIcon icon={faCheckCircle} />}
          {toast.type === "error" && <FontAwesomeIcon icon={faTimesCircle} />}
          {toast.type === "loading" && <FontAwesomeIcon icon={faSpinner} spin />}
          <span className="text-sm">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
