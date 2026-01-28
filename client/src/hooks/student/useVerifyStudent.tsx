import { api } from "@/utils/api";
import { useState } from "react";

const useVerifyStudent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const verifyStudent = async (studentId: string, studentData: any) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await api.student.verifyStudent(studentId, studentData);
            return response;
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || "Failed to verify student";
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };
    
    return {
        verifyStudent,
        isLoading,
        error,
    };
};

export default useVerifyStudent;
