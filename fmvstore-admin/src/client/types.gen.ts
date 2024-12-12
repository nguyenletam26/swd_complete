// This file is auto-generated by @hey-api/openapi-ts

export type RegisterDto = {
  name: string
  email: string
  password: string
  phoneNumber: string
}

export type LoginDto = {
  /**
   * User's email
   */
  email: string
  /**
   * User's password
   */
  password: string
}

export type UserEntity = {
  id: number
  email: string
  password: string
  phoneNumber: string
  name: string
  avatar: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  dob: string
  role: 'ADMIN' | 'SUB_ADMIN' | 'USER'
}

export type LoginEntity = {
  /**
   * User Profile
   */
  user: UserEntity
  /**
   * Access Token
   */
  accessToken: string
  /**
   * Refresh Token
   */
  refreshToken: string
}

export type RefreshTokenDto = {
  /**
   * Refresh Token
   */
  token: string
}

export type LogoutDto = {
  /**
   * User's refreshToken
   */
  refreshToken: string
  /**
   * is remove all session?
   */
  isRevokedAllSession?: boolean
}

export type UpdatePasswordDto = {
  oldPassword: string
  newPassword: string
}

export type UpdateUserDto = {
  /**
   * User's dob
   */
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  /**
   * User's name
   */
  name: string
  /**
   * User's phone number
   */
  avatar: string
  /**
   * User's dob
   */
  dob: string
  /**
   * User's phone number
   */
  phoneNumber: string
}

export type StaffIndexEntity = {
  id: number
  email: string
  phoneNumber: string
  name: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  dob: string
  createdAt: string
}

export type StaffListEntity = {
  total: number
  items: Array<StaffIndexEntity>
}

export type CreateStaffDto = {
  email: string
  name: string
  password: string
  phoneNumber: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  dob: string
}

export type UpdateStaffDto = {
  email: string
  name: string
  phoneNumber: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  dob: string
}

export type AddressIndexEntity = {
  id: number
  name: string
  phone: string
  isDefault: boolean
  address: string
  detailAddress: string
  addressType: 'HOME' | 'OFFICE'
}

export type AddressListEntity = {
  total: number
  items: Array<AddressIndexEntity>
}

export type AddressDetailEntity = {
  id: number
  name: string
  phone: string
  isDefault: boolean
  address: string
  detailAddress: string
  addressType: 'HOME' | 'OFFICE'
}

export type UpdateAddressDto = {
  name: string
  phone: string
  address: string
  detailAddress: string
  isDefault: boolean
  addressType: {
    [key: string]: unknown
  }
}

export type CategoryIndexEntity = {
  id: number
  name: string
  parentId: number
  children?: Array<CategoryIndexEntity>
}

export type CategoryListEntity = {
  total: number
  items: Array<CategoryIndexEntity>
}

export type SubCategoryIndexEntity = {
  id: number
  name: string
  category?: string
}

export type SubCategoryListEntity = {
  total: number
  items: Array<SubCategoryIndexEntity>
}

export type CreateCategoryDto = {
  name: string
  parentId?: number
}

export type ProductItemsConfiguration = {
  productItemId: number
  size: string
  color: string
  image: string
}

export type ProductVariation = {
  id: number
  value: string
  image?: string
}

export type ProductIndexEntity = {
  id: number
  name: string
  overview: string
  slug: string
  discount: number
  discountType: 'PERCENTAGE' | 'AMOUNT'
  createdAt: string
  price: number
  productImages: string
  productItemsConfiguration: Array<ProductItemsConfiguration>
  sizes?: Array<ProductVariation>
  colors?: Array<ProductVariation>
}

export type ProductListEntity = {
  total: number
  items: Array<ProductIndexEntity>
}

export type ProductImage = {
  image: string
  isDefault: boolean
}

export type ProductImageEntity = {
  productItemId: number
  data: Array<ProductImage>
}

export type ProductDetailEntity = {
  id: number
  name: string
  overview: string
  description: string
  detail: string
  discount: number
  createdAt: string
  price: number
  productImages: Array<ProductImageEntity>
  productItemsConfiguration: Array<ProductItemsConfiguration>
  sizes?: Array<ProductVariation>
  colors?: Array<ProductVariation>
  rating: string
  numberOfReviews: number
}

export type ProductConfigurationImagesDto = {
  image: string
  isDefault: boolean
}

