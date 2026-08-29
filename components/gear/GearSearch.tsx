"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface GearSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function GearSearch({ value, onChange }: GearSearchProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search gear by name, brand..."
        className="h-11 pl-10"
      />
    </div>
  );
}
