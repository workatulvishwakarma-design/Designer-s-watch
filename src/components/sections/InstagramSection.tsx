import React from "react";
import { fetchInstagramFeed } from "@/lib/instagram";
import InstagramCarousel from "@/components/instagram/InstagramCarousel";

export default async function InstagramSection() {
  const feed = await fetchInstagramFeed();
  const hasLivePosts = feed.posts && feed.posts.length > 0;

  if (!hasLivePosts) {
    return null;
  }

  return (
    <section
      id="instagram-feed"
      aria-label="Instagram Feed - See You On The Gram"
      className="relative w-full bg-white text-black pt-14 pb-14 sm:pt-16 sm:pb-16 md:pt-20 md:pb-24 overflow-hidden select-none"
    >
      {/* Centered Heading Matching Reference */}
      <div className="w-full text-center mb-6 sm:mb-8 md:mb-10 px-4">
        <h2 className="font-montserrat text-xs sm:text-[13px] text-[#111111] font-medium tracking-[0.24em] uppercase">
          SEE YOU ON THE &apos;GRAM
        </h2>
      </div>

      {/* Edge-to-Edge Continuous Carousel */}
      <div className="w-full">
        <InstagramCarousel posts={feed.posts} profileUrl={feed.profileUrl} />
      </div>
    </section>
  );
}