export type ProductConfigurationDto = {
  colorId: number
  sizeId: number
  quantity: number
  price: number
  isDefault: boolean
  images: Array<ProductConfigurationImagesDto>
}

export type createProductAdminDto = {
  name: string
  category: string
  overview: string
  description: string
  detail: string
  discount?: number
  discountType?: 'PERCENTAGE' | 'AMOUNT'
  productConfigurationData: Array<ProductConfigurationDto>
}

export type ProductItemImageAdminEntity = {
  image: string
  isDefault: boolean
}

export type ProductItemIndexAdminEntity = {
  id: number
  quantity: number
  price: number
  isDefault: boolean
  isAvailable: boolean
  createdAt: string
  updatedAt: string
  name: string
  discount: number
  category: string
  images: Array<ProductItemImageAdminEntity>
  color: string
  size: string
}

export type ProductIndexAdminEntity = {
  id: number
  name: string
  discount: number
  discountType: 'PERCENTAGE' | 'AMOUNT'
  category: string
  defaultImage: string
  items: Array<ProductItemIndexAdminEntity>
}

export type ProductListAdminEntity = {
  total: number
  items: Array<ProductIndexAdminEntity>
}

export type ProductConfigurationAdminEntity = {
  productItemId: number
  price: number
  quantity: number
  images: Array<ProductImage>
  isDefault: boolean
  isAvailable: boolean
  color: {
    id?: number
    value?: string
    image?: string
  }
  size: {
    id?: number
    image?: string
    value?: string
  }
}

export type ProductDetailAdminEntity = {
  id: number
  name: string
  overview: string
  description: string
  detail: string
  discount: number
  discountType: 'PERCENTAGE' | 'AMOUNT'
  createdAt: string
  category: CategoryIndexEntity
  subCategory: CategoryIndexEntity
  items: Array<ProductConfigurationAdminEntity>
}

export type UpdateProductConfigurationImagesDto = {
  image: string
  isDefault: boolean
}

export type UpdateProductConfigurationDto = {
  productItemId: number
  colorId: number
  sizeId: number
  quantity: number
  price: number
  isDefault: boolean
  isAvailable?: boolean
  images: Array<UpdateProductConfigurationImagesDto>
}

export type updateProductAdminDto = {
  name: string
  overview: string
  description: string
  detail: string
  discount: number
  discountType: 'PERCENTAGE' | 'AMOUNT'
  category: string
  productConfigurationData: Array<UpdateProductConfigurationDto>
}

export type SearchImageProductDto = {
  file: string
}

export type UploadDto = {
  key: string
}

export type CreateOrderDto = {
  /**
   * User's email
   */
  paymentMethod: 'CASH' | 'CARD' | 'STRIPE'
  /**
   * User's email
   */
  shippingAddressId: number
}

export type OrderLineIndexEntity = {
  id: number
  quantity: number
  price: number
  productItemId: number
  createdAt: string
  updatedAt: string
  name: string
  image: string
  size: string
  color: string
}

export type OrderIndexEntity = {
  id: number
  orderCode: string
  orderDate: string
  orderTotal: number
  orderStatus: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  paymentMethod: 'CASH' | 'CARD' | 'STRIPE'
  createdAt: string
  updatedAt: string
  user: string
  orderLines: Array<OrderLineIndexEntity>
  shippingAddress: AddressIndexEntity
}

export type OrderListEntity = {
  total: number
  items: Array<OrderIndexEntity>
}

export type UpdateStatusDto = {
  orderStatus?: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
}

export type VariationOptionIndexEntity = {
  id: number
  value: string
  image: string
  variation?: string
  createdAt?: string
}

export type VariationIndexEntity = {
  id: number
  name: string
  options: Array<VariationOptionIndexEntity>
}

export type VariationListEntity = {
  total: number
  items: Array<VariationIndexEntity>
}

export type VariationOptionListEntity = {
  total: number
  items: Array<VariationOptionIndexEntity>
}

export type VariationOptionIndexAdminEntity = {
  id: number
  value: string
  image: string
  createdAt: string
}

export type VariationOptionListAdminEntity = {
  total: number
  items: Array<VariationOptionIndexAdminEntity>
}

export type CreateVariationDto = {
  name: string
  image?: string
}

export type UpdateVariationDto = {
  name: string
  image?: string
}

export type CartItemIndexEntity = {
  id: number
  quantity: number
  slug: string
  image: string
  name: string
  price: number
  size: string
  color: string
  isAvailable: boolean
}

