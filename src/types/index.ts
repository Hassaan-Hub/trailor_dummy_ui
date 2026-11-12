// ==================== Core Types ====================

export type OrderStatus =
  | 'Pending'
  | 'In Progress'
  | 'Ready for Trial'
  | 'Ready for Delivery'
  | 'Delivered'
  | 'Cancelled'

export type Priority = 'Low' | 'Normal' | 'High' | 'Urgent'

export type GarmentType =
  | 'Shirt'
  | 'Trouser'
  | 'Kurta'
  | 'Pathani'
  | 'Sherwani'
  | 'Suit'
  | 'Blazer'
  | 'Salwar Suit'
  | 'Lehenga'
  | 'Coat'
  | 'Waistcoat'
  | 'Pant'

export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  address: string
  city: string
  createdAt: string
  totalSpent: number
  totalOrders: number
  avatarColor: string
  notes?: string
}

export interface Measurements {
  // Upper body
  chest?: number
  shoulder?: number
  sleeveLength?: number
  neck?: number
  waistShirt?: number
  fullLength?: number
  bicep?: number
  wrist?: number
  armhole?: number
  backLength?: number
  // Lower body
  waist?: number
  hip?: number
  thigh?: number
  knee?: number
  bottom?: number
  length?: number
  inseam?: number
  // Extras
  notes?: string
}

export interface Fabric {
  id: string
  name: string
  type: string
  color: string
  stockMeters: number
  pricePerMeter: number
  supplier: string
  lowStockThreshold: number
}

export interface GarmentStyle {
  id: string
  type: GarmentType
  name: string
  description: string
  basePrice: number
  priceRange: string
  imageColor: string
  styleOptions: {
    collars?: string[]
    cuffs?: string[]
    pockets?: string[]
    closures?: string[]
    necklines?: string[]
    sleeves?: string[]
  }
}

export interface OrderItem {
  garmentType: GarmentType
  fabricId?: string
  measurements: Measurements
  styleDetails: string
  quantity: number
  unitPrice: number
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  items: OrderItem[]
  status: OrderStatus
  priority: Priority
  orderDate: string
  deliveryDate: string
  trialDate?: string
  totalAmount: number
  advancePaid: number
  notes?: string
}

export interface Message {
  id: string
  customerId: string
  customerName: string
  text: string
  timestamp: string
  sentBy: 'shop' | 'customer'
  type: 'message' | 'notification'
  read: boolean
}

export interface MeasurementRecord {
  id: string
  customerId: string
  customerName: string
  date: string
  measurements: Measurements
  garmentType: GarmentType
}

export interface ShopSettings {
  shopName: string
  ownerName: string
  phone: string
  email: string
  address: string
  city: string
  measurementUnit: 'inches' | 'cm'
  taxRate: number
  currency: string
  logoText: string
}
