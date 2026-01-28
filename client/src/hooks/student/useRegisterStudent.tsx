import { api } from "@/utils/api";
import { useState } from "react";

interface RegisterStudentData {
    name: string;
    email: string;
    password: string;
    phone?: string;
    course: string;
    cv?: string;
}

const useRegisterStudent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const registerStudent = async (studentData: RegisterStudentData) => {
        try {
            setIsLoading(true);
            setError(null);
            setSuccess(false);
            const response = await api.student.registerStudent(studentData);
            setSuccess(true);
            return response;
        } catch (err: any) {
            const errorMessage = err?.message || "Failed to register student";
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const resetState = () => {
        setError(null);
        setSuccess(false);
    };
    
    return {
        registerStudent,
        isLoading,
        error,
        success,
        resetState,
    };
};

export default useRegisterStudent;
