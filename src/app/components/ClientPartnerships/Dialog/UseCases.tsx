"use client";

import React from "react";
import type { ClientPartnershipsUseCases } from "../../../lib/api";
import ClientInfoModal from "./ClientInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ClientPartnershipsUseCases;
}

const defaultItems = [
  {
    img: {
      alt: "Nurse at clinic",
      src: "/images/client-partnerships/nurse-review.png",
    },
    title:
      '"Before GREEN, Our Clinic Had No Light After 5 PM. Now We Perform Safe Deliveries At Night."',
    reference: "– Nurse, Gulf Province",
  },
  {
    img: {
      alt: "Parent with children",
      src: "/images/client-partnerships/rural-review.png",
    },
    title:
      '"This Solar System Lets My Children Study In The Evening. That\'s Something We Never Had Before."',
    reference: "– Parent, Rural Central PNG",
  },
  {
    img: {
      alt: "Local technician",
      src: "/images/client-partnerships/incubator-review.png",
    },
    title:
      '"I Was Trained By GREEN. Now I Earn As An O&M Technician And Support My Family."',
    reference: "– Incubator Graduate, Madang",
  },
  {
    img: {
      alt: "Village elder",
      src: "/images/client-partnerships/elder-review.png",
    },
    title:
      '"We Used To Travel Hours For Fuel. Now We Have Clean Power In The Village — Always."',
    reference: "– Village Elder, Eastern Highlands",
  },
];

const UseCases = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title ?? "Client Testimonials / Use Cases";
  const items = data?.items ?? defaultItems;

  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
          {title}
        </h2>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, idx) => (
          <div key={idx} className="overflow-hidden">
            <img loading="lazy" decoding="async"
              src={item.img.src}
              alt={item.img.alt}
              className="h-48 w-full object-cover"
            />
            <div className="pt-4">
              <p className="mb-3 text-sm font-medium italic leading-relaxed text-gray-800">
                {item.title}
              </p>
              <p className="text-xs font-semibold text-[#4CAF50]">
                {item.reference}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ClientInfoModal>
  );
};

export default UseCases;
