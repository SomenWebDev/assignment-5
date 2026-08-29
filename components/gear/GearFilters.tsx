"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DollarSign, Search, Tag, X } from "lucide-react";

import type { ICategory } from "@/lib/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GearFiltersProps {
  categories: ICategory[];
}

export default function GearFilters({ categories }: GearFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentBrand = searchParams.get("brand") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentCategoryId = searchParams.get("categoryId") || "all";

  const [search, setSearch] = useState(currentSearch);
  const [brand, setBrand] = useState(currentBrand);
  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);

  function updateUrl(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Filter change হলে প্রথম page-এ ফিরে যাবে
    params.delete("page");

    const queryString = params.toString();

    router.replace(queryString ? `/gear?${queryString}` : "/gear");
  }

  // Live Search
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateUrl({
        search: search.trim() || null,
      });
    }, 500);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Live Brand Filter
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateUrl({
        brand: brand.trim() || null,
      });
    }, 500);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  // Live Price Filter
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateUrl({
        minPrice: minPrice.trim() || null,
        maxPrice: maxPrice.trim() || null,
      });
    }, 500);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPrice, maxPrice]);

  function handleCategoryChange(value: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "all") {
      params.delete("categoryId");
    } else {
      params.set("categoryId", value);
    }

    params.delete("page");

    const queryString = params.toString();

    router.push(queryString ? `/gear?${queryString}` : "/gear");
  }

  function handleClearFilters() {
    // Local input state clear
    setSearch("");
    setBrand("");
    setMinPrice("");
    setMaxPrice("");

    // সমস্ত URL filters clear
    router.replace("/gear");
  }

  const hasActiveFilters =
    currentSearch ||
    currentBrand ||
    currentMinPrice ||
    currentMaxPrice ||
    currentCategoryId !== "all";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search gear..."
            className="h-11 pl-10"
          />
        </div>

        {/* Category */}
        <Select value={currentCategoryId} onValueChange={handleCategoryChange}>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>

            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Brand */}
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            type="search"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            placeholder="Filter by brand..."
            className="h-11 pl-10"
          />
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-2">
          {/* Min Price */}
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="number"
              min="0"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              placeholder="Min"
              className="h-11 pl-10"
            />
          </div>

          {/* Max Price */}
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="Max"
              className="h-11 pl-10"
            />
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
          >
            <X className="mr-2 size-4" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
