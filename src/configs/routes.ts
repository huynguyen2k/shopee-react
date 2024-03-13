// Note: ROUTES object is used for router config
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PRODUCT_LIST: '/product-list',
  PRODUCT_DETAIL: '/product-list/:id',
  NOT_FOUND: '*',
} as const

// Note: URLS object is used for router link
export const URLS = {
  HOME: () => '/' as const,
  LOGIN: () => '/login' as const,
  REGISTER: () => '/register' as const,
  PRODUCT_LIST: () => '/product-list' as const,
  PRODUCT_DETAIL: (productId: number) => `/product-list/${productId}` as const,
} as const
