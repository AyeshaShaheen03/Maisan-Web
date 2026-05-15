"use client";
import { useState, useEffect } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const publishingOptions = [
  {
    title: "English",
    locale: "en",
  },
  {
    title: "عربي",
    locale: "ar",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function LocaleSelection() {
  const currentLocale = useLocale();
  const [selected] = useState(
    publishingOptions.find((option) => option.locale === currentLocale) ||
      publishingOptions[0],
  );
  const router = useRouter();

  const handleLocaleChange = async (option: {
    title: string;
    locale: string;
  }) => {
    try {
      await fetch(`/api/set-locale?locale=${option.locale}`, {
        method: "GET",
        credentials: "include",
      });

      window.location.reload();
    } catch (error) {
      console.error("Failed to set locale:", error);
    }
  };

  return (
    <Listbox value={selected} onChange={handleLocaleChange}>
      {({ open }) => (
        <>
          <Label className="sr-only">Change Language</Label>
          <div className="relative">
            <div className="inline-flex rounded-md shadow-sm">
              <div className="inline-flex items-center gap-x-1.5 rounded-l-md px-3 py-2 text-white shadow-sm">
                {/* <CheckIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" /> */}
                <p className="text-sm font-semibold">{selected.title}</p>
              </div>
              <ListboxButton className="inline-flex items-center rounded-l-md rounded-r-md p-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-50">
                <span className="sr-only">Change Language</span>
                <ChevronDownIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </ListboxButton>
            </div>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute right-0 z-10 mt-2 w-24 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {publishingOptions.map((option) => (
                  <ListboxOption
                    key={option.title}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-green-600 text-white" : "",
                        !active ? "text-gray-900" : "",
                        "cursor-default select-none p-4 text-sm",
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? "font-semibold" : "font-normal"
                            }
                          >
                            {option.title}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? "text-white" : "text-green-600"
                              }
                            >
                              {/* <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              /> */}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