export type CartItemListEntity = {
  total: number
  items: Array<CartItemIndexEntity>
}

export type AddItemToCartDto = {
  /**
   * product item id
   */
  productItemId: number
  /**
   * quantity
   */
  quantity: number
}

export type UpdateItemToCartDto = {
  /**
   * product item id
   */
  cartItemId: number
  /**
   * quantity
   */
  quantity: number
}

export type ApplyPromotionDto = {
  /**
   * promotion name
   */
  code: string
}

export type PromotionIndexEntity = {
  id: number
  name: string
  code: string
  description: string
  discount: number
  discountType: 'PERCENTAGE' | 'AMOUNT'
  startDate: string
  endDate: string
}

export type CreatePromotionDto = {
  /**
   * promotion name
   */
  name: string
  code: string
  description: string
  discount: number
  discountType: 'PERCENTAGE' | 'AMOUNT'
  startDate: string
  endDate: string
}

export type PromotionListEntity = {
  total: number
  items: Array<PromotionIndexEntity>
}

export type GeneralAnalyticEntity = {
  today: number
  yesterday: number
  month: number
  lastMonth: number
  total: number
}

export type DetailAnalyticEntity = {
  orderCount?: Array<{
    [key: string]: unknown
  }>
  orderStatistic?: Array<{
    [key: string]: unknown
  }>
  productStatistic?: Array<{
    [key: string]: unknown
  }>
  productTotal?: number
}

export type CreateReviewDto = {
  rating: number
  comment: string
}

export type ReviewIndexEntity = {
  id: number
  rating: number
  comment: string
  createdAt: string
  userId: number
  username: string
  avatar: string
}

export type ReviewListEntity = {
  total: number
  items: Array<ReviewIndexEntity>
  avarageRating: number
}

