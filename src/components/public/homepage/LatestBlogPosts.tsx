import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/public/BlogCard";

interface LatestBlogPostsProps {
  posts?: any[];
}

export function LatestBlogPosts({ posts = [] }: LatestBlogPostsProps) {
  const defaultPosts = [
    {
      slug: "bi-quyet-nang-band-ielts-speaking-tu-6-len-7-5",
      title: "Bí quyết nâng band IELTS Speaking từ 6.0 lên 7.5 trong 60 ngày",
      excerpt:
        "Chi tiết chiến thuật mở rộng luận điểm tự nhiên, cách ứng dụng thành ngữ Idiomatic language không bị gượng gạo theo chia sẻ từ cựu giám khảo.",
      categoryName: "Luyện thi IELTS",
      readTimeMinutes: 5,
      publishedAt: "2025-05-12",
      coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80",
    },
    {
      slug: "giai-doan-vang-giup-tre-4-6-tuoi-tiep-nhan-song-ngu",
      title: "Giai đoạn vàng giúp trẻ 4 - 6 tuổi tiếp nhận song ngữ tự nhiên",
      excerpt:
        "Khoa học thần kinh về vùng não Broca trong việc học ngôn ngữ thứ hai trước 7 tuổi và cách phụ huynh có thể đồng hành cùng con mỗi tối.",
      categoryName: "Phương pháp mầm non",
      readTimeMinutes: 7,
      publishedAt: "2025-05-08",
      coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80",
    },
    {
      slug: "loi-the-vuot-troi-cua-chung-chi-cambridge",
      title: "Lợi thế vượt trội của chứng chỉ Cambridge Starters, Movers, Flyers",
      excerpt:
        "Tại sao các trường THCS và THPT chọn chứng chỉ Cambridge làm tiêu chí tuyển thẳng và đánh giá năng lực ngoại ngữ đầu vào?",
      categoryName: "Chứng chỉ Cambridge",
      readTimeMinutes: 4,
      publishedAt: "2025-05-02",
      coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
    },
  ];

  const displayPosts = posts.length >= 3
    ? posts.slice(0, 3).map((p, idx) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        categoryName: p.category?.name || defaultPosts[idx].categoryName,
        readTimeMinutes: p.readTimeMinutes || defaultPosts[idx].readTimeMinutes,
        publishedAt: p.publishedAt || defaultPosts[idx].publishedAt,
        coverImage: p.coverImage || defaultPosts[idx].coverImage,
      }))
    : defaultPosts;

  return (
    <section className="w-full py-16 lg:py-24 bg-surface-subtle border-t border-border/50" id="tin-tuc-blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-left">
            <span className="text-xs uppercase text-primary-vibrant tracking-wider font-bold">
              GÓC CHUYÊN GIA & HỌC THUẬT
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-heading mt-1">
              Tin tức, cẩm nang & kinh nghiệm học tiếng Anh
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-vibrant transition-colors shrink-0"
          >
            <span>Xem tất cả bài viết</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {displayPosts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              categoryName={post.categoryName}
              coverImage={post.coverImage}
              publishedAt={post.publishedAt}
              readTimeMinutes={post.readTimeMinutes}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
