import { useState } from "react";
import SubjectInput from "./inputs/InputSubject";
import QuestionInput from "./inputs/InputQuestion";

const Inquiry = ({ userId }) => {
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");

  const handleInquirySubmission = async () => {
    try {
      const response = await fetch("/api/inquiry/create-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: userId,
          subject,
          message: question,
          date: new Date().toISOString(),
          time: new Date().toLocaleTimeString(),
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section id="cta" className="bg-gray-50">
      <div className="container mx-auto xl:px-60 py-10 px-5 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="font-Merriweather text-3xl lg:text-6xl text-center lg:text-left">
              Need to ask <br /> Something?
            </h2>
            <p className="pt-5 font-Jaldi text-base lg:text-lg text-center lg:text-left">
              Have a Question or Concern? Our Supportive Team is Here to Listen,{" "}
              <br />
              Offer Guidance, and Provide the Help You Need. Don’t Hesitate To
              Ask.
            </p>
          </div>
          <div className="mt-6 lg:mt-0">
            <div className="grid grid-cols-1 gap-2">
              <SubjectInput
                placeholder="Subject"
                subject={subject}
                setSubject={setSubject}
              />
              <QuestionInput question={question} setQuestion={setQuestion} />
              <button
                className="rounded-md text-white uppercase p-3 w-full"
                type="button"
                style={{ backgroundColor: "#6B9080" }}
                onClick={handleInquirySubmission}
              >
                Submit Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inquiry;
