import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/properties';
import { BlogArticle } from '../types/property';
import { SafeImage } from '../components/SafeImage';

export const BlogScreen: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  if (selectedArticle) {
    return (
      <div className="bg-[#FAFBFB] min-h-screen pb-14">
        <div className="bg-white border-b border-[#E5ECE9]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center">
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2A3931] hover:text-[#1B7A4B] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </button>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
          <div className="flex items-center gap-2 text-xs text-[#617269]">
            <span className="font-semibold text-[#1B7A4B]">{selectedArticle.category}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedArticle.date}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedArticle.readTime}</span>
          </div>

          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-[#14211A] leading-tight">
            {selectedArticle.title}
          </h1>

          <div className="mt-5 flex items-center gap-3">
            <SafeImage
              src={selectedArticle.authorAvatar}
              alt={selectedArticle.author}
              variant="avatar"
              fallbackLabel={selectedArticle.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-display text-sm font-bold text-[#14211A]">
                {selectedArticle.author}
              </p>
              <p className="text-xs text-[#617269]">HomeVista Editorial Advisor</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl overflow-hidden aspect-[16/9] border border-[#E4EAE7]">
            <SafeImage
              src={selectedArticle.image}
              alt={selectedArticle.title}
              fallbackLabel={selectedArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-[#2A3931]">
            {selectedArticle.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFBFB] min-h-screen pb-14">
      <div className="bg-white border-b border-[#E5ECE9]">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 py-10">
          <p className="text-xs font-semibold text-[#1B7A4B] tracking-wide">
            HomeVista Journal
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-[#14211A]">
            Market Insights & Home Buying Guides
          </h1>
          <p className="mt-2 text-sm text-[#5B6B62] max-w-xl">
            Research, neighborhood pricing trends, and architectural checklists written by our local market advisors.
          </p>
        </div>
      </div>

      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group bg-white rounded-2xl border border-[#E4EAE7] overflow-hidden cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] bg-[#EEF3F0] overflow-hidden">
                  <SafeImage
                    src={article.image}
                    alt={article.title}
                    fallbackLabel={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-[#617269]">
                    <span className="font-semibold text-[#1B7A4B]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="mt-2 font-display text-lg font-bold text-[#14211A] group-hover:text-[#1B7A4B] transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#5B6B62] leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-[#F1F5F3] flex items-center justify-between">
                <span className="text-xs font-medium text-[#43534A]">{article.author}</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B7A4B]">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
