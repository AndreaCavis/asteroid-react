"use client";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { ProductState } from "@/lib/validators/product-validator";
import { Slider } from "./slider";
import { cn } from "@/lib/utils";

export const SORT_OPTIONS = [
  { name: "None", value: "none" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
] as const; // as const creates read-only const

const SORT_FILTERS = {
  id: "sort",
  name: "sort",
  options: [
    { value: "none", label: "None" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ],
} as const;

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

const PRICE_FILTERS = {
  id: "price",
  name: "Price",
  options: [
    { value: [0, 150], label: "Any price" },
    { value: [0, 25], label: "Under £25" },
    { value: [0, 50], label: "Under £50" },
    { value: [0, 100], label: "Under £100" },
    // Custom option defined in TSX
  ],
} as const;

// to display which category of products is being displayed, not implemented
const SUPPLEMENT_TYPES = [
  { name: "BCAA", selected: true, href: "#" },
  { name: "Beta Alanine", selected: false, href: "#" },
  { name: "Creatine", selected: false, href: "#" },
  { name: "Whey Protein", selected: false, href: "#" },
] as const;

const DEFAULT_CUSTOM_PRICE = [0, 150] as [number, number];

// ------------------------------------------- END FILTERS DECLARATION -----------------------------------------------------------------------------------

// ------------------------------------------- BEGIN SIDEBAR IMPLMENTATION -----------------------------------------------------------------------------------
const Sidebar = () => {
  const [openSections, setOpenSections] = useState<string[]>(["type", "brand", "price"]); // ACCORDION TOGGLE. Add "sort" to open it

  const [filter, setFilter] = useState<ProductState>({
    // default filters allow all the available options
    sort: "none",
    type: ["bcaa", "beta alanine", "creatine", "whey protein"],
    price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
    brand: ["MyProtein", "Optimum Nutrition", "Yamamoto Nutrition"],
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

  const minPrice = Math.min(filter.price.range[0], filter.price.range[1]);
  const maxPrice = Math.max(filter.price.range[0], filter.price.range[1]);

  return (
    <div className="w-1/5 px-3 border-r-2 border-pink-800/50 flex-none min-h-full">
      <Accordion
        type="multiple"
        value={openSections}
        onValueChange={(newValues) => setOpenSections(newValues)} // Allows toggle
      >
        {/* SORT filters */}
        <AccordionItem value="sort">
          <AccordionTrigger className="pb-3" defaultValue="item">
            <span className="font-medium text-white group-hover:text-[var(--primary)] lg:text-lg md:text-base sm:text-sm text-xs">
              Sort
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-4">
              {SORT_FILTERS.options.map((option, optionIdx) => (
                <li key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`sort-${optionIdx}`}
                    onChange={() => {
                      setFilter((prev) => ({
                        ...prev,
                        sort: option.value,
                      }));
                    }}
                    checked={filter.sort.includes(option.value)}
                    className="peer"
                  />
                  <label
                    htmlFor={`sort-${optionIdx}`}
                    className="ml-3 lg:text-base md:text-sm sm:text-xs text-xs text-stone-400 peer-hover:text-white peer-checked:text-white"
                  >
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* SUPPLEMENT (type) filters (bcaa, creatine, etc) */}
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
                    className="peer"
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

        {/* BRAND filters */}
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
                    className="peer"
                  />
                  <label
                    htmlFor={`brand-${optionIdx}`}
                    className="ml-3 lg:text-base md:text-sm sm:text-xs text-xs text-stone-400 peer-hover:text-white peer-checked:text-white"
                  >
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* PRICE filters */}
        <AccordionItem value="price">
          <AccordionTrigger className="py-3" defaultValue="item">
            <span className="font-medium text-white group-hover:text-[var(--primary)] text-lg">Price</span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-4">
              {PRICE_FILTERS.options.map((option, optionIdx) => (
                <li key={option.label} className="flex items-center">
                  <input
                    type="radio"
                    id={`price-${optionIdx}`}
                    onChange={() => {
                      setFilter((prev) => ({
                        ...prev,
                        price: {
                          isCustom: false,
                          range: [...option.value],
                        },
                      }));
                    }}
                    checked={
                      !filter.price.isCustom &&
                      filter.price.range[0] === option.value[0] &&
                      filter.price.range[1] === option.value[1]
                    }
                    className="peer"
                  />
                  <label
                    htmlFor={`price-${optionIdx}`}
                    className="ml-3 lg:text-base md:text-sm sm:text-xs text-xs text-stone-400 peer-hover:text-white peer-checked:text-white"
                  >
                    {option.label}
                  </label>
                </li>
              ))}
              <li className="flex justify-center flex-col gap-2">
                <div>
                  <input
                    type="radio"
                    id={`price-${PRICE_FILTERS.options.length}`}
                    onChange={() => {
                      setFilter((prev) => ({
                        ...prev,
                        price: {
                          isCustom: true,
                          range: [0, 150],
                        },
                      }));
                    }}
                    checked={filter.price.isCustom}
                    className="peer"
                  />
                  <label
                    htmlFor={`price-${PRICE_FILTERS.options.length}`}
                    className="ml-3 lg:text-base md:text-sm sm:text-xs text-xs text-stone-400 peer-hover:text-white peer-checked:text-white"
                  >
                    Custom
                  </label>
                </div>
                <div className="flex justify-between pb-2 text-white font-medium lg:text-base md:text-sm sm:text-xs text-xs">
                  <p>Price</p>
                  <div>
                    £
                    <span className="text-[var(--primary)]">
                      {filter.price.isCustom ? minPrice.toFixed(0) : filter.price.range[0].toFixed(0)}
                    </span>{" "}
                    - £
                    <span className="text-[var(--primary)]">
                      {filter.price.isCustom ? maxPrice.toFixed(0) : filter.price.range[1].toFixed(0)}
                    </span>
                  </div>
                </div>
                <Slider
                  className={cn({
                    "opacity-50": !filter.price.isCustom,
                  })}
                  disabled={!filter.price.isCustom}
                  onValueChange={(range) => {
                    const [newMin, newMax] = range;

                    setFilter((prev) => ({
                      ...prev,
                      price: {
                        isCustom: true,
                        range: [newMin, newMax],
                      },
                    }));
                  }}
                  value={filter.price.isCustom ? filter.price.range : DEFAULT_CUSTOM_PRICE}
                  min={DEFAULT_CUSTOM_PRICE[0]}
                  defaultValue={DEFAULT_CUSTOM_PRICE}
                  max={DEFAULT_CUSTOM_PRICE[1]}
                  step={5}
                />
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Sidebar;
