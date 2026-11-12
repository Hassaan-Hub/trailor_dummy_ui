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
  | 'Sherwani'
  | 'Suit'
  | 'Blazer'
  | 'Salwar Suit'
  | 'Lehenga'
  | 'Pathani'
  | 'Waistcoat'
  | 'Formal Shirt'
  | 'Designer Gown'

export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  address: string
  city: string
  joinedDate: string
  totalOrders: number
  totalSpent: number
  avatarColor: string
}

export interface MeasurementRecord {
  id: string
  customerId: string
  garmentType: GarmentType
  date: string
  upperBody: {
    chest?: number
    shoulder?: number
    sleeveLength?: number
    neck?: number
    waistShirt?: number
    fullLength?: number
    bicep?: number
    wrist?: number
  }
  lowerBody: {
    waist?: number
    hip?: number
    thigh?: number
    knee?: number
    bottom?: number
    length?: number
    inseam?: number
  }
  notes?: string
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  garmentType: GarmentType
  status: OrderStatus
  priority: Priority
  orderDate: string
  deliveryDate: string
  amount: number
  fabricName: string
  measurementId: string
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
}

export interface GarmentStyle {
  id: string
  type: GarmentType
  name: string
  basePrice: number
  icon: string
  description: string
  styleOptions: {
    collars?: string[]
    cuffs?: string[]
    pockets?: string[]
    closures?: string[]
    necklines?: string[]
  }
}

export interface Message {
  id: string
  customerId: string
  customerName: string
  type: 'trial_reminder' | 'delivery_ready' | 'measurement_confirm' | 'order_update'
  content: string
  timestamp: string
  read: boolean
}

export interface ShopSettings {
  name: string
  ownerName: string
  phone: string
  address: string
  measurementUnit: 'inches' | 'cm'
  currency: string
  taxRate: number
}
