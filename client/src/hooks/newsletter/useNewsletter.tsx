import { useState } from "react";
import { api } from "@/utils/api";

export const useNewsletter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const subscribe = async (email: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.newsletter.subscribeNewsletter(email);
      setSuccess(response.message || "Successfully subscribed to newsletter!");
      return { success: true, message: response.message };
    } catch (err: any) {
      const errorMessage =
        err.message || "Failed to subscribe. Please try again.";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribe = async (email: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.newsletter.unsubscribeNewsletter(email);
      setSuccess(
        response.message || "Successfully unsubscribed from newsletter!"
      );
      return { success: true, message: response.message };
    } catch (err: any) {
      const errorMessage =
        err.message || "Failed to unsubscribe. Please try again.";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscribe,
    unsubscribe,
    isLoading,
    error,
    success,
  };
};
