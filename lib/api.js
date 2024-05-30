export const API_ENDPOINT = {
  // User related endpoints
  GET_ALL_USERS: "/getAllUsers",
  LOGIN: "/login",

  // Student related endpoints
  REGISTER_STUDENT: "/user/student/createStudent",
  GET_ALL_STUDENTS: "/user/student/getAllStudents",
  GET_STUDENT_BY_ID: "/user/student/getStudentById/",
  UPDATE_STUDENT: "/user/student/updateStudent/",
  DELETE_STUDENT: "/user/student/deleteStudent/",

  // Counselor related endpoints
  REGISTER_COUNSELOR: "/user/counselor/createCounselor",
  GET_ALL_COUNSELORS: "/user/counselor/getAllCounselors",

  // Teacher related endpoints
  REGISTER_TEACHER: "/user/teacher/createTeacher",

  // Journal related endpoints
  STUDENT_CREATE_JOURNAL: "/student/journal/createJournal?userId=",
  STUDENT_GET_ALL_JOURNALS: "/student/journal/getAllJournals",
  GET_JOURNAL_BY_ID: "/student/journal/getJournalById/",
  GET_JOURNAL_BY_STUDENT_ID: "/student/journal/getJournalByStudentId/",
  STUDENT_UPDATE_JOURNAL: "/student/journal/updateJournal/",
  STUDENT_DELETE_JOURNAL: "/student/journal/deleteJournal/",

  // Appointment related endpoints
  STUDENT_CREATE_APPOINTMENT: "/student-counselor/appointment/createAppointment?studentId=",
  STUDENT_GET_ALL_APPOINTMENTS: "/student-counselor/appointment/getAllAppointments",
  GET_APPOINTMENT_BY_STUDENTID: "/student-counselor/appointment/getAppointmentsByStudent?studentId=",
  GET_APPOINTMENT_BY_DATE: "/student-counselor/appointment/getAppointmentsByDate?date=",
  DELETE_APPOINTMENT: "/student-counselor/appointment/deleteAppointment/",
  SET_APPOINTMENT_COUNSELOR: "/student-counselor/appointment/assignCounselor?counselorEmail=",
  SET_APPOINTMENT_DONE: "/student-counselor/appointment/markAppointmentAsDone?appointmentId=",

  // Inquiry related endpoints
  CREATE_INQUIRY: "/user/inquiry/createInquiry",
  GET_ALL_INQUIRIES: "/user/inquiry/getAllInquiries",
  GET_INQUIRY_BY_ID: "/user/inquiry/getInquiryById/",
  UPDATE_INQUIRY: "/user/inquiry/updateInquiry/",
  REPLY_INQUIRY: "/user/inquiry/replyInquiry/",
  DELETE_INQUIRY: "/user/inquiry/deleteInquiry/",

  // Post related endpoints
  GET_ALL_POSTS: "/counselor/post/getAllPosts",
  GET_POST_BY_ID: "/counselor/post/getPostById/",
  CREATE_POST: "/counselor/post/createPost",
  UPDATE_POST: "/counselor/post/updatePost/",
  DELETE_POST: "/counselor/post/deletePost/",
};
