"use client";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { ProductState } from "@/lib/validators/product-validator";
import { Item } from "@radix-ui/react-accordion";

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
  ] as const,
};

const BRAND_FILTERS = {
  id: "brand",
  name: "Brand",
  options: [
    { value: "MyProtein", label: "MyProtein" },
    { value: "Optimum Nutrition", label: "Optimum Nutrition" },
    { value: "Yamamoto Nutrition", label: "Yamamoto Nutrition" },
  ],
} as const;

// to display which category of products is being displayed, not implemented
const SUPPLEMENT_TYPES = [
  { name: "BCAA", selected: true, href: "#" },
  { name: "Beta Alanine", selected: false, href: "#" },
  { name: "Creatine", selected: false, href: "#" },
  { name: "Whey Protein", selected: false, href: "#" },
] as const;

const DEFAULT_CUSTOM_PRICE = [0, 100] as [number, number];

const Sidebar = () => {
  const [openSections, setOpenSections] = useState<string[]>(["type", "brand"]); // ACCORDION TOGGLE

  const [filter, setFilter] = useState<ProductState>({
    // default filters allow all the available options
    type: ["bcaa", "beta alanine", "creatine", "whey protein"],
    price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
    brand: ["MyProtein", "Optimum Nutrition", "Yamamoto Nutrition"],
    sort: "none",
  });

  console.log(filter);

  // array filter (no price) handler
  const applyArrayFilters = ({
    category,
    value,
  }: {
    category: keyof Omit<typeof filter, "price" | "sort">;
    value: string; // values inside arrays (eg: bcaa, beta alanine,... || MyProtein, Optimum Nutrition,...)
  }) => {
    const isFilterApplied = filter[category].includes(value as never);

    // checks for value in array and creates a copy with updates value
    // Javascript Garbage Collector removes unreferenced arrays from memory, therefore each iteration creates a new array and deletes the old one
    if (isFilterApplied) {
      setFilter((prev) => ({
        ...prev,
        // if value was previously in array, we acces it with prev[category] and remove it by keeping all the values different from the selected one
        [category]: prev[category].filter((v) => v !== value),
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        // if value wasn't in array, we append it at the end of it
        [category]: [...prev[category], value],
      }));
    }
  };

  return (
    <div className="w-1/5 pl-2 pr-2 border-r-2 border-pink-800/50 flex-none min-h-full">
      <Accordion
        type="multiple"
        value={openSections}
        onValueChange={(newValues) => setOpenSections(newValues)} // Allows toggle
      >
        {/* Supplement (type) filters (bcaa, creatine, etc) */}
        <AccordionItem value="type">
          <AccordionTrigger className="pb-3" defaultValue="item">
            <span className="font-medium text-white group-hover:text-[var(--primary)] lg:text-lg md:text-base sm:text-sm text-xs">
              Supplement
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-4">
              {TYPE_FILTERS.options.map((option, optionIdx) => (
                <li key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`type-${optionIdx}`}
                    onChange={() => {
                      applyArrayFilters({
                        category: "type",
                        value: option.value,
                      });
                    }}
                    checked={filter.type.includes(option.value)}
                    className="peer h-4 w-4 rounded-sm hover:[accent-color]"
                  />
                  <label
                    htmlFor={`type-${optionIdx}`}
                    className="ml-3 lg:text-base md:text-sm sm:text-xs text-xs text-stone-400 peer-hover:text-white peer-checked:text-white"
                  >
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Brand filters */}
        <AccordionItem value="brand">
          <AccordionTrigger className="py-3" defaultValue="item">
            <span className="font-medium text-white group-hover:text-[var(--primary)] text-lg">Brand</span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-4">
              {BRAND_FILTERS.options.map((option, optionIdx) => (
                <li key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`brand-${optionIdx}`}
                    onChange={() => {
                      applyArrayFilters({
                        category: "brand",
                        value: option.value,
                      });
                    }}
                    checked={filter.brand.includes(option.value)}
                    className="peer h-4 w-4 rounded border-gray-300 text-indigo-200 focus:ring-indigo-900"
                  />
                  <label
                    htmlFor={`brand-${optionIdx}`}
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
