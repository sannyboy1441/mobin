"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UiSelect from "@/components/ui/UiSelect";
import { saveProfile } from "@/lib/properties";

const propertyTypes = [
  "Boarding house",
  "Dormitory",
  "Apartment",
  "Mixed properties",
];

const propertyCounts = ["1 to 2", "3 to 5", "More than 5"];

export default function SignupForm() {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState(propertyTypes[0]);
  const [propertyCount, setPropertyCount] = useState(propertyCounts[0]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        saveProfile({
          name: String(data.get("name") ?? ""),
          contact: String(data.get("contact") ?? ""),
        });
        router.push("/dashboard");
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium text-stone-600">Full name</span>
          <input
            name="name"
            required
            placeholder="Juan Dela Cruz"
            className="mt-1.5 w-full rounded-xl border border-sand-dark bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-bark"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-stone-600">Phone or email</span>
          <input
            name="contact"
            required
            placeholder="0912 345 6789"
            className="mt-1.5 w-full rounded-xl border border-sand-dark bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-bark"
          />
        </label>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <span className="text-xs font-medium text-stone-600">Property type</span>
          <div className="mt-1.5">
            <UiSelect
              label="Property type"
              value={propertyType}
              options={propertyTypes}
              onChange={setPropertyType}
            />
          </div>
          <input type="hidden" name="propertyType" value={propertyType} />
        </div>
        <div>
          <span className="text-xs font-medium text-stone-600">Properties to post</span>
          <div className="mt-1.5">
            <UiSelect
              label="Properties to post"
              value={propertyCount}
              options={propertyCounts}
              onChange={setPropertyCount}
            />
          </div>
          <input type="hidden" name="propertyCount" value={propertyCount} />
        </div>
      </div>
      <label className="mt-4 block">
        <span className="text-xs font-medium text-stone-600">Message</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Hi, I manage a boarding house with... I want to post..."
          className="mt-1.5 w-full resize-none rounded-xl border border-sand-dark bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-bark"
        />
      </label>
      <button
        type="submit"
        className="mt-5 w-full rounded-full bg-bark py-3 text-sm font-medium text-white transition-colors hover:bg-bark-dark"
      >
        Create Free Account
      </button>
    </form>
  );
}
