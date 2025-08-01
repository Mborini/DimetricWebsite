"use client";

import { useForm } from "@mantine/form";


interface Props {
  initialValues?: any;
  onSubmit: (values: any) => void;
  loading: boolean;
}

export default function ProjectForm({ initialValues, onSubmit, loading }: Props) {
  const form = useForm({
    initialValues: initialValues
      ? {
          ...initialValues,
          start_date: initialValues.start_date?.slice(0, 10) || "",
          end_date: initialValues.end_date?.slice(0, 10) || "",
        }
      : {
          title: "",
          client: "",
          description: "",
          location: "",
          start_date: "",
          end_date: "",
          value_usd: 0,
          partner: "",
          imagename: "",
          is_latest: false,
        },
  });
  return (
    <form onSubmit={form.onSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Title
        </label>
        <input
          type="text"
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          {...form.getInputProps("title")}
        />
      </div>

      {/* Client */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Client
        </label>
        <input
          type="text"
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          {...form.getInputProps("client")}
        />
      </div>

      {/* Description (Rich Text Editor) */}
      {/* Description (Textarea) */}
<div>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
    Description
  </label>
  <textarea
    rows={6}
    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
    {...form.getInputProps("description")}
  />
</div>


      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Location
        </label>
        <input
          type="text"
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          {...form.getInputProps("location")}
        />
      </div>

      {/* Start Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Start Date
        </label>
        <input
          type="date"
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          {...form.getInputProps("start_date")}
        />
      </div>

      {/* End Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          End Date
        </label>
        <input
          type="date"
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          {...form.getInputProps("end_date")}
        />
      </div>

      {/* Value in USD */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Value (USD)
        </label>
        <input
          type="number"
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          {...form.getInputProps("value_usd")}
        />
      </div>

      {/* Partner */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Partner
        </label>
        <input
          type="text"
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          {...form.getInputProps("partner")}
        />
      </div>

      {/* Image Path */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Image path
        </label>
        <input
          type="text"
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          {...form.getInputProps("imagename")}
        />
      </div>

      {/* Is Latest? */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
          {...form.getInputProps("is_latest", { type: "checkbox" })}
        />
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Is latest?
        </label>
      </div>

      {/* Submit */}
      <div className="text-right">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
