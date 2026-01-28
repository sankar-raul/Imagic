import { motion } from "framer-motion";
import { Clock, Mail, Phone, BookOpen, Calendar, CheckCircle, XCircle } from "lucide-react";
import useGetAllPendingStudents from "@/hooks/student/useGetAllPendingStudents";
import useVerifyStudent from "@/hooks/student/useVerifyStudent";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { useState } from "react";

export default function PendingStudent() {
  const { students, isLoading, refetchStudents } = useGetAllPendingStudents();
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <EmptyState message="No pending students found" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pending Students
          </h1>
          <p className="text-lg text-gray-600">
            Total: {students.length} pending {students.length === 1 ? 'student' : 'students'} awaiting verification
          </p>
        </motion.div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student, index) => (
            <StudentCard 
              key={student._id || index} 
              student={student} 
              index={index}
              verifyingId={verifyingId}
              setVerifyingId={setVerifyingId}
              refetchStudents={refetchStudents}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface StudentCardProps {
  student: {
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    course: string;
    cv?: string;
    isVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  };
  index: number;
  verifyingId: string | null;
  setVerifyingId: (id: string | null) => void;
  refetchStudents: () => void;
}

function StudentCard({ student, index, verifyingId, setVerifyingId, refetchStudents }: StudentCardProps) {
  const { verifyStudent, isLoading: isVerifying } = useVerifyStudent();
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const formatDate = (date?: Date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleVerify = async () => {
    if (!student._id) {
      console.error("Student ID is missing");
      setVerificationStatus('error');
      setTimeout(() => setVerificationStatus('idle'), 3000);
      return;
    }

    try {
      setVerifyingId(student._id);
      await verifyStudent(student._id, { isVerified: true });
      setVerificationStatus('success');
      
      // Wait a moment to show success state, then refetch
      setTimeout(() => {
        refetchStudents();
        setVerifyingId(null);
      }, 1500);
    } catch (error) {
      console.error("Error verifying student:", error);
      setVerificationStatus('error');
      setVerifyingId(null);
      
      // Reset error state after 3 seconds
      setTimeout(() => setVerificationStatus('idle'), 3000);
    }
  };

  const isCurrentlyVerifying = verifyingId === student._id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      {/* Header with Pending Badge */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-600 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white truncate flex-1">
            {student.name}
          </h3>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
            className="flex items-center gap-2"
          >
            <Clock className="w-5 h-5 text-white" />
            <span className="text-xs font-semibold text-white bg-white/20 px-2 py-1 rounded-full">
              Pending
            </span>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Email */}
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
            <p className="text-sm text-gray-900 break-words">{student.email}</p>
          </div>
        </div>

        {/* Phone */}
        {student.phone && (
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">Phone</p>
              <p className="text-sm text-gray-900">{student.phone}</p>
            </div>
          </div>
        )}

        {/* Course */}
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 mb-1">Course</p>
            <span className="inline-block px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
              {student.course}
            </span>
          </div>
        </div>

        {/* Created At */}
        {student.createdAt && (
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">Applied</p>
              <p className="text-sm text-gray-900">
                {formatDate(student.createdAt)}
              </p>
            </div>
          </div>
        )}

        {/* CV Link */}
        {student.cv && (
          <div className="pt-2">
            <a
              href={student.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 text-sm"
            >
              View CV
            </a>
          </div>
        )}

        {/* Verify Button */}
        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={handleVerify}
            disabled={isCurrentlyVerifying || verificationStatus === 'success'}
            className={`
              w-full px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2
              ${verificationStatus === 'success' 
                ? 'bg-green-500 text-white cursor-default' 
                : verificationStatus === 'error'
                ? 'bg-red-500 text-white hover:bg-red-600'
                : isCurrentlyVerifying
                ? 'bg-orange-400 text-white cursor-wait'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
              }
              ${(isCurrentlyVerifying || verificationStatus === 'success') ? 'cursor-not-allowed' : ''}
            `}
          >
            {isCurrentlyVerifying ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </>
            ) : verificationStatus === 'success' ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Verified!
              </>
            ) : verificationStatus === 'error' ? (
              <>
                <XCircle className="w-5 h-5" />
                Failed - Try Again
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Verify Student
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
