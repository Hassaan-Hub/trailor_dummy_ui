import type {
  Customer,
  Order,
  Fabric,
  GarmentStyle,
  MeasurementRecord,
  Message,
  ShopSettings,
} from '@/types'

export const shopSettings: ShopSettings = {
  name: 'StitchCraft Tailors',
  ownerName: 'Mubarak Bugti',
  phone: '+92 300 1234567',
  address: 'Shop No. 12, Tariq Road, Karachi',
  measurementUnit: 'inches',
  currency: 'Rs.',
  taxRate: 5,
}

export const customers: Customer[] = [
  { id: 'C001', name: 'Sajjad Chana', phone: '+92 300 1112233', email: 'sajjad.chana@email.com', address: '12 Clifton Block 2', city: 'Karachi', joinedDate: '2024-03-15', totalOrders: 8, totalSpent: 24500, avatarColor: '#f59e0b' },

  { id: 'C002', name: 'Kanzal', phone: '+92 301 2223344', email: 'kanzal@email.com', address: '45 Gulberg', city: 'Lahore', joinedDate: '2024-06-22', totalOrders: 12, totalSpent: 38200, avatarColor: '#ec4899' },

  { id: 'C003', name: 'Muhammad Hamza', phone: '+92 302 3334455', email: 'hamza@email.com', address: '78 Latifabad', city: 'Hyderabad', joinedDate: '2024-01-10', totalOrders: 5, totalSpent: 18900, avatarColor: '#3b82f6' },

  { id: 'C004', name: 'Noman', phone: '+92 303 4445566', email: 'noman@email.com', address: '23 DHA Phase 5', city: 'Karachi', joinedDate: '2024-08-05', totalOrders: 15, totalSpent: 52600, avatarColor: '#8b5cf6' },

  { id: 'C005', name: 'Abdul Rehman', phone: '+92 304 5556677', email: 'abdul.rehman@email.com', address: '56 Satellite Town', city: 'Quetta', joinedDate: '2024-04-18', totalOrders: 3, totalSpent: 9800, avatarColor: '#10b981' },

  { id: 'C006', name: 'Ayesha Fatima', phone: '+92 305 6667788', email: 'ayesha.fatima@email.com', address: '89 Saddar', city: 'Rawalpindi', joinedDate: '2024-07-30', totalOrders: 7, totalSpent: 21300, avatarColor: '#f97316' },

  { id: 'C007', name: 'Muhammad Usman', phone: '+92 306 7778899', email: 'usman@email.com', address: '34 DHA Phase 6', city: 'Lahore', joinedDate: '2024-02-14', totalOrders: 9, totalSpent: 31400, avatarColor: '#06b6d4' },

  { id: 'C008', name: 'Maryam Noor', phone: '+92 307 8889900', email: 'maryam.noor@email.com', address: '67 Gulshan-e-Iqbal', city: 'Karachi', joinedDate: '2024-09-12', totalOrders: 4, totalSpent: 15600, avatarColor: '#ef4444' },

  { id: 'C009', name: 'Ahmed Raza', phone: '+92 308 9990011', email: 'ahmed.raza@email.com', address: '90 Model Town', city: 'Lahore', joinedDate: '2024-05-20', totalOrders: 6, totalSpent: 19700, avatarColor: '#84cc16' },

  { id: 'C010', name: 'Hira Malik', phone: '+92 309 1001122', email: 'hira.malik@email.com', address: '11 F-10 Markaz', city: 'Islamabad', joinedDate: '2024-10-12', totalOrders: 2, totalSpent: 7800, avatarColor: '#a855f7' },
]

