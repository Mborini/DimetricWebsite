"use client";

import { useForm } from "@mantine/form";

interface Props {
  initialValues?: any;
  onSubmit: (values: any) => void;
  loading: boolean;
}

export default function VisionForm({
  initialValues,
  onSubmit,
  loading,
}: Props) {
  const form = useForm({
    initialValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
    },

  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
          Title
        </label>
        <input
          type="text"
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          {...form.getInputProps("title")}
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
          Description
        </label>
        <textarea
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          rows={20}
          {...form.getInputProps("description")}
        />
      </div>

      {/* Submit */}
      <div className="text-right">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
