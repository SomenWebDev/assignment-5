"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface GearPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function GearPagination({
  currentPage,
  totalPages,
}: GearPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  // Compact page list: 1 ... current-1, current, current+1 ... last
  const pages = new Set<number>();
  pages.add(1);
  pages.add(totalPages);
  for (let p = currentPage - 1; p <= currentPage + 1; p++) {
    if (p >= 1 && p <= totalPages) pages.add(p);
  }
  const sortedPages = Array.from(pages).sort((a, b) => a - b);

  return (
    <div className="flex items-center justify-center gap-1 pt-4">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage <= 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        <ChevronLeft className="size-4" />
      </Button>

      {sortedPages.map((page, idx) => {
        const prevPage = sortedPages[idx - 1];
        const showEllipsis = prevPage !== undefined && page - prevPage > 1;

        return (
          <div key={page} className="flex items-center gap-1">
            {showEllipsis && (
              <span className="px-2 text-sm text-muted-foreground">…</span>
            )}
            <Button
              variant={page === currentPage ? "default" : "outline"}
              size="icon"
              className={
                page === currentPage
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : ""
              }
              onClick={() => goToPage(page)}
            >
              {page}
            </Button>
          </div>
        );
      })}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage >= totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
