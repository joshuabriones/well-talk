export const API_ENDPOINT = {
  // User related endpoints
  GET_ALL_UNVERIFIED_USERS: "/getAllUnverifiedUsers",
  GET_ALL_UNVERIFIED_STUDENTS: "/getAllUnverifiedStudents/",
  GET_ALL_VERIFIED_USERS: "/getAllVerifiedUsers",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/resetPassword?email=",
  RESET_PASSWORD: "/forgotPassword?token=",
  VERIFY_CHANGEPASSWORD_TOKEN: "/validateChangePasswordToken?token=",
  VERIFY_PASSWORD_JOURNAL: "/verifyPassword",

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
  GET_STUDENT_COUNT: "/assignCounselor/getAssignedCounselorStudentCount/",
  GET_TEACHER_COUNT: "/assignCounselor/getAssignedCounselorTeacherCount/",

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
  GET_APPOINTMENTS_BY_COUNSELOR_ID:
    "/student-counselor/appointment/getAppointmentsByCounselorId/",
  DELETE_APPOINTMENT: "/student-counselor/appointment/deleteAppointment/",
  RESCHED_APPOINTMENT:
    "/student-counselor/appointment/updateAppointmentDetails/",
  SET_APPOINTMENT_COUNSELOR:
    "/student-counselor/appointment/assignCounselor?counselorEmail=",
  SET_APPOINTMENT_DONE:
    "/student-counselor/appointment/markAppointmentAsDone?appointmentId=",
  CREATE_REFERRAL_APPOINTMENT:
    "/student-counselor/appointment/saveReferralAppointment?referralId=",
  // Appointment related endpoints
  COUNSELOR_CREATE_APPOINTMENT:
    "/student-counselor/appointment/counselorSaveAppointment/",
  STUDENT_CREATE_APPOINTMENT:
    "/student-counselor/appointment/createAppointment?studentId=",
  STUDENT_GET_ALL_APPOINTMENTS:
    "/student-counselor/appointment/getAllAppointments",

  STUDENT_GET_ALL_DONE_APPOINTMENTS:
    "/student-counselor/appointment/getDoneAppointments",
  GET_APPOINTMENT_BY_STUDENTID:
    "/student-counselor/appointment/getAppointmentsByStudent?studentId=",
  GET_APPOINTMENT_BY_DATE:
    "/student-counselor/appointment/getAppointmentsByDate?date=",
  GET_APPOINTMENTS_BY_COUNSELOR_ID:
    "/student-counselor/appointment/getAppointmentsByCounselorId/",
  DELETE_APPOINTMENT: "/student-counselor/appointment/deleteAppointment/",
  RESCHED_APPOINTMENT:
    "/student-counselor/appointment/updateAppointmentDetails/",
  SET_APPOINTMENT_COUNSELOR:
    "/student-counselor/appointment/assignCounselor?counselorEmail=",
  SET_APPOINTMENT_DONE:
    "/student-counselor/appointment/markAppointmentAsDone?appointmentId=",
  CREATE_REFERRAL_APPOINTMENT:
    "/student-counselor/appointment/saveReferralAppointment?referralId=",

  GET_APPOINTMENTS_BY_COUNSELORID:
    "/student-counselor/appointment/getAppointmentsByCounselorId/",

  //
  GET_APPOINTMENT_BY_DATE_AND_COUNSELOR:
    "/student-counselor/appointment/getAppointmentsByDateAndCounselor?date=",

  GET_APPOINTMENTS_BY_DATE_AND_ASSIGNED_COUNSELORS:
    "/student-counselor/appointment/getAppointmentsByDateAndAssignedCounselors",
  CHECK_APPOINTMENT_IS_TAKEN:
    "/student-counselor/appointment/checkCounselorAppointmentIsTaken?date=",

  GET_COUNSELOR_BY_STUDENT_ID: "/assignCounselor/getCounselorByStudentId/",
  GET_COUNSELOR_BY_TEACHER_ID: "/assignCounselor/getCounselorByTeacherId/",
  GET_COUNSELOR_BY_RECEIVER_ID: "/assignCounselor/getCounselorByReceiverId/",
  GET_COUNSELOR_ASSIGNED_STUDENTS: "/assignCounselor/getByCounselorId/",

  // Notification related endpoints
  CREATE_NOTIFICATION: "/notifications/createAppointmentNotification?senderId=",
  CREATE_REFERRAL_NOTIFICATION:
    "/notifications/createReferralNotification?senderId=",
  CREATE_REFERRAL_NOTIFICATION_TEACHER_AND_STUDENT:
    "/notifications/createReferralTSNotification?teacherId=",
  GET_ALL_NOTIFICATIONS: "/notifications/getAllNotifications",
  GET_NOTIFICATIONS_BY_RECEIVER:
    "/notifications/getNotificationsByReceiver?receiverId=",
  MARK_AS_READ: "/notifications/markAsRead?notificationId=",
  DELETE_NOTIFICATION: "/notifications/deleteNotification?notificationId=",

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
  PIN_POST: "/counselor/post/pinPost?id=",
  UNPIN_POST: "/counselor/post/unpinPost?id=",

  GET_ALL_REFERRALS: "/user/referral/getAllReferrals",
  GET_REFERRAL_BY_ID: "/user/referral/getReferralsByReferredById/",
  GET_REFERRAL_BY_COUNSELOR_ID: "/user/referral/getReferralsByCounselorId?id=",
  CREATE_REFERRAL: "/user/referral/createReferral?referrerId=",
  DELETE_REFERRAL: "/user/referral/deleteReferral/",
  VALIDATE_REFERRAL_TOKEN: "/user/referral/validateReferralToken?token=",
  ACCEPT_REFERRAL: "/user/referral/acceptReferral?token=",
  DECLINE_REFERRAL: "/user/referral/rejectReferral?token=",
  CHECK_REFERRAL_PRESENT:
    "/user/referral/getActiveAcceptedReferral?studentEmail=",
  GET_REFERRAL_TOKEN: "/user/referral/getReferralToken?referralId=",

  CHANGE_PASSWORD: "/changePassword",

  DELETE_USER: "/deleteUser/",
  VERIFY_USER: "/verifyUserAccount/",

  // Chat related endpoints
  SEND_MESSAGE: "/chat/send",
  GET_MESSAGES: "/chat/messages/",

  CHECK_EMAIL: "/checkEmail",
  CHECK_IDNUMBER: "/checkIdNumber",

  // COUNSELOR AVAIALBILITY ENDPOINTS
  GET_UNAVAILABLE_DATES_BY_COUNSELOR_ID: "/availability/",
  CREATE_UNAVAILABLE_DATES: "/availability",
};
