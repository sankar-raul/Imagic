import { useState, useEffect } from "react";
import { api } from "@/utils/api";

interface Subscriber {
  _id: string;
  email: string;
  subscribedAt?: string;
  isActive?: boolean;
}

export const useNewsletterAdmin = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscribers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.newsletter.getAllSubscribers();
      setSubscribers(response.data || response.subscribers || []);
    } catch (err: any) {
      const errorMessage =
        err.message || "Failed to fetch subscribers. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSubscriber = async (subscriberId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.newsletter.deleteSubscriber(subscriberId);

      // Update local state
      setSubscribers((prev) => prev.filter((sub) => sub._id !== subscriberId));

      return {
        success: true,
        message: response.message || "Subscriber deleted successfully!",
      };
    } catch (err: any) {
      const errorMessage =
        err.message || "Failed to delete subscriber. Please try again.";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return {
    subscribers,
    isLoading,
    error,
    fetchSubscribers,
    deleteSubscriber,
    totalSubscribers: subscribers.length,
  };
};
