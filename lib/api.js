export const API_ENDPOINT = {
  // User related endpoints
  GET_ALL_UNVERIFIED_USERS: "/getAllUnverifiedUsers",
  GET_ALL_VERIFIED_USERS: "/getAllVerifiedUsers",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/resetPassword?email=",
  RESET_PASSWORD: "/forgotPassword?token=",
  VERIFY_CHANGEPASSWORD_TOKEN: "/validateChangePasswordToken?token=",

  // Student related endpoints
  REGISTER_STUDENT: "/user/student/createStudent",
  GET_ALL_STUDENTS: "/user/student/getAllStudents",
  GET_STUDENT_BY_ID: "/user/student/getStudentById/",
  UPDATE_STUDENT: "/user/student/updateStudent/",
  DELETE_STUDENT: "/user/student/deleteStudent/",

  // Teacher related endpoints
  REGISTER_TEACHER: "/user/teacher/createTeacher",
  GET_ALL_TEACHERS: "/user/teacher/getAllTeachers",
  GET_TEACHER_BY_ID: "/user/teacher/getTeacherById/",
  UPDATE_TEACHER: "/user/teacher/updateTeacher/",
  DELETE_TEACHER: "/user/teacher/deleteTeacher/",

  // Counselor related endpoints
  REGISTER_COUNSELOR: "/user/counselor/createCounselor",
  GET_ALL_COUNSELORS: "/user/counselor/getAllCounselors",
  GET_COUNSELOR_BY_ID: "/user/counselor/getCounselorById/",
  UPDATE_COUNSELOR: "/user/counselor/updateCounselor/",

  // Teacher related endpoints
  REGISTER_TEACHER: "/user/teacher/createTeacher",

  // Journal related endpoints
  STUDENT_CREATE_JOURNAL: "/student/journal/createJournal?userId=",
  STUDENT_GET_ALL_JOURNALS: "/student/journal/getAllJournals",
  GET_JOURNAL_BY_ID: "/student/journal/getJournalById/",
  GET_JOURNAL_BY_STUDENT_ID: "/student/journal/getJournalByStudentId/",
  GET_PUBLIC_JOURNALS: "/student/journal/getPublicJournalByStudentId/",
  STUDENT_UPDATE_JOURNAL: "/student/journal/updateJournal/",
  STUDENT_DELETE_JOURNAL: "/student/journal/deleteJournal/",

  // Appointment related endpoints
  COUNSELOR_CREATE_APPOINTMENT:
    "/student-counselor/appointment/counselorSaveAppointment/",
  STUDENT_CREATE_APPOINTMENT:
    "/student-counselor/appointment/createAppointment?studentId=",
  STUDENT_GET_ALL_APPOINTMENTS:
    "/student-counselor/appointment/getAllAppointments",
  GET_APPOINTMENT_BY_STUDENTID:
    "/student-counselor/appointment/getAppointmentsByStudent?studentId=",
  GET_APPOINTMENT_BY_DATE:
    "/student-counselor/appointment/getAppointmentsByDate?date=",
  DELETE_APPOINTMENT: "/student-counselor/appointment/deleteAppointment/",
  SET_APPOINTMENT_COUNSELOR:
    "/student-counselor/appointment/assignCounselor?counselorEmail=",
  SET_APPOINTMENT_DONE:
    "/student-counselor/appointment/markAppointmentAsDone?appointmentId=",

  GET_APPOINTMENTS_BY_COUNSELORID:
    "/student-counselor/appointment/getAppointmentsByCounselorId/",

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

  GET_ALL_REFERRALS: "/user/referral/getAllReferrals",
  CREATE_REFERRAL: "/user/referral/createReferral?teacherId=",
  ACCEPT_REFERRAL: "/user/referral/markReferralAsAccepted?id=",
  DELETE_REFERRAL: "/user/referral/deleteReferral/",
  VALIDATE_REFERRAL_TOKEN: "/user/referral/validateReferralToken?token=",

  CHANGE_PASSWORD: "/changePassword",

  DELETE_USER: "/deleteUser/",
  VERIFY_USER: "/verifyUserAccount/",

  // Chat related endpoints
  SEND_MESSAGE: "/chat/send",
  GET_MESSAGES: "/chat/messages/",
};
