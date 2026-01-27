import { motion, AnimatePresence } from "framer-motion";
import useGetAllPlacements from "@/hooks/placement/useGetAllPlacements";
import PlacementCard from "@/components/shared/PlacementCard";
import Pagination from "@/components/shared/Pagination";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import useCustomScroll from "@/hooks/global/useCustomScroll";
import { useEffect } from "react";
import DemoClassSection from "./shared/demoClassSection/DemoClassSection";

export default function PlacementPage() {
  const {
    placements,
    isLoading,
    page,
    totalPages,
    totalItems,
    goToPage,
    nextPage,
    prevPage,
  } = useGetAllPlacements({ page: 1, limit: 6 });
  const { scrollToTop } = useCustomScroll();
  useEffect(() => {
    scrollToTop();
  }, [page]);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50/0 via-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="IMAGIC Students Placement"
          subtitle="Don't just take our word for it - hear from our satisfied customers"
          showStats={true}
          currentPage={page}
          itemsPerPage={6}
          totalItems={totalItems}
        />

        {!placements || placements.length === 0 ? (
          <EmptyState message="No placements found." />
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <AnimatePresence mode="wait">
                {placements.map((placement, index) => (
                  <PlacementCard
                    key={index}
                    placement={placement}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={goToPage}
              onNext={nextPage}
              onPrev={prevPage}
            />
          </>
        )}
      </div>
      <DemoClassSection />
    </div>
  );
}
