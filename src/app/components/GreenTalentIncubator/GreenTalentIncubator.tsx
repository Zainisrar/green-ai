"use client";
import React, { useState } from "react";
import Chatbot from "../Chatbot";
import TopNavigation from "../TopNavigation/TopNavigation";
import { useGreenTalentIncubator } from "../../../hooks/useGreenTalentIncubator";
import Link from "next/link";

const GreenTalentIncubator = () => {
  const { data } = useGreenTalentIncubator();
  const main = data?.mainPage;
  const why = data?.modals.whyWeBuiltThis;
  const offer = data?.modals.whatWeOffer;
  const model = data?.modals.ourModel;
  const partner = data?.modals.partnerWithUs;
  const alumni = data?.modals.alumniVoices;

  const [active, setActive] = useState<{
    activeIndex: number;
    data: React.JSX.Element;
  }>({
    activeIndex: 0,
    data: (
      <div className="">
        <div className="mb-8">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
            Why We Built This
          </h3>
          <p className="text-gray-900 font-semibold mb-4">
            "Energy transformation needs talent transformation."
          </p>
        </div>
      </div>
    ),
  });

  const handleActive = (index: number) => {
    setActive((prev) => ({ ...prev, activeIndex: index }));
  };

  const handleData = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="">
            <div className="mb-8">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                {why?.title ?? "Why We Built This"}
              </h3>
              <p className="ont-semibold mb-4 italic text-[#23B14D]">
                {why?.description ?? '"Energy transformation needs talent transformation."'}
              </p>
              <p className="text-gray-700 font-semibold mb-4">
                {why?.key.title ?? "GREEN realized that most talent pipelines were:"}
              </p>
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                {(why?.key.items ?? [
                  "Too academic, not applied",
                  "Too urban, not inclusive",
                  "Too global, not grounded",
                ]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-700 font-semibold mt-6">
                {why?.quote.text
                  ? why.quote.text.split(why.quote.highlighted).map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="text-[#23B14D] font-bold">
                            {why.quote.highlighted}
                          </span>
                        )}
                      </React.Fragment>
                    ))
                  : "The Talent Incubator solves this by embedding technical skill development directly into our project ecosystem."}
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
              {offer?.title ?? "What We Offer"}
            </h3>
            {(offer?.items ?? []).map((item, idx) => (
              <div key={idx} className="space-y-2 mb-4">
                <h4 className="text-[#23B14D] font-bold">{item.title}</h4>
                <p className="text-gray-700 font-semibold whitespace-pre-line">
                  {item.description.text
                    .split(item.description.highlighted)
                    .map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="text-[#23B14D] font-bold">
                            {item.description.highlighted}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                </p>
              </div>
            ))}
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
              Our Model
            </h3>
            <h4 className="text-xl font-bold text-[#23B14D] mb-6">
              {model?.title.step1}
              {model?.title.step2}
              {model?.title.step3}
            </h4>
            {(model?.key ?? []).map((item, idx) => (
              <div key={idx} className="space-y-2 mb-4">
                <p className="text-gray-700 font-semibold">
                  <span className="text-[#23B14D] font-bold">{item.title}</span>
                  {item.description}
                </p>
              </div>
            ))}
            <div className="bg-[#23B14D]/10 p-6 rounded-lg mt-6">
              <p className="text-lg font-semibold text-gray-800">
                {model?.quote.text
                  ? model.quote.text.split(model.quote.highlighted).map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="text-[#23B14D] font-bold">
                            {model.quote.highlighted}
                          </span>
                        )}
                      </React.Fragment>
                    ))
                  : "82% of Incubator alumni are now working in energy, infrastructure, or green enterprise sectors."}
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
              {partner?.title ?? "Partner With Us"}
            </h3>
            <p className="text-lg text-gray-700 mb-6 italic">
              {partner?.description ?? "We Invite"}
            </p>
            {(partner?.keys ?? []).map((item, idx) => (
              <div key={idx} className="space-y-1 mb-4">
                <h4 className="font-bold text-gray-800">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        );

      case 4:
        return (
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
              {alumni?.title ?? "Alumni Voices"}
            </h3>
            <div className="space-y-6">
              <div className="bg-white/30 p-4 rounded">
                <p className="text-gray-700 whitespace-pre-line">
                  {alumni?.voices.text1 ??
                    '"Before GREEN, I had theory. After GREEN, I had tools, teams, and a future."\n – Solar Technician, East Sepik'}
                </p>
              </div>
              <div className="bg-white/30 p-4 rounded">
                <p className="text-gray-700 whitespace-pre-line">
                  {alumni?.voices.text2 ??
                    '"The Incubator gave me confidence — now I lead installs across three provinces."\n – Solar Technician, East Sepik'}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <div className="lg:block hidden absolute top-0 left-32">
        <img
          src="/images/green-talent-incubator/mainImg.png"
          className="h-[140vh]"
          alt="bg"
        />
      </div>
      <div className="mb-20 lg:mb-0">
        <TopNavigation />
        <div className="flex h-full">
          <div className="w-1/10 flex items-center justify-center">
            <div className="fixed top-1/2 lg:top-1/5 left-4 lg:left-14">
              <img
                src="/images/green-talent-incubator/icn.png"
                alt="talent-incubator"
                className="w-4 lg:w-7"
              />
            </div>
          </div>

          <div className="pl-14 lg:pl-24 relative z-20 pr-4 pt-8">
            <div className="">
              <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                  {main?.title ? (
                    <>
                      GREEN <span className="text-[#23B14D]">TALENT</span> INCUBATOR
                    </>
                  ) : (
                    <>
                      GREEN <span className="text-[#23B14D]">TALENT</span> INCUBATOR
                    </>
                  )}
                </h1>
                <h2 className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                  {main?.subHeadline ?? "From Learners to Leaders. From Classroom to Field."}
                </h2>
                {main?.description ? (
                  <div className="text-gray-600 font-semibold text-lg mb-8 whitespace-pre-line">
                    {main.description.text
                      .split(main.description.headline)
                      .map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="text-[#23B14D] font-bold">
                              {main.description.headline}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-600 font-semibold text-lg mb-8">
                    The GREEN Talent Incubator is where technical education meets real-world
                    execution. We train and mentor the engineers, technicians, planners, and
                    project leads who will power the next decade of clean energy in Papua New
                    Guinea — and beyond.
                  </p>
                )}
              </div>

              <div className="flex my-20 lg:hidden p-2 relative">
                <div className="absolute -left-14 top-12">
                  <img
                    src="/images/community-impact-loop/shape.png"
                    alt="shape"
                    className="w-14"
                  />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                    Energy transformation
                  </h3>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800">
                    needs talent transformation.
                  </h3>
                </div>
                <div className="-mt-4">
                  <img
                    src="/images/community-impact-loop/shape2.png"
                    alt="shape"
                    className="w-14"
                  />
                </div>
              </div>

              <div className="lg:flex space-x-8">
                <div className="space-y-8">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleActive(0);
                      const newData = handleData(0);
                      if (newData) {
                        setActive((prev) => ({ ...prev, data: newData }));
                      }
                    }}
                  >
                    <h3
                      className={`text-lg lg:text-xl font-bold ${
                        active.activeIndex === 0 ? "text-[#23B14D]" : "text-gray-800"
                      } mb-2`}
                    >
                      {why?.title ?? "Why We Built This"}
                    </h3>
                  </div>

                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleActive(1);
                      const newData = handleData(1);
                      if (newData) {
                        setActive((prev) => ({ ...prev, data: newData }));
                      }
                    }}
                  >
                    <h3
                      className={`text-lg lg:text-xl font-bold ${
                        active.activeIndex === 1 ? "text-[#23B14D]" : "text-gray-800"
                      } mb-2`}
                    >
                      {offer?.title ?? "What We Offer"}
                    </h3>
                  </div>

                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleActive(2);
                      const newData = handleData(2);
                      if (newData) {
                        setActive((prev) => ({ ...prev, data: newData }));
                      }
                    }}
                  >
                    <h3
                      className={`text-lg lg:text-xl font-bold ${
                        active.activeIndex === 2 ? "text-[#23B14D]" : "text-gray-800"
                      } mb-2`}
                    >
                      Our Model
                    </h3>
                  </div>

                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleActive(3);
                      const newData = handleData(3);
                      if (newData) {
                        setActive((prev) => ({ ...prev, data: newData }));
                      }
                    }}
                  >
                    <h3
                      className={`text-lg lg:text-xl font-bold ${
                        active.activeIndex === 3 ? "text-[#23B14D]" : "text-gray-800"
                      } mb-2`}
                    >
                      {partner?.title ?? "Partner With Us"}
                    </h3>
                  </div>

                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleActive(4);
                      const newData = handleData(4);
                      if (newData) {
                        setActive((prev) => ({ ...prev, data: newData }));
                      }
                    }}
                  >
                    <h3
                      className={`text-lg lg:text-xl font-bold ${
                        active.activeIndex === 4 ? "text-[#23B14D]" : "text-gray-800"
                      } mb-2`}
                    >
                      {alumni?.title ?? "Alumni Voices"}
                    </h3>
                  </div>
                </div>

                <div className="lg:flex hidden p-2 relative">
                  <div className="absolute -left-14 top-12">
                    <img
                      src="/images/community-impact-loop/shape.png"
                      alt="shape"
                      className="w-14"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2 italic">
                      Energy transformation
                    </h3>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800 italic">
                      needs talent transformation.
                    </h3>
                  </div>
                  <div className="-mt-4">
                    <img
                      src="/images/community-impact-loop/shape2.png"
                      alt="shape"
                      className="w-14"
                    />
                  </div>
                </div>
                <div className={`my-12 lg:my-0`}>{active.data}</div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl lg:text-2xl max-w-xl capitalize leading-9 font-bold text-gray-800">
                "The <span className="text-[#23B14D]">Incubator</span> Gave Me Confidence — Now I
                Lead Installs Across Three Provinces."
                <br />— O&M Lead, <span className="text-[#23B14D]">GREEN</span> Projects
              </h3>
            </div>
          </div>
        </div>
        {data?.mainPage.cta && data?.mainPage.cta.length > 0 ? (
          <div className="flex flex-col items-end gap-8 ">
            <Link href={data.mainPage.cta[0]?.href ?? "#"} className="relative flex justify-end cursor-pointer">
              <img src="/images/green-talent-incubator/apply-program.png" alt="Apply for a Program" />
              <div className="absolute top-4 font-bold right-16 lg:right-20">
                {data.mainPage.cta[0]?.text ?? "Apply for a Program"}
              </div>
            </Link>
            <Link href={data.mainPage.cta[1]?.href ?? "#"} className="relative flex justify-end cursor-pointer">
              <img src="/images/green-talent-incubator/green.png" alt="Partnership Brief" />
              <div className="absolute top-3 lg:top-4 lg:text-base text-sm font-bold right-16 lg:right-20">
                {data.mainPage.cta[1]?.text ?? "GREEN Talent Incubator Partnership Brief (PDF)"}
              </div>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-end my-8 cursor-pointer">
              <img src="/images/green-talent-incubator/apply-program.png" alt="Apply for a Program" />
            </div>
            <div className="flex justify-end my-8 cursor-pointer">
              <img src="/images/green-talent-incubator/green.png" alt="Partnership Brief" />
            </div>
          </>
        )}
      </div>
      <Chatbot />
    </React.Fragment>
  );
};

export default GreenTalentIncubator;
