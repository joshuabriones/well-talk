"use client";
import Questions from "@/components/ui/FAQs";
import Inquiry from "@/components/ui/Inquiry";
import { Navbar } from "@/components/ui/Navbar";

export default function StudentInquiry() {
  const faqList = [
    {
      question: "What is WellTalk?",
      answer:
        "WellTalk is a comprehensive platform designed to facilitate seamless communication and scheduling between students and counselors, ensuring a supportive environment for mental health and well-being.",
    },
    {
      question:
        "How do I schedule an appointment with a counselor on WellTalk?",
      answer:
        "To schedule an appointment with a counselor on WellTalk, log in to your account and navigate to the Appointments or Schedule section. From there, you can elect a convenient time slot and confirm your appointment.",
    },
    {
      question: "Is my information confidential and secure on WellTalk?",
      answer:
        "Yes, we take your privacy and security seriously on WellTalk. Your information is encrypted and stored securely according to industry standards. Only authorized personnel have access to your data, and we adhere to strict confidentiality protocols.",
    },

    {
      question: "Can I reschedule or cancel appointments?",
      answer:
        "Yes, you can reschedule or cancel appointments through your WellTalk account. Simply go to the Appointments section, locate the appointment you wish to change, and follow the prompts to adjust the date and time or cancel the appointment.",
    },
    {
      question:
        "Are there resources available for self-help and mental health tips?",
      answer:
        ": Absolutely! WellTalk provides a wealth of resources, including self-help guides, mental health tips, and informative articles to support your well-being journey. Explore our Resources section to access these valuable materials.",
    },
    {
      question: "Is WellTalk accessible on mobile devices?",
      answer:
        "Yes, WellTalk is fully accessible on mobile devices. We've designed the app to be responsive and user-friendly on smartphones and tablets, ensuring that you can access all features and functionalities seamlessly on the go.",
    },
  ];
  const contactMethods = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#FFFFFF"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      ),
      title: "Join our community",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        name: "Join our Discord",
        href: "javascript:void(0)",
      },
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 48 48"
          fill="#FFFFFF"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#FFFFFF"
        >
          <g clip-path="url(#clip0_17_80)">
            <path
              d="M15.1003 43.5C33.2091 43.5 43.1166 28.4935 43.1166 15.4838C43.1166 15.0619 43.1072 14.6307 43.0884 14.2088C45.0158 12.815 46.679 11.0886 48 9.11066C46.205 9.90926 44.2993 10.4308 42.3478 10.6575C44.4026 9.42588 45.9411 7.491 46.6781 5.21159C44.7451 6.35718 42.6312 7.16528 40.4269 7.60128C38.9417 6.02318 36.978 4.97829 34.8394 4.62816C32.7008 4.27803 30.5064 4.64216 28.5955 5.66425C26.6846 6.68635 25.1636 8.30947 24.2677 10.2827C23.3718 12.2559 23.1509 14.4693 23.6391 16.5807C19.725 16.3842 15.8959 15.3675 12.4 13.5963C8.90405 11.825 5.81939 9.33893 3.34594 6.29909C2.0888 8.46655 1.70411 11.0314 2.27006 13.4722C2.83601 15.9131 4.31013 18.047 6.39281 19.44C4.82926 19.3904 3.29995 18.9694 1.93125 18.2119V18.3338C1.92985 20.6084 2.7162 22.8132 4.15662 24.5736C5.59704 26.334 7.60265 27.5412 9.8325 27.99C8.38411 28.3863 6.86396 28.4441 5.38969 28.1588C6.01891 30.1149 7.24315 31.8258 8.89154 33.0527C10.5399 34.2796 12.5302 34.9613 14.5847 35.0025C11.0968 37.7423 6.78835 39.2283 2.35313 39.2213C1.56657 39.2201 0.780798 39.1719 0 39.0769C4.50571 41.9676 9.74706 43.5028 15.1003 43.5Z"
              fill="#FFFFFFF"
            />
          </g>
          <defs>
            <clipPath id="clip0_17_80">
              <rect width="48" height="48" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),

      title: "Follow us on Twitter",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        name: "Send us DMs",
        href: "javascript:void(0)",
      },
    },
  ];
  return (
    <div className="min-h-screen">
      <Navbar userType="student" />
      <div
        className="pattern-overlay pattern-left absolute -z-10"
        style={{ transform: "scaleY(-1)", top: "-50px" }}
      >
        <img src="/images/landing/lleft.png" alt="pattern" />
      </div>
      <div
        className="pattern-overlay pattern-right absolute bottom-0 right-0 -z-10"
        style={{ transform: "scaleY(-1)", top: "-15px" }}
      >
        <img
          src="/images/landing/lright.png"
          alt="pattern"
          className="w-full h-full object-contain"
        />
      </div>
      <main className="justify-center items-center h-full w-full">
        <Questions faqList={faqList} />
        <div
          className="w-full mx-auto p-6 text-gray-600 gap-12 lg:flex justify-center"
          style={{ backgroundColor: "#1F2724" }}
        >
          <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
            <div className="max-w-md mb-12">
              <h3
                className=" text-3xl text-white font-semibold sm:text-4xl"
                style={{ backgroundColor: "#1F2724" }}
              >
                Let’s connect
              </h3>
              <p className="mt-3 text-white">
                We’re here to help and answer any question you might have, We
                look forward to hearing from you .
              </p>
            </div>
            <div>
              <ul className="mt-12 gap-y-6 gap-x-12 items-center md:flex lg:gap-x-0 lg:mt-0">
                {contactMethods.map((item, idx) => (
                  <li
                    key={idx}
                    className="space-y-3 border-t py-6 md:max-w-sm md:py-0 md:border-t-0 lg:border-l lg:px-12 lg:max-w-none"
                  >
                    <div className="w-12 h-12 rounded-full border flex items-center justify-center text-gray-700">
                      {item.icon}
                    </div>
                    <h4 className="text-gray-800 text-lg font-medium xl:text-xl text-white">
                      {item.title}
                    </h4>
                    <p className="text-white">{item.desc}</p>
                    <a
                      href={item.link.href}
                      className="flex items-center gap-1 text-sm duration-150 hover:text-white font-medium"
                      style={{ color: "#6B9080" }}
                    >
                      {item.link.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mx-auto w-2/3">
            {" "}
            {/* Adjust width as needed */}
            <Inquiry />
          </div>
        </div>
      </main>
    </div>
  );
}
