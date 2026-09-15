export type Category =
  | 'Breads'
  | 'Cakes'
  | 'Pastries'
  | 'Burgers'
  | 'Pizza'
  | 'Snacks'
  | 'Beverages'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: Category
  image: string
  badge?: 'Bestseller' | 'New' | 'Veg' | 'Spicy'
  rating: number
}

export interface CartLine {
  item: MenuItem
  qty: number
}
