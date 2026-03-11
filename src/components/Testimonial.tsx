'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const testimonialList = [
    {
        message: 'Clean app with a good interface.',
        name: 'Sara Connors',
        title: 'A lovely lady',
    },
    {
        message: 'Yo, this joint genuinely gas!',
        name: 'John TableTap',
        title: 'Average joe',
    },
    {
        message: 'Broooo, I love this app so much!',
        name: 'TableTap Jr.',
        title: 'Average joe son',
    },
];

export default function TestimonialSection() {
    return (
        <section className="bg-[#f5f3ef] py-20">
            <div className="mx-auto grid max-w-7xl grid-cols-3 items-center gap-8 px-6">
                {/* LEFT TEXT */}
                <div>
                    <h2 className="font-serif text-5xl">
                        Every User
                        <span className="block text-[#BEBEA5] italic">Recommends</span>
                    </h2>

                    <p className="mt-4 text-gray-600">With an amazing community to back it up!</p>
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
    );
}

function TestimonialCard() {
    const [index, setIndex] = useState(0);

    function handleNextClick() {
        setIndex((prev) => (prev + 1) % testimonialList.length);
    }

    function handleBackClick() {
        setIndex((prev) => (prev - 1 + testimonialList.length) % testimonialList.length); // this prolly wont work, check out if it loops back to the first one!
    }

    let list = testimonialList[index];

    return (
        <div className="flex h-full flex-col justify-between rounded-3xl bg-[#e9e4dc] p-10">
            <p className="text-lg leading-relaxed text-gray-700">{list.message}</p>

            <div className="mt-10 flex items-end justify-between">
                <div>
                    <p className="font-semibold">{list.name}</p>
                    <p className="text-sm text-gray-500">{list.title}</p>
                </div>

                <div className="flex gap-3">
                    <Button
                        onClick={handleBackClick}
                        variant="secondary"
                        size="icon"
                        className="rounded-lg border p-3"
                    >
                        ←
                    </Button>
                    <Button
                        onClick={handleNextClick}
                        variant="secondary"
                        size="icon"
                        className="rounded-lg border p-3"
                    >
                        →
                    </Button>
                </div>
            </div>
        </div>
    );
}
