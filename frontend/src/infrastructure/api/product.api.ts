const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const productApi = {
  getByType: async (type: string) => {
    const res = await fetch(`${API_URL}/products/type/${type}`);
    if (!res.ok) throw new Error('Error fetching products');
    return res.json();
  },
  getBySolution: async (solution: string) => {
    const res = await fetch(`${API_URL}/products/solution/${solution}`);
    if (!res.ok) throw new Error('Error fetching products');
    return res.json();
  },
  getBySlug: async (slug: string) => {
    const res = await fetch(`${API_URL}/products/${slug}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  },
};