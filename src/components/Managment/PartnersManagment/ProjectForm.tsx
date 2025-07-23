"use client";

import { useForm } from "@mantine/form";

interface Props {
  initialValues?: {
    name?: string;
    image_url?: string;
  };
  onSubmit: (values: { name: string; image_url: string }) => void;
  loading: boolean;
}

export default function PartnerForm({ initialValues, onSubmit, loading }: Props) {
  const form = useForm({
    initialValues: initialValues || {
      name: "",
      image_url: "",
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className="space-y-4">
      {/* Partner Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Partner Name
        </label>
        <input
          type="text"
          required
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          {...form.getInputProps("name")}
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Image URL
        </label>
        <input
          type="url"
          required
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          {...form.getInputProps("image_url")}
        />
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
