import React from 'react';

const Inquiry = () => {
  return (
    <section id="cta" className="bg-gray-50">
      <div className="container mx-auto xl:px-60 py-10 px-5 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="font-Merriweather text-3xl lg:text-6xl">
              Need to ask <br /> Something?
            </h2>
            <p className="pt-5 font-Jaldi text-base lg:text-lg">
              Have a Question or Concern? Our Supportive Team is Here to
              Listen, <br />
              Offer Guidance, and Provide the Help You Need. Don’t Hesitate To
              Ask.
            </p>
          </div>
          <div className="mt-6 lg:mt-0">
            <div className="grid grid-cols-1 gap-2">
              <label className="block">
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-300 focus:ring-opacity-50"
                  placeholder="Your Name"
                />
              </label>
              <label className="block">
                <textarea
                  rows={5}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-300 focus:ring-opacity-50"
                  placeholder="Your Message"
                ></textarea>
              </label>
              <button
                className="rounded-md text-white uppercase p-3 w-full"
                type="button"
                style={{ backgroundColor: '#6B9080' }}
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inquiry;