export type $OpenApiTs = {
  '/v1/hello': {
    get: {
      res: {
        200: string
      }
    }
  }
  '/v1/auth/register': {
    post: {
      req: {
        requestBody: RegisterDto
      }
      res: {
        201: unknown
      }
    }
  }
  '/v1/auth/login': {
    post: {
      req: {
        requestBody: LoginDto
      }
      res: {
        201: LoginEntity
      }
    }
  }
  '/v1/auth/refresh-token': {
    post: {
      req: {
        requestBody: RefreshTokenDto
      }
      res: {
        201: LoginEntity
      }
    }
  }
  '/v1/auth/logout': {
    post: {
      req: {
        requestBody: LogoutDto
      }
      res: {
        201: unknown
      }
    }
  }
  '/v1/auth/me': {
    get: {
      res: {
        200: UserEntity
      }
    }
  }
  '/v1/auth/change-password': {
    post: {
      req: {
        requestBody: UpdatePasswordDto
      }
      res: {
        201: unknown
      }
    }
  }
  '/v1/users/users': {
    post: {
      req: {
        requestBody: UpdateUserDto
      }
      res: {
        201: unknown
      }
    }
  }
  '/v1/users/users/staff': {
    get: {
      req: {
        keyword: string
      }
      res: {
        200: StaffListEntity
      }
    }
    post: {
      req: {
        requestBody: CreateStaffDto
      }
      res: {
        201: StaffIndexEntity
      }
    }
  }
  '/v1/users/users/staff/{id}': {
    get: {
      req: {
        id: number
      }
      res: {
        200: StaffIndexEntity
      }
    }
    patch: {
      req: {
        id: number
        requestBody: UpdateStaffDto
      }
      res: {
        200: StaffIndexEntity
      }
    }
    delete: {
      req: {
        id: number
      }
      res: {
        200: unknown
      }
    }
  }
  '/v1/users/users/profile': {
    get: {
      res: {
        200: StaffIndexEntity
      }
    }
  }
  '/v1/addresses': {
    get: {
      res: {
        200: AddressListEntity
      }
    }
  }
  '/v1/addresses/default': {
    get: {
      res: {
        200: AddressDetailEntity
      }
    }
  }
  '/v1/addresses/{addressId}': {
    get: {
      req: {
        addressId: number
      }
      res: {
        200: AddressDetailEntity
      }
    }
    patch: {
      req: {
        addressId: number
        requestBody: UpdateAddressDto
      }
      res: {
        200: AddressDetailEntity
      }
    }
  }
  '/v1/categories': {
    get: {
      req: {
        category: string
      }
      res: {
        200: CategoryListEntity
      }
    }
    post: {
      req: {
        requestBody: CreateCategoryDto
      }
      res: {
        201: CategoryIndexEntity
      }
    }
  }
  '/v1/categories/sub-categories': {
    get: {
      req: {
        category?: string
        /**
         * search keyword
         */
        keyword?: string
        name?: string
        orderBys?: Array<string>
        /**
         * Current page number
         */
        page?: number
        /**
         * Items number per page
         */
        pageSize?: number
        parentId?: number
      }
      res: {
        200: SubCategoryListEntity
      }
    }
  }
  '/v1/categories/sub-categories/{category}': {
    get: {
      req: {
        category: string
      }
      res: {
        200: SubCategoryListEntity
      }
    }
  }
  '/v1/categories/{category}': {
    patch: {
      req: {
        category: string
        requestBody: CreateCategoryDto
      }
      res: {
        200: CategoryIndexEntity
      }
    }
    delete: {
      req: {
        category: string
      }
      res: {
        200: CategoryIndexEntity
      }
    }
  }
  '/v1/products': {
    get: {
      req: {
        /**
         * Type of product
         */
        category?: string
        /**
         * Variant of product
         */
        color?: Array<string>
        /**
         * Price of product
         */
        fromPrice?: number
        /**
         * Price of product
         */
        isOnsale?: string
        /**
         * search keyword
         */
        keyword?: string
        /**
         * Price of product
         */
        order?: 'low-hight' | 'hight-low'
        orderBys?: Array<string>
        /**
         * Current page number
         */
        page?: number
        /**
         * Items number per page
         */
        pageSize?: number
        /**
         * Price of product
         */
        productItemIds?: Array<number>
        /**
         * Variant of product
         */
        size?: Array<string>
        /**
         * Type of product
         */
        subCategory?: Array<string>
        /**
         * Price of product
         */
        toPrice?: number
      }
      res: {
        200: ProductListEntity
      }
    }
  }
  '/v1/products/new-arrival': {
    get: {
      res: {
        200: ProductListEntity
      }
    }
  }
  '/v1/products/{slug}': {
    get: {
      req: {
        slug: string
      }
      res: {
        200: ProductDetailEntity
      }
    }
  }
  '/v1/admin/products': {
    post: {
      req: {
        requestBody: createProductAdminDto
      }
      res: {
        201: unknown
      }
    }
    get: {
      req: {
        /**
         * Type of product
         */
        category?: string
        /**
         * search keyword
         */
        keyword?: string
        /**
         * Name of product
         */
        name?: string
        orderBys?: Array<string>
        /**
         * Current page number
         */
        page?: number
        /**
         * Items number per page
         */
        pageSize?: number
        /**
         * Type of product
         */
        subCategory?: string
      }
      res: {
        200: ProductListAdminEntity
      }
    }
  }
  '/v1/admin/products/{id}': {
    get: {
      req: {
        id: number
      }
      res: {
        200: ProductDetailAdminEntity
      }
    }
    patch: {
      req: {
        id: number
        requestBody: updateProductAdminDto
      }
      res: {
        200: unknown
      }
    }
    post: {
      req: {
        id: number
      }
      res: {
        201: boolean
      }
    }
  }
  '/v1/admin/products/search': {
    post: {
      req: {
        requestBody: SearchImageProductDto
      }
      res: {
        201: Array<number>
      }
    }
  }
  '/v1/storage/presigned-url': {
    post: {
      req: {
        requestBody: UploadDto
      }
      res: {
        201: string
      }
    }
    get: {
      req: {
        requestBody: UploadDto
      }
      res: {
        200: string
      }
    }
  }
  '/v1/storage/delete': {
    post: {
      req: {
        requestBody: UploadDto
      }
      res: {
        201: unknown
      }
    }
  }
  '/v1/orders': {
    post: {
      req: {
        requestBody: CreateOrderDto
      }
      res: {
        201: boolean
      }
    }
    get: {
      res: {
        200: OrderListEntity
      }
    }
  }
  '/v1/orders/admin': {
    get: {
      req: {
        from?: string
        /**
         * search keyword
         */
        keyword?: string
        orderBys?: Array<string>
        orderStatus?: Array<
          'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
        >
        /**
         * Current page number
         */
        page?: number
        /**
         * Items number per page
         */
        pageSize?: number
        paymentMethod?: 'CASH' | 'CARD' | 'STRIPE'
        to?: string
        user?: string
      }
      res: {
        200: OrderListEntity
      }
    }
  }
  '/v1/orders/admin/status/{id}': {
    patch: {
      req: {
        id: number
        requestBody: UpdateStatusDto
      }
      res: {
        200: boolean
      }
    }
  }
  '/v1/variations': {
    get: {
      res: {
        200: VariationListEntity
      }
    }
  }
  '/v1/variations/options': {
    get: {
      res: {
        200: VariationOptionListEntity
      }
    }
  }
  '/v1/variations/{type}': {
    get: {
      req: {
        keyword: string
        type: string
      }
      res: {
        200: VariationOptionListAdminEntity
      }
    }
    post: {
      req: {
        requestBody: CreateVariationDto
        type: string
      }
      res: {
        201: unknown
      }
    }
  }
  '/v1/variations/{type}/{id}': {
    patch: {
      req: {
        id: number
        requestBody: UpdateVariationDto
        type: string
      }
      res: {
        200: unknown
      }
    }
    delete: {
      req: {
        id: number
        type: string
      }
      res: {
        200: unknown
      }
    }
  }
  '/v1/carts': {
    get: {
      res: {
        200: CartItemListEntity
      }
    }
    post: {
      req: {
        requestBody: AddItemToCartDto
      }
      res: {
        201: CartItemIndexEntity
      }
    }
    patch: {
      req: {
        requestBody: UpdateItemToCartDto
      }
      res: {
        200: CartItemIndexEntity
      }
    }
  }
  '/v1/promotions/apply': {
    post: {
      req: {
        requestBody: ApplyPromotionDto
      }
      res: {
        201: PromotionIndexEntity
      }
    }
  }
  '/v1/promotions': {
    post: {
      req: {
        requestBody: CreatePromotionDto
      }
      res: {
        201: boolean
      }
    }
    get: {
      req: {
        code?: string
        /**
         * search keyword
         */
        keyword?: string
        orderBys?: Array<string>
        /**
         * Current page number
         */
        page?: number
        /**
         * Items number per page
         */
        pageSize?: number
      }
      res: {
        200: PromotionListEntity
      }
    }
  }
  '/v1/promotions/{id}': {
    delete: {
      req: {
        id: number
      }
      res: {
        200: boolean
      }
    }
    put: {
      req: {
        id: number
        requestBody: CreatePromotionDto
      }
      res: {
        200: unknown
      }
    }
  }
  '/v1/analytics': {
    get: {
      res: {
        200: GeneralAnalyticEntity
      }
    }
  }
  '/v1/analytics/order_count': {
    get: {
      req: {
        /**
         * Type of product
         */
        category?: number
        /**
         * Type of product
         */
        from?: string
        /**
         * Type of product
         */
        statisticType?: string
        /**
         * Type of product
         */
        subCategory?: number
        /**
         * Type of product
         */
        to?: string
      }
      res: {
        200: DetailAnalyticEntity
      }
    }
  }
  '/v1/analytics/order_statistic': {
    get: {
      req: {
        /**
         * Type of product
         */
        category?: number
        /**
         * Type of product
         */
        from?: string
        /**
         * Type of product
         */
        statisticType?: string
        /**
         * Type of product
         */
        subCategory?: number
        /**
         * Type of product
         */
        to?: string
      }
      res: {
        200: DetailAnalyticEntity
      }
    }
  }
  '/v1/analytics/product_statistic': {
    get: {
      req: {
        /**
         * Type of product
         */
        category?: number
        /**
         * Type of product
         */
        from?: string
        /**
         * Type of product
         */
        statisticType?: string
        /**
         * Type of product
         */
        subCategory?: number
        /**
         * Type of product
         */
        to?: string
      }
      res: {
        200: DetailAnalyticEntity
      }
    }
  }
  '/v1/reviews/{productItemId}/{orderId}': {
    post: {
      req: {
        orderId: number
        productItemId: number
        requestBody: CreateReviewDto
      }
      res: {
        201: ReviewIndexEntity
      }
    }
  }
  '/v1/reviews/{productId}': {
    get: {
      req: {
        /**
         * Current page number
         */
        page?: number
        /**
         * Items number per page
         */
        pageSize?: number
        productId: number
      }
      res: {
        200: ReviewListEntity
      }
    }
  }
}