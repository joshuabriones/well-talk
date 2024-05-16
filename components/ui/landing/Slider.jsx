import { useEffect, useState } from "react";

const LandingSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const frames = [
        {
            title: "Dr. Olivia Parker",
            imageUrl: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Dr. Parker's expertise in family therapy and relational dynamics fosters healthy communication, emotional growth, and stronger relationships, helping individuals and families navigate challenges and build resilience.",
        },
        {
            title: "Dr. Emily Watson ",
            imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
            description: "Dr. Watson specializes in trauma-informed care and psychotherapy, offering a nurturing environment for clients to explore emotions, develop resilience, and foster positive mental health.",
        },
        {
            title: "Dr. Joshua Evans ",
            imageUrl: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
            description: "With expertise in cognitive-behavioral therapy and mindfulness practices, Dr. Carter helps individuals navigate anxiety, trauma, and life transitions with personalized strategies for holistic well-being.",
        },
        {
            title: "Dr. Benjamin Carter",
            imageUrl: "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHByb2Zlc3Npb25hbHxlbnwwfHwwfHx8MA%3D%3D",
            description: "Dr. Evans is dedicated to addiction recovery, providing evidence-based interventions, motivational support, and relapse prevention strategies to empower individuals on their journey to sobriety and wellness.",
        },
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? frames.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === frames.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.keyCode === 37) handlePrev();
            if (e.keyCode === 39) handleNext();
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="my-12">
            <div className="gallery border-2 rounded mx-auto m-5 bg-white">
                <div className="top flex p-2 border-b select-none">
                    <div className="buttons ml-2 text-gray-600 bg-gray-200 rounded-md">
                        <svg
                            onClick={handlePrev}
                            className="w-7 p-1 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                    </div>
                    <div className="buttons ml-auto flex text-gray-600 bg-gray-200 rounded-md">
                        <svg
                            onClick={handleNext}
                            className="w-7 p-1 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </div>
                </div>
                <div className="content-area overflow-hidden flex flex-col md:flex-row">
                    <div className="image-container w-full md:w-1/2">
                        <img
                            className={`w-full h-72 md:h-full object-cover slide-animation-${currentIndex}`}
                            src={frames[currentIndex].imageUrl}
                            alt={frames.title}
                        />
                    </div>
                    <div className="description-container w-full md:w-1/2 p-4 md:p-6">
                        <div className="head text-lg md:text-2xl font-bold mb-4 md:mb-6 font-Merriweather">
                            {frames[currentIndex].title}
                        </div>
                        <div className="long-text text-base md:text-lg mr-6">
                            {frames[currentIndex].description}
                        </div>
                        <button className="mt-4 md:mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm md:text-base font-medium rounded-md py-2 px-4">
                            View Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingSlider;