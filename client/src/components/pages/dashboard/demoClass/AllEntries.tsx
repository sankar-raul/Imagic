import { useState } from 'react';
import * as XLSX from 'xlsx';

interface DemoClassEntry {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  courseInterested: string;
  submittedAt: string;
}

// Demo data
const DEMO_ENTRIES: DemoClassEntry[] = [
  {
    id: 1,
    fullName: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phoneNumber: "+91 98765 43210",
    courseInterested: "Advanced 3D Animation",
    submittedAt: "2026-01-10 10:30 AM"
  },
  {
    id: 2,
    fullName: "Priya Sharma",
    email: "priya.sharma@example.com",
    phoneNumber: "+91 98765 43211",
    courseInterested: "Visual Effects Mastery",
    submittedAt: "2026-01-10 02:45 PM"
  },
  {
    id: 3,
    fullName: "Amit Patel",
    email: "amit.patel@example.com",
    phoneNumber: "+91 98765 43212",
    courseInterested: "Game Design Fundamentals",
    submittedAt: "2026-01-11 09:15 AM"
  },
  {
    id: 4,
    fullName: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    phoneNumber: "+91 98765 43213",
    courseInterested: "Motion Graphics Pro",
    submittedAt: "2026-01-11 11:20 AM"
  },
  {
    id: 5,
    fullName: "Vikram Singh",
    email: "vikram.singh@example.com",
    phoneNumber: "+91 98765 43214",
    courseInterested: "Character Design Workshop",
    submittedAt: "2026-01-11 03:30 PM"
  },
  {
    id: 6,
    fullName: "Ananya Iyer",
    email: "ananya.iyer@example.com",
    phoneNumber: "+91 98765 43215",
    courseInterested: "Digital Sculpting Masterclass",
    submittedAt: "2026-01-12 10:00 AM"
  },
  {
    id: 7,
    fullName: "Karthik Menon",
    email: "karthik.menon@example.com",
    phoneNumber: "+91 98765 43216",
    courseInterested: "Advanced 3D Animation",
    submittedAt: "2026-01-12 01:15 PM"
  },
  {
    id: 8,
    fullName: "Divya Joshi",
    email: "divya.joshi@example.com",
    phoneNumber: "+91 98765 43217",
    courseInterested: "Visual Effects Mastery",
    submittedAt: "2026-01-12 04:25 PM"
  }
];

export default function AllEntries() {
  const [entries, setEntries] = useState<DemoClassEntry[]>(DEMO_ENTRIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('All');

  const courses = ['All', ...Array.from(new Set(DEMO_ENTRIES.map(e => e.courseInterested)))];

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = 
      entry.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.phoneNumber.includes(searchQuery);
    const matchesCourse = filterCourse === 'All' || entry.courseInterested === filterCourse;
    return matchesSearch && matchesCourse;
  });

  const handleDownloadExcel = () => {
    // Prepare data for Excel
    const excelData = filteredEntries.map(entry => ({
      'Full Name': entry.fullName,
      'Email': entry.email,
      'Phone Number': entry.phoneNumber,
      'Course Interested': entry.courseInterested,
      'Submitted At': entry.submittedAt
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    // Set column widths
    ws['!cols'] = [
      { wch: 20 }, // Full Name
      { wch: 30 }, // Email
      { wch: 18 }, // Phone Number
      { wch: 30 }, // Course Interested
      { wch: 20 }  // Submitted At
    ];

    // Create workbook and add worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Demo Class Entries');

    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `demo_class_entries_${date}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter(entry => entry.id !== id));
      // TODO: Replace with actual API call
      // await fetch(`/api/demo-class/${id}`, { method: 'DELETE' });
      alert('Entry deleted successfully!');
    }
  };

  return (
    <div className="min-h-screen p-6 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Demo Class Entries</h1>
            <p className="text-gray-600">View and manage all demo class registrations</p>
          </div>
          <button
            onClick={handleDownloadExcel}
            disabled={filteredEntries.length === 0}
            className="px-6 py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition font-semibold shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Excel
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, email, or phone number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:w-64">
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredEntries.length}</span> of <span className="font-semibold text-gray-900">{entries.length}</span> entries
          </p>
          {(searchQuery || filterCourse !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterCourse('All');
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Entries Table */}
        {filteredEntries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No entries found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Interested
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted At
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEntries.map((entry, index) => (
                    <tr key={entry.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{entry.fullName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{entry.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{entry.phoneNumber}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {entry.courseInterested}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.submittedAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="inline-flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm font-medium"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
