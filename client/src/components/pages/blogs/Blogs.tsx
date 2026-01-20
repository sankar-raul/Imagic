import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useRef } from "react";
import PageHeader from "@/components/shared/PageHeader";
import useGetAllBlogs from "@/hooks/blog/useGetAllBlogs";
import { BlogCardSkeleton } from "@/components/shared/skeletons";

const Blogs = () => {
  const { blogs, isLoading, isLoadingMore, hasMore, loadMore } = useGetAllBlogs(
    { limit: 6, infinite: true },
  );

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoadingMore, loadMore]);

  const formatDate = (dateString: string | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Our Blogs"
        subtitle="Insights, tutorials, and updates from the world of design and animation"
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            // Loading Skeleton
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          ) : blogs.length === 0 ? (
            // Empty State
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-neutral-400" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                No blogs yet
              </h3>
              <p className="text-neutral-600">
                Check back soon for exciting content!
              </p>
            </motion.div>
          ) : (
            <>
              {/* Blog Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {blogs.map((blog, index) => (
                  <motion.article
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-100"
                  >
                    <Link to={`/blogs/${blog.slug}`}>
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden bg-neutral-100">
                        <img
                          src={blog.thumbnail}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://imagic.net.in/wp-content/uploads/2025/05/marketing-4.webp";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm text-neutral-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(blog.posted_date)}</span>
                          </div>
                          (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>Admin</span>
                          </div>
                          )
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-neutral-900 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                          {blog.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-neutral-600 line-clamp-3 leading-relaxed">
                          {blog.content
                            ?.replace(/<[^>]*>/g, "")
                            .substring(0, 120)}
                          ...
                        </p>

                        {/* Read More */}
                        <div className="flex items-center gap-2 text-yellow-600 font-semibold group-hover:gap-3 transition-all">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>

              {/* Infinite Scroll Trigger & Loader */}
              <div ref={observerTarget} className="flex justify-center py-8">
                {isLoadingMore && (
                  <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, index) => (
                      <BlogCardSkeleton key={index} />
                    ))}
                  </div>
                )}
                {!hasMore && blogs.length > 0 && (
                  <p className="text-neutral-500 font-medium">
                    You've reached the end
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