export const orders: Order[] = [
  { id: 'ORD-001', customerId: 'C001', customerName: 'Sajjad Chana', garmentType: 'Sherwani', status: 'In Progress', priority: 'High', orderDate: '2026-11-01', deliveryDate: '2026-11-20', amount: 4500, fabricName: 'Cream Silk Brocade', measurementId: 'M001', notes: 'Wedding sherwani - need gold embroidery' },

  { id: 'ORD-002', customerId: 'C002', customerName: 'Kanzal', garmentType: 'Lehenga', status: 'Ready for Trial', priority: 'Urgent', orderDate: '2026-10-25', deliveryDate: '2026-11-15', amount: 8200, fabricName: 'Red Velvet', measurementId: 'M002', notes: 'Reception lehenga with heavy work' },

  { id: 'ORD-003', customerId: 'C003', customerName: 'Muhammad Hamza', garmentType: 'Suit', status: 'Pending', priority: 'Normal', orderDate: '2026-11-08', deliveryDate: '2026-11-25', amount: 3200, fabricName: 'Navy Wool Blend', measurementId: 'M003' },

  { id: 'ORD-004', customerId: 'C004', customerName: 'Noman', garmentType: 'Salwar Suit', status: 'Delivered', priority: 'Normal', orderDate: '2026-10-10', deliveryDate: '2026-10-28', amount: 2400, fabricName: 'Cotton Printed', measurementId: 'M004' },

  { id: 'ORD-005', customerId: 'C005', customerName: 'Abdul Rehman', garmentType: 'Pathani', status: 'Ready for Delivery', priority: 'Normal', orderDate: '2026-10-28', deliveryDate: '2026-11-12', amount: 1800, fabricName: 'Olive Cotton', measurementId: 'M005' },

  { id: 'ORD-006', customerId: 'C006', customerName: 'Ayesha Fatima', garmentType: 'Kurta', status: 'In Progress', priority: 'Normal', orderDate: '2026-11-05', deliveryDate: '2026-11-18', amount: 1200, fabricName: 'White Linen', measurementId: 'M006' },

  { id: 'ORD-007', customerId: 'C007', customerName: 'Muhammad Usman', garmentType: 'Blazer', status: 'Ready for Trial', priority: 'High', orderDate: '2026-10-30', deliveryDate: '2026-11-14', amount: 3800, fabricName: 'Charcoal Tweed', measurementId: 'M007' },

  { id: 'ORD-008', customerId: 'C008', customerName: 'Maryam Noor', garmentType: 'Designer Gown', status: 'Pending', priority: 'Urgent', orderDate: '2026-11-10', deliveryDate: '2026-11-22', amount: 6500, fabricName: 'Teal Chiffon', measurementId: 'M008', notes: 'Party wear gown' },

  { id: 'ORD-009', customerId: 'C009', customerName: 'Ahmed Raza', garmentType: 'Formal Shirt', status: 'Delivered', priority: 'Low', orderDate: '2026-10-15', deliveryDate: '2026-10-30', amount: 900, fabricName: 'Blue Cotton', measurementId: 'M001' },

  { id: 'ORD-010', customerId: 'C010', customerName: 'Hira Malik', garmentType: 'Salwar Suit', status: 'In Progress', priority: 'Normal', orderDate: '2026-11-06', deliveryDate: '2026-11-19', amount: 2600, fabricName: 'Pink Georgette', measurementId: 'M002' },

  { id: 'ORD-011', customerId: 'C001', customerName: 'Sajjad Chana', garmentType: 'Trouser', status: 'Delivered', priority: 'Low', orderDate: '2026-09-20', deliveryDate: '2026-10-05', amount: 800, fabricName: 'Grey Polyester', measurementId: 'M001' },

  { id: 'ORD-012', customerId: 'C004', customerName: 'Noman', garmentType: 'Lehenga', status: 'Cancelled', priority: 'Normal', orderDate: '2026-10-22', deliveryDate: '2026-11-10', amount: 7200, fabricName: 'Maroon Silk', measurementId: 'M004', notes: 'Customer cancelled - changed design' },

  { id: 'ORD-013', customerId: 'C007', customerName: 'Muhammad Usman', garmentType: 'Waistcoat', status: 'Ready for Delivery', priority: 'High', orderDate: '2026-10-26', deliveryDate: '2026-11-13', amount: 2200, fabricName: 'Brown Herringbone', measurementId: 'M007' },

  { id: 'ORD-014', customerId: 'C006', customerName: 'Ayesha Fatima', garmentType: 'Kurta', status: 'Pending', priority: 'Normal', orderDate: '2026-11-11', deliveryDate: '2026-11-28', amount: 1400, fabricName: 'Yellow Cotton', measurementId: 'M006' },

  { id: 'ORD-015', customerId: 'C002', customerName: 'Kanzal', garmentType: 'Designer Gown', status: 'In Progress', priority: 'Urgent', orderDate: '2026-11-03', deliveryDate: '2026-11-16', amount: 5800, fabricName: 'Black Sequin', measurementId: 'M002', notes: 'Award function gown' },
]

