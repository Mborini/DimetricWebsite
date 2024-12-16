type Author = {
  name: string;
  image: string;
  designation: string;
};

export type project = {
  project_id: number;
  project_name: string;
  paragraph: string;
  image: string;
  author: Author;
  tags: string[];
  publishDate: string;
};
