import React from 'react';

const AppointmentTable = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Appointments</h2>
      <div className="flex flex-col text-center">
        <div className="overflow-x-auto px-56 py-10">
          <table className="table bg-gray-100 w-full">
            <thead>
              <tr className="bg-gray-200 font-bold">
                <th className="text-center p-5">ID</th>
                <th>Date and Time</th>
                <th className="p-5">ID Number</th>
                <th>Student</th>
                <th className="">Reason</th>
                <th className="text-center">Status</th>
                <th className="no-hover-highlight"></th>
              </tr>
            </thead>
            <tbody>
              {data.appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-200 transition duration-300 ease-in-out">
                  <td className="text-center">{appointment.id}</td>
                  <td>
                    <div className="flex flex-row gap-x-3">
                      <div className="text-sm">{appointment.dateTime}</div>
                    </div>
                  </td>
                  <td className="text-center">{appointment.student.idNumber}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={appointment.student.image} alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {appointment.student.firstName} {appointment.student.lastName}
                        </div>
                        <div className="text-sm opacity-50">
                          {appointment.student.institutionalEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>
                      {appointment.purpose.length > 50 ? `${appointment.purpose.substring(0, 40)}...` : appointment.purpose}
                    </p>
                  </td>
                  <td className="text-center">
                    <div className={`w-24 h-5 badge badge-xs ${appointment.status === false ? 'badge-warning' : 'badge-success'}`}>
                      {appointment.status ? 'Done' : 'Pending'}
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
    </div>
  );
};

export default AppointmentTable;
