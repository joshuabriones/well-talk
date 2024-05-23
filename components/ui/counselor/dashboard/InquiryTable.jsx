import React from 'react';

const InquiryTable = ({ handleRowClick, showDeleteModal }) => {
  // Define the inquiry data
  const currentInquiries = [
    { id: 1, student: { firstName: 'Olivia', lastName: 'Rhye', institutionalEmail: 'olivia@untitledui.com', image: 'https://via.placeholder.com/30' }, date: '2024-05-20 10:00 - 11:00', subject: 'Career Counseling', status: 'open' },
    { id: 2, student: { firstName: 'Phoenix', lastName: 'Baker', institutionalEmail: 'pnix@untitledui.com', image: 'https://via.placeholder.com/30' }, date: '2024-05-20 11:00 - 12:00', subject: 'I am dying', status: 'closed' },
    { id: 3, student: { firstName: 'Lana', lastName: 'Steiner', institutionalEmail: 'lana@untitledui.com', image: 'https://via.placeholder.com/30' }, date: '2024-05-20 12:00 - 13:00', subject: 'Please help me', status: 'open' },
    { id: 4, student: { firstName: 'Demi', lastName: 'Wilkinson', institutionalEmail: 'demi@untitledui.com', image: 'https://via.placeholder.com/30' }, date: '2024-05-20 13:00 - 14:00', subject: 'Handling Emotions', status: 'closed' },
    { id: 5, student: { firstName: 'Candice', lastName: 'Wu', institutionalEmail: 'candix@untitledui.com', image: 'https://via.placeholder.com/30' }, date: '2024-05-20 14:00 - 15:00', subject: 'Ariana Grande', status: 'open' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Inquiries</h2>
      {currentInquiries.length === 0 ? (
        <p className="text-center text-gray-500">No inquiries found.</p>
      ) : (
        <div className="flex flex-col text-center">
          <div className="overflow-x-auto px-56 py-10">
            <table className="table bg-gray-100 w-full">
              <thead>
                <tr className="bg-gray-200 font-bold">
                  <th className="text-center p-5">ID</th>
                  <th>Date and Time</th>
                  <th>Inquirer</th>
                  <th className="">Subject of Inquiry</th>
                  <th className="text-center">Status</th>
                  <th className="no-hover-highlight"></th>
                </tr>
              </thead>
              <tbody>
                {currentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} onClick={() => handleRowClick(inquiry.id)} className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out">
                    <td className="text-center">{inquiry.id}</td>
                    <td>
                      <div className="flex flex-row gap-x-3">
                        <div className="text-sm">{inquiry.date}</div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={inquiry.student.image} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {inquiry.student.firstName} {inquiry.student.lastName}
                          </div>
                          <div className="text-sm opacity-50">
                            {inquiry.student.institutionalEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p>
                        {inquiry.subject.length > 50 ? `${inquiry.subject.substring(0, 40)}...` : inquiry.subject}
                      </p>
                    </td>
                    <td className="text-center">
                      <div className={`w-24 h-5 badge badge-xs ${inquiry.status === 'open' ? 'badge-warning' : 'badge-success'}`}>
                        {inquiry.status}
                      </div>
                    </td>
                    <td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryTable;