export const measurements: MeasurementRecord[] = [
  {
    id: 'M001', customerId: 'C001', garmentType: 'Suit', date: '2026-10-15',
    upperBody: { chest: 40, shoulder: 18, sleeveLength: 24.5, neck: 16, waistShirt: 36, fullLength: 30, bicep: 13, wrist: 9 },
    lowerBody: { waist: 34, hip: 40, thigh: 23, knee: 16, bottom: 16, length: 42, inseam: 32 },
    notes: 'Slightly loose fit preferred',
  },
  {
    id: 'M002', customerId: 'C002', garmentType: 'Lehenga', date: '2026-10-20',
    upperBody: { chest: 36, shoulder: 14.5, sleeveLength: 22, neck: 14, waistShirt: 30, fullLength: 28 },
    lowerBody: { waist: 28, hip: 38, length: 44 },
    notes: 'Fitted waist, flared bottom',
  },
  {
    id: 'M003', customerId: 'C003', garmentType: 'Suit', date: '2026-11-05',
    upperBody: { chest: 42, shoulder: 19, sleeveLength: 25, neck: 16.5, waistShirt: 38, fullLength: 31, bicep: 14, wrist: 9.5 },
    lowerBody: { waist: 36, hip: 42, thigh: 24, knee: 17, bottom: 17, length: 43, inseam: 33 },
  },
  {
    id: 'M004', customerId: 'C004', garmentType: 'Salwar Suit', date: '2026-10-08',
    upperBody: { chest: 34, shoulder: 14, sleeveLength: 21, neck: 13.5, waistShirt: 28, fullLength: 27 },
    lowerBody: { waist: 26, hip: 36, length: 40 },
    notes: 'Slim fit, anarkali style',
  },
  {
    id: 'M005', customerId: 'C005', garmentType: 'Pathani', date: '2026-10-25',
    upperBody: { chest: 44, shoulder: 20, sleeveLength: 26, neck: 17, waistShirt: 42, fullLength: 32 },
    lowerBody: { waist: 40, hip: 44, thigh: 26, knee: 18, bottom: 20, length: 44, inseam: 34 },
    notes: 'Loose comfortable fit',
  },
  {
    id: 'M006', customerId: 'C006', garmentType: 'Kurta', date: '2026-11-02',
    upperBody: { chest: 38, shoulder: 16, sleeveLength: 23, neck: 15, waistShirt: 34, fullLength: 29 },
    lowerBody: { waist: 32, hip: 40, length: 42 },
  },
  {
    id: 'M007', customerId: 'C007', garmentType: 'Blazer', date: '2026-10-28',
    upperBody: { chest: 41, shoulder: 18.5, sleeveLength: 25, neck: 16, waistShirt: 36, fullLength: 31, bicep: 13.5, wrist: 9.5 },
    lowerBody: { waist: 35, hip: 41, thigh: 24, knee: 17, bottom: 17, length: 42, inseam: 32 },
    notes: 'Slim fit blazer',
  },
  {
    id: 'M008', customerId: 'C008', garmentType: 'Designer Gown', date: '2026-11-05',
    upperBody: { chest: 35, shoulder: 14, sleeveLength: 22, neck: 13.5, waistShirt: 28, fullLength: 28 },
    lowerBody: { waist: 27, hip: 37, length: 55 },
    notes: 'Floor length gown with train',
  },
]

