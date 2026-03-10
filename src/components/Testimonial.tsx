"use client";
import { useState } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";

const testimonialList = [{
    message: 'Clean app with a good interface.',
    name: 'Sara Connors',
    title: 'A lovely lady'
}, {
    message: 'Yo, this joint genuinely gas!',
    name: 'John TableTap',
    title: 'Average joe'
}, {
    message: 'Broooo, I love this app so much!',
    name: 'TableTap Jr.',
    title: 'Average joe son'
}];

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-[#f5f3ef]">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 items-center px-6">

        {/* LEFT TEXT */}
        <div>
          <h2 className="text-5xl font-serif">
            Every User
            <span className="text-[#BEBEA5] italic block">Recommends</span>
          </h2>

          <p className="mt-4 text-gray-600">
            With an amazing community to back it up!
          </p>
        </div>

        {/* CENTER IMAGE */}
        <div>
          <Image
            src="/photo_5866338767407353303_y.jpg"
            className="rounded-3xl object-cover"
            alt="therapy"
            width={1206}
            height={882}
          />
        </div>

        {/* RIGHT TESTIMONIAL */}
        <TestimonialCard />

      </div>
    </section>
  )
}

function TestimonialCard() {
    const [index, setIndex] = useState(0);

    const prev = index === 0 ? testimonialList.length - 1 : index - 1;

    function handleNextClick() {
        setIndex((prev) => (prev + 1) % testimonialList.length);
    }

    function handleBackClick() {
        setIndex((prev) => (prev - 1 + testimonialList.length) % testimonialList.length);        // this prolly wont work, check out if it loops back to the first one!
    }

    let list = testimonialList[index];

  return (
    <div className="bg-[#e9e4dc] p-10 rounded-3xl h-full flex flex-col justify-between">

      <p className="text-lg leading-relaxed text-gray-700">
        {list.message}
      </p>

      <div className="flex justify-between items-end mt-10">

        <div>
          <p className="font-semibold">{list.name}</p>
          <p className="text-gray-500 text-sm">{list.title}</p>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleBackClick} variant="secondary" size="icon" className="border p-3 rounded-lg">←</Button>
          <Button onClick={handleNextClick} variant="secondary" size="icon" className="border p-3 rounded-lg">→</Button>
        </div>

      </div>

    </div>
  )
}