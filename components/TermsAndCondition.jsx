export default function TermsAndCondition({ onClose }) {
	return (
		<div
			className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-25 z-50 backdrop-blur"
			role="dialog">
			<div className="modal-box relative p-4 sm:p-6 lg:p-9 border-2 text-center max-w-md sm:max-w-lg bg-white rounded-2xl shadow-lg transform transition-transform duration-300 scale-95">
				<div className="h-14 flex flex-col items-center justify-between ">
					<div className="flex items-center gap-2 mb-2">
						<img
							src="/images/loggoword.png" // Replace with your actual logo path
							alt="WellTalk Logo"
							className="w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10" // Adjust width and height for responsiveness
						/>
						<h1 className="text-xl sm:text-2xl font-bold font-Merriweather ">
							<span className="text-maroon">Well</span>
							<span className="text-gold">Talk</span>
						</h1>
					</div>
				</div>
				<h1 className="font-bold text-md md:text-lg lg:text-lg text- font-Merriweather">
					DATA PRIVACY NOTICE AND INFORMED CONSENT OF THE GUIDANCE
					CENTER
				</h1>
				<p className="mt-2 text-xs sm:text-sm text-justify">
					The CIT-University Guidance Center envisions our students to
					become holistically developed by providing services such as
					but not limited to Counselling, Testing, Follow-up,
					Referral, Information, Group Guidance, Placement, Parental
					Collaboration, Appraisal, and Research and Evaluation. These
					services require the processing of personal data from our
					students. Processing includes the collection, use, sharing,
					retention, and disposal of information. By enrolling to
					CIT-University, you expressly acknowledge that you have
					read, understood, and agree to all the terms of this Privacy
					Statement as outlined below. The school reserves the right
					to modify this statement as necessitated by law or
					regulations set forth by the National Privacy Commission
					(NPC) without prior notification.
				</p>

				<p className="mt-2 text-xs sm:text-sm text-justify">
					Personal information collected include but not limited to my{" "}
					<span className="underline font-semibold">
						name, address, names of my parents or guardians, date of
						birth, academic records, disciplinary records, medical
						conditions, and psychological condition
					</span>
					, and other information necessary for an effective
					counseling session.
				</p>

				<h1 className="font-semibold mt-5 my-2 text-xs sm:text-sm text-justify">
					Purpose and Background
				</h1>
				<p className="text-xs sm:text-sm text-justify">
					Your personal data will be used for profiling, verification,
					assessment, analysis, and monitoring of developmental
					progress in terms of academic and personal-social aspect. We
					collect and keep the following information: (1) Student’s
					Personal Data and Family Background, (2) Student’s
					Socio-Economic Status, (3) Student’s Academic Information,
					(4) Student’s Interest and Attitude Inventories, and (5)
					Student’s Psychological Test Results. This will serve as
					your official school record under the University Guidance
					Center. For Counselling Service and/or Follow-up Service,
					additional information such as but not limited to your
					previous and recent Academic Status and Performance (e.g.
					grades, class attendance), Teacher’s Anecdotal, Disciplinary
					Records, Medical and Psychological History including records
					of self-harming behavior will also be gathered from your
					teacher/s, parent/legal guardian, internal offices and/or
					outside agencies. With this agreement, you allow the
					assigned counselor to have access to the above-stated
					information. The Guidance Center upholds to maintain the
					counselling and/or follow-up session/s with the student as{" "}
					<span className="underline font-semibold">
						confidential
					</span>
					. However, the Guidance Center can ethically breach
					confidentiality when the student (1){" "}
					<span className="underline">
						becomes harmful towards himself/herself
					</span>
					, (2){" "}
					<span className="underline">
						{" "}
						imposes danger/threat towards others/community
					</span>
					, and/or (3){" "}
					<span className="underline">
						experiences abuse in any form, either in school or at
						home
					</span>
					. It is the duty of the counselor to warn and to err with
					caution.
				</p>

				<h3 className="font-semibold mt-5 my-2 text-xs sm:text-sm text-justify">
					Accessibility and Data Sharing
				</h3>
				<p className="text-xs sm:text-sm text-justify">
					Your personal data will be stored within the Guidance
					Center’s online and physical databases and shall only be
					accessed by the assigned Guidance Counselor / School
					Psychometrician and Guidance Head. The Guidance Center will
					share your personal data with concerned
					authorities/institutions and with the school’s top
					management if any of the stated Confidentiality limitations
					above hereon exist. There will be instances too where your
					information will be shared with your parents, guardians, or
					next-of-kin as required by law or when deemed beneficial to
					your situation as identified by your counselor. When data
					will be utilized for research and program development, no
					personal identifying data will be included. It will be
					aggregated and anonymized in the discussion and collated
					reports shared within the varied units of CIT-University.
					For Testing Service, a copy of the Psychological Report
					and/or Test results will be forwarded to the requesting
					office and/or school personnel of CIT - University.
					Psychological Testing is administered to student/s as a
					requirement for Admission, Scholarship Application, and/or
					as a supplemental procedure in Counselling session, Career
					Guidance, and Research Studies.
				</p>

				<h3 className="font-semibold mt-5 my-2 text-xs sm:text-sm text-justify">
					Security and Retention
				</h3>
				<p className="text-xs sm:text-sm text-justify">
					The Guidance Center will retain your information in a span
					equivalent to your stay in the university plus a year in the
					archival section. Counselling reports will be preserved in
					our system for documentation purposes. Testing results will
					only be kept for 3 years following its validity and
					reliability. Evaluation responses will be disposed of once a
					consolidated report has already been made. The University
					has appropriate physical, technical and organizational
					security measures which ensure the confidentiality of your
					information. These measures will be reviewed over time and
					upgraded in line with technological developments and
					regulatory requirements.
				</p>

				<h3 className="font-semibold mt-5 my-2 text-xs sm:text-sm text-justify">
					Erasure and Withdrawal
				</h3>
				<p className="text-xs sm:text-sm text-justify">
					Your participation in our services is entirely voluntary.
					You have the right to withdraw your consent and request for
					the erasure of your personal information from our database
					subject to the exceptions contained in the Data Privacy Act
					of 2012 and its implementing rules and regulations. By
					signing this form, you hereby affirm that you understand,
					agree, and give your full consent to CIT-University through
					its duly designated Mental Health Professionals from the
					Guidance Center authorized to collect, process, share, and
					retain your personal information according to the
					aforementioned conditions. You also recognize your right to
					be informed, object to processing, access and rectify,
					suspend or withdraw your personal data, and to be
					indemnified in case of damages pursuant to the provisions of
					the Republic Act No 10173 of the Philippines, Data Privacy
					Act of 2012 and its corresponding Implementing Rules and
					Regulations If you have further questions and concerns
					regarding the processing of your personal information, you
					are welcome to contact our Data Protection Officer via
					dpo@cit.edu
				</p>

				<div className="w-full flex flex-row gap-x-4 py-2 mt-4">
					<button
						className="w-full bg-gray border-2 border-gray-600 text-sm text-white font-semibold rounded-3xl px-4 py-3 hover:scale-95 transition-transform duration-300"
						onClick={onClose}>
						I have read and accept the terms
					</button>
				</div>
			</div>
		</div>
	);
}
