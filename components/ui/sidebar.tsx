"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { Slider } from "./slider";
import { cn } from "@/lib/utils";
import { useFilters } from "@/components/FiltersContext"; // ✅ Use filters from global context
import {
  SORT_FILTERS,
  TYPE_FILTERS,
  BRAND_FILTERS,
  PRICE_FILTERS,
  DEFAULT_CUSTOM_PRICE,
} from "@/components/FiltersContext"; // ✅ Import filter constants
import { useState } from "react";

const Sidebar = () => {
  const { filter, setFilter, debouncedRefetch } = useFilters(); // Get state & updater from context
  const [openSections, setOpenSections] = useState<string[]>(["type", "brand", "price"]); // ACCORDION TOGGLE. Add "sort" to open it

  // console.log(filter);

  // array filter (no price) handler
  const applyArrayFilters = ({ category, value }: { category: "type" | "brand"; value: string }) => {
    setFilter((prev) => ({
      ...prev,
      [category]: prev[category].includes(value as never)
        ? // if value was previously in array, we acces it with prev[category] and remove it by keeping all the values different from the selected one
          prev[category].filter((v) => v !== value)
        : // if value wasn't in array, we append it at the end of it
          [...prev[category], value],
    }));

    debouncedRefetch();
  };

  const minPrice = Math.min(filter.price.range[0], filter.price.range[1]);
  const maxPrice = Math.max(filter.price.range[0], filter.price.range[1]);

  return (
    <div className="w-1/5 px-3 border-r-2 border-pink-800/50 flex-none min-h-full">
      <Accordion
        type="multiple"
        value={openSections}
        onValueChange={(newValues) => setOpenSections(newValues)} // Allows toggle to be open
      >
        {/* SORT filters */}
        <AccordionItem value="sort">
          <AccordionTrigger className="pb-3" defaultValue="item">
            <span className="font-medium text-[var(--accent-foreground)] group-hover:text-[var(--primary)] lg:text-lg md:text-base sm:text-sm text-xs">
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

                      debouncedRefetch();
                    }}
                    checked={filter.sort.includes(option.value)}
                    className="peer"
                  />
                  <label
                    htmlFor={`sort-${optionIdx}`}
                    className="ml-3 lg:text-base md:text-sm sm:text-xs text-xs text-stone-400 peer-hover:text-[var(--accent-foreground)] peer-checked:text-[var(--accent-foreground)]"
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
            <span className="font-medium text-[var(--accent-foreground)] group-hover:text-[var(--primary)] lg:text-lg md:text-base sm:text-sm text-xs">
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
                    className="ml-3 lg:text-base md:text-sm sm:text-xs text-xs text-stone-400 peer-hover:text-[var(--accent-foreground)] peer-checked:text-[var(--accent-foreground)]"
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
            <span className="font-medium text-[var(--accent-foreground)] group-hover:text-[var(--primary)] text-lg">
              Brand
            </span>
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
                    className="ml-3 lg:text-base md:text-sm sm:text-xs text-xs text-stone-400 peer-hover:text-[var(--accent-foreground)] peer-checked:text-[var(--accent-foreground)]"
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
            <span className="font-medium text-[var(--accent-foreground)] group-hover:text-[var(--primary)] text-lg">
              Price
            </span>
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

                      debouncedRefetch();
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
                    className="ml-3 lg:text-base md:text-sm sm:text-xs text-xs text-stone-400 peer-hover:text-[var(--accent-foreground)] peer-checked:text-[var(--accent-foreground)]"
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
                          range: [0, 100],
                        },
                      }));

                      debouncedRefetch();
                    }}
                    checked={filter.price.isCustom}
                    className="peer"
                  />
                  <label
                    htmlFor={`price-${PRICE_FILTERS.options.length}`}
                    className="ml-3 lg:text-base md:text-sm sm:text-xs text-xs text-stone-400 peer-hover:text-[var(--accent-foreground)] peer-checked:text-[var(--accent-foreground)]"
                  >
                    Custom
                  </label>
                </div>
                <div className="flex justify-between pb-2 text-[var(--accent-foreground)] font-medium lg:text-base md:text-sm sm:text-xs text-xs">
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
                  className={cn({ "opacity-50": !filter.price.isCustom })}
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

                    debouncedRefetch();
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
