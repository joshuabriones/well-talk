export default function TermsAndCondition() {
  return (
    <>
      <div className="h-16 flex flex-col items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/images/loggoword.png" // Replace with your actual logo path
            alt="WellTalk Logo"
            className="w-8 h-8" // Adjust width and height as needed
          />
          <h1 className="text-xl font-bold font-Merriweather">
            <span
              className="text-maroon"
              style={{
                textShadow:
                  "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000",
              }}
            >
              Well
            </span>
            <span
              className="text-gold"
              style={{
                textShadow:
                  "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000",
              }}
            >
              Talk
            </span>
          </h1>
        </div>
        <h1 className="font-bold ">COUNSELING CONSENT AND AGREEMENT</h1>
      </div>
      <p className="mt-2 text-xs">
        I hereby understand and agree that by undergoing counseling session, I
        am fully aware that any personal information collected by Cebu Institute
        of Technology University (CIT-U) through its duly designated. Mental
        Health Professionals shall be treated as confidential under the Data
        Privacy Act of 2012. The institution will protect all my personal and
        sensitive information that it collected, processed, and retained by
        reason of the aforementioned activity.
      </p>
      <p className="mt-2 text-xs">
        Personal information collected include but not limited to my{" "}
        <span className="underline font-semibold">
          name, address, names of my parents or guardians, date of birth,
          academic records, disciplinary records, medical conditions and
          psychological condition{" "}
        </span>
        and other information necessary for an effective counseling session.
      </p>

      <p className="mt-2 text-xs">
        I understand that the information that was collected and processed
        relates to my will be used by CIT-U in providing professional advice
        pertaining to my mental health condition. Likewise, I am fully aware
        that CIT-U may share such information to concerned authorities and
        institutions in the event that any of the conditions stipulated under
        Limits to Confidentiality hereon exists. In this regard, I hereby allow
        CIT-U to collect, process, use and share my personal data in relation to
        my counselling activities.
      </p>

      <h3 className="font-semibold mt-2 text-xs">
        Confidentiality from student-counselee:
      </h3>
      <p className="text-xs">
        I understand that like in any counseling session, both counselor and
        counselee must follow strict confidentiality. Thus, I agree not to
        disclose information outside of the counseling session. This means I
        will <span className="underline font-semibold">NOT</span> audio record,
        screen/video record, or in{" "}
        <span className="underline font-semibold">ANY</span> way expose the
        transactions of the session.
      </p>

      <h3 className="font-semibold mt-2 text-xs">Limits to Confidentiality:</h3>
      <p className="text-xs">
        I further understand that ethically, the counselor can only breach
        confidentiality if I (1){" "}
        <span className="font-semibold">
          inflict self- harm/attempted suicide,
        </span>{" "}
        (2){" "}
        <span className="font-semibold">
          impose potential danger/threat towards others/community, and/or
        </span>{" "}
        (3)
        <span className="font-semibold"> experience abuse in any form. </span>
      </p>

      <h3 className="font-semibold mt-2 text-xs">Commitment to Cooperate:</h3>
      <p className="text-xs">
        I also understand that my purpose for undergoing counseling is to seek
        help for my mental health condition that has been bothering me for quite
        some time now. Hence, I will fully cooperate with the counselor in
        maximizing the time to seek initial treatment during the counseling
        session.
      </p>

      <p className="mt-2 text-xs">
        By signing below, you hereby give your consent and affirm with the
        stipulations stated on this Counselling Consent and Agreement. You also
        recognize your right to be informed, object to processing, access and
        rectify, suspend or withdraw your personal data, and be indemnified in
        case of damages pursuant to the provisions of the Republic Act No 10173
        of the Philippines, Data Privacy Act of 2012 and its corresponding
        Implementing Rules and Regulations.
      </p>

      <p className="mt-2 text-xs">
        If you have further questions and concerns regarding the processing of
        your personal information, you are welcome to contact our Data Privacy
        Officer through (dpo@cit.edu).
      </p>
    </>
  );
}
