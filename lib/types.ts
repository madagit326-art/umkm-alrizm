export interface Product {
  id?: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  highlight?: string;
}

export interface Review {
  id?: number;
  product_id: number;
  customer_name: string;
  rating: number;
  comment: string;
  created_at?: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingCounts: { [stars: number]: number };
}