export const fabrics: Fabric[] = [
  { id: 'F001', name: 'Premium Cotton', type: 'Cotton', color: 'White', stockMeters: 45, pricePerMeter: 180, supplier: 'Bombay Textiles' },
  { id: 'F002', name: 'Pure Linen', type: 'Linen', color: 'Beige', stockMeters: 28, pricePerMeter: 350, supplier: 'Linen House' },
  { id: 'F003', name: 'Silk Brocade', type: 'Silk', color: 'Cream', stockMeters: 12, pricePerMeter: 850, supplier: 'Banaras Silk Co.' },
  { id: 'F004', name: 'Velvet', type: 'Velvet', color: 'Red', stockMeters: 8, pricePerMeter: 620, supplier: 'Royal Fabrics' },
  { id: 'F005', name: 'Wool Blend', type: 'Wool', color: 'Navy', stockMeters: 35, pricePerMeter: 450, supplier: 'Woolworth' },
  { id: 'F006', name: 'Georgette', type: 'Georgette', color: 'Pink', stockMeters: 5, pricePerMeter: 280, supplier: 'Fashion Fabrics' },
  { id: 'F007', name: 'Chiffon', type: 'Chiffon', color: 'Teal', stockMeters: 18, pricePerMeter: 320, supplier: 'Elegant Textiles' },
  { id: 'F008', name: 'Polyester Blend', type: 'Polyester', color: 'Grey', stockMeters: 52, pricePerMeter: 150, supplier: 'Bombay Textiles' },
  { id: 'F009', name: 'Herringbone Tweed', type: 'Wool', color: 'Brown', stockMeters: 14, pricePerMeter: 550, supplier: 'Woolworth' },
  { id: 'F010', name: 'Sequin Fabric', type: 'Decorative', color: 'Black', stockMeters: 3, pricePerMeter: 980, supplier: 'Royal Fabrics' },
  { id: 'F011', name: 'Cotton Printed', type: 'Cotton', color: 'Blue', stockMeters: 22, pricePerMeter: 220, supplier: 'Fashion Fabrics' },
  { id: 'F012', name: 'Hosiery Knit', type: 'Knit', color: 'Olive', stockMeters: 30, pricePerMeter: 190, supplier: 'Knit Master' },
]

export const garmentStyles: GarmentStyle[] = [
  {
    id: 'GS001', type: 'Shirt', name: 'Formal Shirt', basePrice: 900, icon: 'shirt',
    description: 'Classic formal shirt with customizable collar and cuff options',
    styleOptions: { collars: ['Classic', 'Cutaway', 'Button-down', 'Mandarin', 'Wing'], cuffs: ['Barrel', 'French', 'Convertible'], pockets: ['None', 'One', 'Two', 'With Flap'], closures: ['Full Button', 'Half Button'] },
  },
  {
    id: 'GS002', type: 'Trouser', name: 'Trouser', basePrice: 800, icon: 'pants',
    description: 'Tailored trousers with various fit and pleat options',
    styleOptions: { pockets: ['Slant', 'Welt', 'Cargo'], closures: ['Zip + Hook', 'Button Fly'] },
  },
  {
    id: 'GS003', type: 'Kurta', name: 'Kurta', basePrice: 1200, icon: 'kurta',
    description: 'Traditional Indian kurta for festive and casual wear',
    styleOptions: { necklines: ['Round', 'V-Neck', 'Chinese Collar', 'Nehru Collar', 'Placket'], cuffs: ['Simple', 'Buttoned', 'Cuffed'] },
  },
  {
    id: 'GS004', type: 'Sherwani', name: 'Sherwani', basePrice: 4500, icon: 'sherwani',
    description: 'Premium wedding sherwani with embroidery options',
    styleOptions: { necklines: ['Shawl', 'Mandarin', 'Nehru'], closures: ['Full Button', 'Hook & Eye'] },
  },
  {
    id: 'GS005', type: 'Suit', name: 'Suit (2pc/3pc)', basePrice: 3200, icon: 'suit',
    description: 'Bespoke suit jacket and trouser with full customization',
    styleOptions: { collars: ['Notch Lapel', 'Peak Lapel', 'Shawl Collar'], pockets: ['Flap', 'Jetted', 'Patch'], closures: ['Single Breasted', 'Double Breasted'] },
  },
  {
    id: 'GS006', type: 'Blazer', name: 'Blazer', basePrice: 3800, icon: 'blazer',
    description: 'Smart casual blazer for formal and semi-formal occasions',
    styleOptions: { collars: ['Notch Lapel', 'Peak Lapel'], pockets: ['Flap', 'Patch', 'Welt'], closures: ['Single Breasted', 'Double Breasted'] },
  },
  {
    id: 'GS007', type: 'Salwar Suit', name: 'Salwar Suit', basePrice: 2400, icon: 'salwar',
    description: 'Complete salwar kameez set with dupatta options',
    styleOptions: { necklines: ['Round', 'V-Neck', 'Boat', 'Square', 'High Neck'] },
  },
  {
    id: 'GS008', type: 'Lehenga', name: 'Lehenga Choli', basePrice: 7200, icon: 'lehenga',
    description: 'Designer lehenga with choli and dupatta for weddings',
    styleOptions: { necklines: ['Sweetheart', 'Round', 'Halter', 'Off-Shoulder'] },
  },
  {
    id: 'GS009', type: 'Pathani', name: 'Pathani Suit', basePrice: 1800, icon: 'pathani',
    description: 'Comfortable Pathani suit with kurta and salwar',
    styleOptions: { necklines: ['Round with Placket', 'V-Neck with Placket'] },
  },
  {
    id: 'GS010', type: 'Waistcoat', name: 'Waistcoat', basePrice: 2200, icon: 'waistcoat',
    description: 'Stylish waistcoat for layering over shirts',
    styleOptions: { collars: ['Shawl', 'Notch', 'Lapel'], pockets: ['Welt', 'Flap'], closures: ['Full Button', 'Adjustable Buckle'] },
  },
  {
    id: 'GS011', type: 'Formal Shirt', name: 'Premium Formal Shirt', basePrice: 1100, icon: 'shirt',
    description: 'Premium formal shirt with superior fabric and finish',
    styleOptions: { collars: ['Cutaway', 'Classic', 'Tab', 'Pin'], cuffs: ['French', 'Barrel', 'Convertible'], pockets: ['None', 'One'] },
  },
  {
    id: 'GS012', type: 'Designer Gown', name: 'Designer Gown', basePrice: 5800, icon: 'gown',
    description: 'Custom designer gown for parties and special events',
    styleOptions: { necklines: ['Sweetheart', 'Halter', 'Off-Shoulder', 'One-Shoulder', 'V-Neck'] },
  },
]

