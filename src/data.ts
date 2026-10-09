export type CategoryId = 'com' | 'pho' | 'fast' | 'drink' | 'snack' | 'veggie'

export type Category = {
  id: CategoryId
  name: string
  count: string
  imagePosition: string
}

export type MenuItem = {
  name: string
  description: string
  price: number
}

export type Restaurant = {
  id: string
  name: string
  type: string
  area: string
  category: CategoryId
  rating: string
  time: string
  offer?: string
  imagePosition: string
  menu: MenuItem[]
}

export const categories: Category[] = [
  { id: 'com', name: 'Cơm', count: 'Đậm đà, no bụng', imagePosition: '0% 0%' },
  { id: 'pho', name: 'Bún & Phở', count: 'Nóng hổi mỗi ngày', imagePosition: '50% 0%' },
  { id: 'fast', name: 'Đồ ăn nhanh', count: 'Giòn ngon tiện lợi', imagePosition: '100% 0%' },
  { id: 'drink', name: 'Đồ uống', count: 'Mát lành, tươi mới', imagePosition: '0% 100%' },
  { id: 'snack', name: 'Ăn vặt', count: 'Vui miệng cả ngày', imagePosition: '50% 100%' },
  { id: 'veggie', name: 'Món chay', count: 'Nhẹ nhàng, bổ dưỡng', imagePosition: '100% 100%' },
]

export const restaurants: Restaurant[] = [
  {
    id: 'com-nha-viet', name: 'Cơm Nhà Việt', type: 'Cơm Việt · Món gia đình', area: 'Quận 1, TP. Hồ Chí Minh', category: 'com', rating: '4.8', time: '25–35 phút', offer: 'Giảm 20%', imagePosition: '0% 0%',
    menu: [
      { name: 'Cơm tấm sườn nướng', description: 'Sườn nướng, bì, chả và nước mắm nhà làm', price: 59000 },
      { name: 'Cơm gà xối mỡ', description: 'Gà da giòn, cơm thơm và dưa chua', price: 65000 },
      { name: 'Canh chua cá', description: 'Vị chua thanh, rau tươi mỗi ngày', price: 39000 },
    ],
  },
  {
    id: 'ga-gion-pho', name: 'Gà Giòn Phố', type: 'Gà rán · Đồ ăn nhanh', area: 'Quận 3, TP. Hồ Chí Minh', category: 'fast', rating: '4.7', time: '20–30 phút', imagePosition: '100% 0%',
    menu: [
      { name: 'Gà giòn sốt cay', description: 'Hai miếng gà giòn phủ sốt cay ngọt', price: 69000 },
      { name: 'Combo gà và khoai', description: 'Gà giòn, khoai tây chiên và nước uống', price: 99000 },
      { name: 'Khoai tây chiên', description: 'Giòn vàng, dùng kèm tương cà', price: 35000 },
    ],
  },
  {
    id: 'pho-moi-ngay', name: 'Phở Mỗi Ngày', type: 'Phở bò · Món Việt', area: 'Bình Thạnh, TP. Hồ Chí Minh', category: 'pho', rating: '4.9', time: '20–30 phút', offer: 'Freeship', imagePosition: '50% 0%',
    menu: [
      { name: 'Phở bò tái', description: 'Nước dùng ninh xương, thịt bò mềm', price: 65000 },
      { name: 'Phở bò đặc biệt', description: 'Tái, nạm, gầu và bò viên', price: 79000 },
      { name: 'Quẩy giòn', description: 'Ăn kèm phở nóng', price: 12000 },
    ],
  },
  {
    id: 'bep-me-nau', name: 'Bếp Mẹ Nấu', type: 'Cơm nhà · Món chay', area: 'Phú Nhuận, TP. Hồ Chí Minh', category: 'veggie', rating: '4.8', time: '30–40 phút', imagePosition: '100% 100%',
    menu: [
      { name: 'Cơm rau củ đậu hũ', description: 'Rau tươi, đậu hũ và sốt mè rang', price: 62000 },
      { name: 'Bún chay thanh đạm', description: 'Nấm, rau xanh và nước dùng rau củ', price: 57000 },
      { name: 'Gỏi cuốn chay', description: 'Bốn cuốn với tương đậu phộng', price: 45000 },
    ],
  },
  {
    id: 'tra-nha-minh', name: 'Trà Nhà Mình', type: 'Trà sữa · Đồ uống', area: 'Quận 1, TP. Hồ Chí Minh', category: 'drink', rating: '4.7', time: '15–25 phút', offer: 'Giảm 15%', imagePosition: '0% 100%',
    menu: [
      { name: 'Trà sữa trân châu', description: 'Trà thơm, sữa béo và trân châu dai', price: 42000 },
      { name: 'Trà đào cam sả', description: 'Thanh mát cùng đào miếng', price: 39000 },
      { name: 'Matcha latte', description: 'Matcha đậm vị và sữa tươi', price: 49000 },
    ],
  },
  {
    id: 'bun-ngon-24h', name: 'Bún Ngon 24H', type: 'Bún · Ăn vặt', area: 'Quận 10, TP. Hồ Chí Minh', category: 'snack', rating: '4.6', time: '25–35 phút', imagePosition: '50% 100%',
    menu: [
      { name: 'Bánh tráng trộn đặc biệt', description: 'Trứng cút, xoài, rau răm và sốt me', price: 39000 },
      { name: 'Bún thịt nướng', description: 'Thịt nướng, chả giò và nước mắm', price: 59000 },
      { name: 'Bún bò Huế', description: 'Nước dùng đậm vị, thịt bò và chả', price: 65000 },
    ],
  },
]

export const formatPrice = (price: number) => `${new Intl.NumberFormat('vi-VN').format(price)} ₫`
