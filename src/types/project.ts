type Author = {
  name: string;
  image: string;
  designation: string;
};

export type project = {
  project_id: number;
  project_name: string;
  paragraph: string;
  image_path: string;
  author: Author;
  tags: string[];
  publishDate: string;
  date: string;
};