export const messages: Message[] = [
  { id: 'MSG001', customerId: 'C002', customerName: 'Kanzal', type: 'trial_reminder', content: 'Trial reminder: Your Lehenga is ready for fitting. Please visit tomorrow.', timestamp: '2026-11-12T10:30:00', read: false },

  { id: 'MSG002', customerId: 'C005', customerName: 'Abdul Rehman', type: 'delivery_ready', content: 'Good news! Your Pathani Suit is ready for delivery.', timestamp: '2026-11-12T09:15:00', read: false },

  { id: 'MSG003', customerId: 'C001', customerName: 'Sajjad Chana', type: 'order_update', content: 'Your Sherwani order (ORD-001) is now in progress.', timestamp: '2026-11-11T16:45:00', read: true },

  { id: 'MSG004', customerId: 'C008', customerName: 'Maryam Noor', type: 'measurement_confirm', content: 'Measurements confirmed for Designer Gown. Thank you!', timestamp: '2026-11-11T14:20:00', read: true },

  { id: 'MSG005', customerId: 'C007', customerName: 'Muhammad Usman', type: 'trial_reminder', content: 'Trial reminder: Blazer fitting scheduled for today 4 PM.', timestamp: '2026-11-11T11:00:00', read: true },

  { id: 'MSG006', customerId: 'C004', customerName: 'Noman', type: 'delivery_ready', content: 'Your Salwar Suit has been delivered successfully. Thank you!', timestamp: '2026-10-28T15:30:00', read: true },

  { id: 'MSG007', customerId: 'C010', customerName: 'Hira Malik', type: 'order_update', content: 'New order confirmed: Salwar Suit (ORD-010). Expected delivery Nov 19.', timestamp: '2026-11-06T13:00:00', read: true },
]

export const measurementTemplates = [
  { name: 'Standard Shirt', fields: ['chest', 'shoulder', 'sleeveLength', 'neck', 'waistShirt', 'fullLength'] },
  { name: 'Standard Trouser', fields: ['waist', 'hip', 'thigh', 'knee', 'bottom', 'length', 'inseam'] },
  { name: 'Kurta Default', fields: ['chest', 'shoulder', 'sleeveLength', 'neck', 'fullLength', 'waist'] },
  { name: 'Suit Set', fields: ['chest', 'shoulder', 'sleeveLength', 'neck', 'waistShirt', 'fullLength', 'waist', 'hip', 'thigh', 'length'] },
  { name: 'Lehenga Set', fields: ['chest', 'waist', 'hip', 'fullLength', 'shoulder'] },
  { name: 'Blazer', fields: ['chest', 'shoulder', 'sleeveLength', 'fullLength', 'waistShirt'] },
]
