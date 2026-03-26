'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ReviewData {
  id: string;
  rating: number;
  body?: string;
  createdAt: string;
  user: {
    id: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    avatarUrl?: string;
  };
}

const demoReviews: ReviewData[] = [
  {
    id: 'demo-1',
    rating: 5,
    body: 'I usually hate planning trips because it takes forever to compare flights, hotels, and things to do. This AI travel agent completely changed that for me. I told it I wanted a relaxed 5-day trip in Lisbon with good food and scenic spots, and it built a full itinerary in minutes. What impressed me most was how logical everything was—no running back and forth across the city. It even suggested local restaurants that turned out to be highlights of my trip.',
    createdAt: '2025-11-12T10:00:00Z',
    user: {
      id: 'demo-user-1',
      first_name: 'Sophie',
      last_name: 'Miller',
    },
  },
  {
    id: 'demo-2',
    rating: 4,
    body: 'Overall, this is one of the most useful travel tools I’ve tried. The interface is clean, and the recommendations feel personalized instead of generic. I liked how I could adjust my budget and instantly see different options. The only reason I’m giving 4 stars is that I would’ve liked a few more offbeat activity suggestions, but it’s still way ahead of most apps.',
    createdAt: '2025-10-28T10:00:00Z',
    user: {
      id: 'demo-user-2',
      first_name: 'Daniel',
      last_name: 'Brooks',
    },
  },
  {
    id: 'demo-3',
    rating: 5,
    body: 'This felt less like using an app and more like talking to a real travel planner. I mentioned I like quiet places, nature, and good coffee, and it built an itinerary that matched that perfectly. No tourist traps, no overcrowded spots—just solid recommendations. Honestly, I didn’t expect AI to understand preferences this well.',
    createdAt: '2025-09-15T10:00:00Z',
    user: {
      id: 'demo-user-3',
      first_name: 'Maya',
      last_name: 'Chen',
    },
  },
  {
    id: 'demo-4',
    rating: 5,
    body: 'I used this to plan a last-minute weekend trip, and it saved me. Within 10 minutes I had flights, a hotel, and a list of things to do. Normally I would spend hours switching between tabs. Everything was organized and easy to follow. If you travel even a couple of times a year, this is a no-brainer.',
    createdAt: '2025-08-21T10:00:00Z',
    user: {
      id: 'demo-user-4',
      first_name: 'Ethan',
      last_name: 'Reed',
    },
  },
  {
    id: 'demo-5',
    rating: 4,
    body: 'Very smooth experience from start to finish. I liked how the AI adjusted when I changed dates and budget—it didn’t just reset everything but actually refined the plan. One or two recommendations weren’t exactly my taste, but overall it was impressively accurate.',
    createdAt: '2025-07-30T10:00:00Z',
    user: {
      id: 'demo-user-5',
      first_name: 'Isabella',
      last_name: 'Turner',
    },
  },
  {
    id: 'demo-6',
    rating: 5,
    body: 'This is probably the closest thing to having a personal travel concierge without paying crazy fees. I used it for a 10-day Europe trip and it handled multiple cities really well. Travel times, logistics, and pacing all made sense. It removed so much stress from the planning process.',
    createdAt: '2025-06-18T10:00:00Z',
    user: {
      id: 'demo-user-6',
      first_name: 'Lucas',
      last_name: 'Martin',
    },
  },
  {
    id: 'demo-7',
    rating: 5,
    body: 'What stood out to me is how fast everything is. You just describe what you want, and within seconds you get a full plan. I also appreciated that it suggested alternatives instead of locking me into one option. It made the whole experience feel flexible and customized.',
    createdAt: '2025-05-11T10:00:00Z',
    user: {
      id: 'demo-user-7',
      first_name: 'Ava',
      last_name: 'Collins',
    },
  },
  {
    id: 'demo-8',
    rating: 4,
    body: 'I’ve tried a few AI travel tools, and this one is definitely among the best. The recommendations felt thoughtful and not copy-pasted from generic travel lists. I just wish it had slightly deeper cultural tips or local insights, but even without that, it’s extremely helpful.',
    createdAt: '2025-04-02T10:00:00Z',
    user: {
      id: 'demo-user-8',
      first_name: 'Noah',
      last_name: 'Parker',
    },
  },
  {
    id: 'demo-9',
    rating: 5,
    body: 'I used this for planning a trip with friends, and it actually balanced everyone’s preferences surprisingly well. We had people who wanted nightlife, others who wanted sightseeing, and it managed to combine both into one itinerary. That alone saved us from a lot of arguments.',
    createdAt: '2025-03-14T10:00:00Z',
    user: {
      id: 'demo-user-9',
      first_name: 'Chloe',
      last_name: 'Adams',
    },
  },
  {
    id: 'demo-10',
    rating: 5,
    body: 'This tool made travel planning enjoyable instead of stressful. I liked how it broke everything down day by day, with clear suggestions and timing. It felt like it really understood the destination instead of just listing popular places. I’ll definitely keep using it for future trips.',
    createdAt: '2025-02-07T10:00:00Z',
    user: {
      id: 'demo-user-10',
      first_name: 'James',
      last_name: 'Walker',
    },
  },
];

const UserReviews = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews/public');
        const data = await res.json();

        if (Array.isArray(data)) {
          setReviews([...data, ...demoReviews]);
        } else {
          setReviews(demoReviews);
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        setReviews(demoReviews);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [reviews.length]);

  useEffect(() => {
    if (
      reviews.length === 0 ||
      !sectionRef.current ||
      !titleRef.current ||
      !subtitleRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 25,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 65%',
        once: true,
        onEnter: () => {
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          });

          gsap.to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.1,
            ease: 'power2.out',
          });
        },
      });
    });

    return () => ctx.revert();
  }, [reviews.length]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (loading || reviews.length === 0) {
    return null;
  }

  const review = reviews[current];
  const userName = review.user.first_name
    ? `${review.user.first_name} ${review.user.last_name || ''}`.trim()
    : review.user.username || 'Anonymous';

  return (
    <section ref={sectionRef} className="snap-start w-full py-32">
      <div className="flex flex-col w-full justify-center items-center gap-20 px-4">
        <div className="flex flex-col items-center gap-3">
          <h1
            ref={titleRef}
            className="text-5xl md:text-5xl font-made-outer-alt font-black text-white text-center max-w-3xl"
          >
            ratEd by thE road
          </h1>

          <h2
            ref={subtitleRef}
            className="text-xl md:text-5xl font-made-outer-alt font-black text-gray-400 text-center max-w-2xl"
          >
            lovEd by thE nomads
          </h2>
        </div>

        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center gap-8"
            >
              {review.body && (
                <div className="space-y-4">
                  <p className="text-2xl md:text-2xl font-made-outer text-white italic leading-relaxed">
                    &quot;{review.body}&quot;
                  </p>
                </div>
              )}

              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div className="flex flex-col items-center gap-3">
                {review.user.avatarUrl ? (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={review.user.avatarUrl}
                      alt={userName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-lg font-black text-white">
                      {userName.charAt(0)}
                    </span>
                  </div>
                )}

                <div>
                  <p className="font-bold text-white font-made-outer-alt text-lg">
                    {userName}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="p-2 rounded-full border-2 border-white hover:bg-white hover:text-black text-white transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={next}
              className="p-2 rounded-full border-2 border-white hover:bg-white hover:text-black text-white transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserReviews;