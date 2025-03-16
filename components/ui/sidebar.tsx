"use client";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { ProductState } from "@/lib/validators/product-validator";

export const SORT_OPTIONS = [
  { name: "None", value: "none" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
] as const; // as const creates read-only const

const TYPE_FILTERS = {
  id: "type",
  name: "Type",
  options: [
    { value: "bcaa", label: "BCAA" },
    { value: "beta alanine", label: "Beta-Alanine" },
    { value: "creatine", label: "Creatine" },
    { value: "whey protein", label: "Whey Protein" },
  ],
};

// to display which category of products is being displayed, not implemented
const SUPPLEMENT_TYPES = [
  { name: "BCAA", selected: true, href: "#" },
  { name: "Beta Alanine", selected: false, href: "#" },
  { name: "Creatine", selected: false, href: "#" },
  { name: "Whey Protein", selected: false, href: "#" },
] as const;

const DEFAULT_CUSTOM_PRICE = [0, 100] as [number, number];

const Sidebar = () => {
  const [filter, useFilter] = useState<ProductState>({
    // default filters allow all the available options
    type: ["bcaa", "beta alanine", "creatine", "whey protein"],
    price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
    brand: ["MyProtein", "Optimum Nutrition", "Yamamoto Nutrition"],
    sort: "none",
  });

  return (
    <div className="w-1/5 pl-2 flex-none  min-h-full">
      <h1>This is the sidebar</h1>
      <Accordion type="multiple">
        {/* Type filter (bcaa, creatine, etc) */}
        <AccordionItem value="type">
          <AccordionTrigger className="py-3">
            <span className="font-medium text-white group-hover:text-[var(--primary)] text-lg">Type</span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-4">
              {TYPE_FILTERS.options.map((option, optionIdx) => (
                <li key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`type-${optionIdx}`}
                    className="peer h-4 w-4 rounded border-gray-300 text-indigo-200 focus:ring-indigo-900"
                  />
                  <label
                    htmlFor={`type-${optionIdx}`}
                    className="ml-3 text-base text-stone-400 peer-hover:text-white peer-checked:text-white"
                  >
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Sidebar;
