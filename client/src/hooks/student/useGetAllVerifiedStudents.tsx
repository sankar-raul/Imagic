import { Istudent } from "@/types/student.types";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

const useGetAllVerifiedStudents = () => {
    const [students, setStudents] = useState<Istudent[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchStudents = async () => {
        try {
            setIsLoading(true);
            const response = await api.student.getAllVerifiedStudents();
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching verified students:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchStudents();
    }, []);
    
    return {
        students,
        refetchStudents: fetchStudents,
        isLoading,
    };
};

export default useGetAllVerifiedStudents;
