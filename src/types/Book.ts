export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  isBorrowed?: boolean;
}