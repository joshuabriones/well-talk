export const API_ENDPOINT = {
  REGISTER_COUNSELOR: "/user/counselor/createCounselor",
  REGISTER_STUDENT: "/user/student/createStudent",
  REGISTER_TEACHER: "/user/teacher/createTeacher",
  LOGIN: "/login",
  STUDENT_CREATE_JOURNAL: "/student/journal/createJournal?userId=",
  GET_ALL_JOURNALS: "/student/journal/getAllJournals",
  GET_JOURNAL_BY_ID: "/student/journal/getJournalById/",
  GET_JOURNAL_BY_STUDENT_ID: "/student/journal/getJournalByStudentId/",
  CREATE_JOURNAL: "/student/journal/createJournal/",
  UPDATE_JOURNAL: "/student/journal/updateJournal/",
  DELETE_JOURNAL: "/student/journal/deleteJournal/",
  CREATE_INQUIRY: "/user/inquiry/createInquiry",
  GET_ALL_INQUIRIES: "/user/inquiry/getAllInquiries",
  GET_INQUIRY_BY_ID: "/user/inquiry/getInquiryById/",
  UPDATE_INQUIRY: "/user/inquiry/updateInquiry/",
  REPLY_INQUIRY: "/user/inquiry/replyInquiry/",
  DELETE_INQUIRY: "/user/inquiry/deleteInquiry/",
};