import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  ArrowRight, ArrowUpRight, BadgePercent, Bike, Check, CheckCircle2, ChevronRight,
  Clock3, Facebook, Heart, Instagram, MapPin, Menu, Minus, Plus, Search,
  ShoppingBag, Sparkles, Star, Store, Truck, UtensilsCrossed, X,
} from 'lucide-react'
import { categories, formatPrice, restaurants, type CategoryId, type Restaurant } from './data'

type Filter = CategoryId | 'all' | 'offers'
type InfoKind = 'login' | 'restaurant-partner' | 'driver-partner' | 'contact' | 'faq' | 'privacy' | 'terms' | 'social'
type CartItem = { key: string; name: string; price: number; quantity: number }

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Brand({ light = false }: { light?: boolean }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="#trang-chu" aria-label="FoodGo, về đầu trang">
    <span className="brand-mark"><ShoppingBag size={19} strokeWidth={2.3} /><span className="brand-mark-dot" /></span>
    <span>FoodGo<span className="brand-period">.</span></span>
  </a>
}

function FoodPhoto({ position, className = '' }: { position: string; className?: string }) {
  return <div className={`food-photo ${className}`} style={{ backgroundPosition: position }} role="img" aria-label="Hình món ăn minh họa" />
}

function SectionHeading({ eyebrow, title, description, centered = false }: { eyebrow: string; title: string; description: string; centered?: boolean }) {
  return <div className={`section-heading ${centered ? 'centered' : ''}`}>
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
}

function Navbar({ onOrder, onOffers, onInfo, userName }: { onOrder: () => void; onOffers: () => void; onInfo: (kind: InfoKind) => void; userName: string }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const nav = <>
    <a href="#trang-chu" onClick={close}>Trang chủ</a>
    <a href="#kham-pha" onClick={close}>Khám phá</a>
    <button onClick={() => { onOffers(); close() }}>Ưu đãi</button>
    <a href="#doi-tac" onClick={close}>Đối tác</a>
    <a href="#lien-he" onClick={close}>Liên hệ</a>
  </>
  return <header className="site-header">
    <div className="container header-inner">
      <Brand />
      <nav className="desktop-nav" aria-label="Điều hướng chính">{nav}</nav>
      <div className="header-actions">
        <button className="text-button login-button" onClick={() => onInfo('login')}>{userName ? `Chào, ${userName}` : 'Đăng nhập'}</button>
        <button className="button button-primary header-cta" onClick={onOrder}>Đặt món ngay <ArrowRight size={17} /></button>
      </div>
      <button className="menu-toggle" aria-label={open ? 'Đóng menu' : 'Mở menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Điều hướng di động">
      {nav}
      <div className="mobile-nav-actions">
        <button className="button button-ghost" onClick={() => { onInfo('login'); close() }}>{userName ? `Chào, ${userName}` : 'Đăng nhập'}</button>
        <button className="button button-primary" onClick={() => { onOrder(); close() }}>Đặt món ngay <ArrowRight size={17} /></button>
      </div>
    </nav>}
  </header>
}

function LocationSearch({ inputRef, onSearch }: { inputRef: React.RefObject<HTMLInputElement | null>; onSearch: (address: string) => void }) {
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = address.trim()
    if (value.length < 5) {
      setError(value ? 'Vui lòng nhập địa chỉ chi tiết hơn (ít nhất 5 ký tự).' : 'Vui lòng nhập địa chỉ giao hàng trước khi tìm kiếm.')
      inputRef.current?.focus()
      return
    }
    setError('')
    onSearch(value)
  }
  return <form className="location-search" onSubmit={submit} noValidate>
    <label htmlFor="delivery-address">Địa chỉ giao hàng của bạn</label>
    <div className={`search-control ${error ? 'has-error' : ''}`}>
      <MapPin className="search-pin" size={21} aria-hidden="true" />
      <input ref={inputRef} id="delivery-address" type="text" autoComplete="street-address" placeholder="Nhập địa chỉ của bạn..." value={address} onChange={e => { setAddress(e.target.value); if (error) setError('') }} aria-invalid={Boolean(error)} aria-describedby={error ? 'address-error' : undefined} />
      <button className="button button-primary search-submit" type="submit">Tìm nhà hàng gần bạn <ArrowRight size={18} /></button>
    </div>
    {error && <p className="field-error" id="address-error" role="alert">{error}</p>}
    <p className="search-help"><CheckCircle2 size={16} /> Khám phá hàng loạt món ngon ngay tại khu vực của bạn.</p>
  </form>
}

function HeroSection({ inputRef, onSearch }: { inputRef: React.RefObject<HTMLInputElement | null>; onSearch: (address: string) => void }) {
  return <section className="hero" id="trang-chu">
    <div className="container hero-grid">
      <div className="hero-copy">
        <span className="hero-eyebrow"><Sparkles size={15} /> ĂN NGON MỖI NGÀY</span>
        <h1>Món ngon gần bạn,<br /><em>giao tận cửa!</em></h1>
        <p className="hero-lead">Khám phá những món ăn yêu thích từ các nhà hàng quanh bạn. Chọn món dễ dàng, đặt hàng tiện lợi.</p>
        <LocationSearch inputRef={inputRef} onSearch={onSearch} />
        <div className="hero-note"><span className="note-icon"><Truck size={18} /></span><span>Hàng trăm lựa chọn ngon đang chờ bạn khám phá</span></div>
      </div>
      <div className="hero-visual">
        <div className="hero-image-wrap"><img src="/images/foodgo-hero.webp" alt="Phở bò, cơm tấm và gỏi cuốn Việt Nam" width="1536" height="1024" fetchPriority="high" /></div>
        <div className="floating-card floating-top"><span className="floating-icon"><Heart size={20} fill="currentColor" /></span><span><strong>Ngon đúng ý</strong><small>Chọn món bạn thích</small></span></div>
        <div className="floating-card floating-bottom"><span className="floating-icon delivery"><Bike size={21} /></span><span><strong>Dễ dàng khám phá</strong><small>Ngay quanh khu vực bạn</small></span></div>
        <div className="hero-decor hero-decor-one" /><div className="hero-decor hero-decor-two" />
      </div>
    </div>
  </section>
}

function FoodCategories({ onSelect }: { onSelect: (category: CategoryId) => void }) {
  return <section className="section categories-section" id="kham-pha">
    <div className="container">
      <SectionHeading eyebrow="DANH MỤC MÓN NGON" title="Hôm nay bạn muốn ăn gì?" description="Từ món Việt quen thuộc đến những hương vị mới lạ, khám phá thực đơn phù hợp với sở thích của bạn." centered />
      <div className="categories-grid">
        {categories.map(category => <button key={category.id} className="category-card" onClick={() => onSelect(category.id)} aria-label={`Khám phá ${category.name}`}>
          <FoodPhoto position={category.imagePosition} className="category-image" />
          <span className="category-title">{category.name} <span className="category-arrow"><ArrowUpRight size={17} /></span></span>
          <span className="category-subtitle">{category.count}</span>
        </button>)}
      </div>
    </div>
  </section>
}

function RestaurantCard({ restaurant, onMenu }: { restaurant: Restaurant; onMenu: (restaurant: Restaurant) => void }) {
  return <article className="restaurant-card">
    <div className="restaurant-image-wrap"><FoodPhoto position={restaurant.imagePosition} className="restaurant-image" />{restaurant.offer && <span className="offer-badge"><BadgePercent size={14} /> {restaurant.offer}</span>}</div>
    <div className="restaurant-content">
      <div className="restaurant-title-line"><h3>{restaurant.name}</h3><span className="rating"><Star size={15} fill="currentColor" /> {restaurant.rating}</span></div>
      <p className="restaurant-type">{restaurant.type}</p>
      <div className="restaurant-meta"><span><MapPin size={15} />{restaurant.area}</span><span><Clock3 size={15} />{restaurant.time}</span></div>
      <button className="menu-link" onClick={() => onMenu(restaurant)}>Xem thực đơn <ArrowRight size={17} /></button>
    </div>
  </article>
}

function FeaturedRestaurants({ filter, setFilter, location, onMenu }: { filter: Filter; setFilter: (filter: Filter) => void; location: string; onMenu: (restaurant: Restaurant) => void }) {
  const visible = restaurants.filter(restaurant => filter === 'all' || (filter === 'offers' ? Boolean(restaurant.offer) : restaurant.category === filter))
  const filterName = filter === 'offers' ? 'Ưu đãi' : categories.find(category => category.id === filter)?.name
  return <section className="section restaurants-section" id="nha-hang">
    <div className="container">
      <div className="restaurant-heading-row">
        <SectionHeading eyebrow="LỰA CHỌN DÀNH CHO BẠN" title="Khám phá nhà hàng dành cho bạn" description="Tìm kiếm những địa điểm ăn uống hấp dẫn và lựa chọn món ngon ngay tại khu vực của bạn." />
        <span className="demo-pill"><span /> Dữ liệu minh họa</span>
      </div>
      {location && <div className="location-result"><MapPin size={17} /><span>Kết quả demo cho <strong>{location}</strong>. Khu vực giao hàng chưa được xác minh.</span></div>}
      <div className="filter-list" aria-label="Lọc nhà hàng">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Tất cả</button>
        {categories.map(category => <button key={category.id} className={filter === category.id ? 'active' : ''} onClick={() => setFilter(category.id)}>{category.name}</button>)}
        <button className={filter === 'offers' ? 'active' : ''} onClick={() => setFilter('offers')}>Ưu đãi</button>
      </div>
      {filter !== 'all' && <p className="filter-summary">Đang xem: <strong>{filterName}</strong> · {visible.length} nhà hàng minh họa</p>}
      <div className="restaurants-grid">{visible.map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} onMenu={onMenu} />)}</div>
      {filter !== 'all' && <button className="button button-outline all-restaurants" onClick={() => setFilter('all')}>Xem tất cả nhà hàng <ArrowRight size={17} /></button>}
    </div>
  </section>
}

function HowItWorks() {
  const steps = [
    { icon: MapPin, title: 'Nhập địa chỉ', text: 'Cho FoodGo biết nơi bạn muốn nhận món ăn.' },
    { icon: UtensilsCrossed, title: 'Chọn món ngon', text: 'Khám phá nhà hàng và chọn những món bạn yêu thích.' },
    { icon: Bike, title: 'Nhận đơn hàng', text: 'Xác nhận đơn và theo dõi quá trình giao đồ ăn.' },
  ]
  return <section className="section steps-section" id="cach-hoat-dong"><div className="container">
    <SectionHeading eyebrow="ĐƠN GIẢN MỖI NGÀY" title="Chỉ 3 bước, món ngon đến tay" description="Từ lúc chọn món đến khi thưởng thức, mọi thứ đều thật dễ dàng." centered />
    <div className="steps-grid">{steps.map((step, index) => <div className="step-card" key={step.title}>
      <div className="step-icon"><step.icon size={27} strokeWidth={1.8} /></div><span className="step-number">0{index + 1}</span>
      <h3>{step.title}</h3><p>{step.text}</p>{index < 2 && <div className="step-connector" aria-hidden="true"><ChevronRight size={21} /></div>}
    </div>)}</div>
    <p className="demo-note">Luồng đặt và theo dõi đơn hiện được mô phỏng trong bản demo.</p>
  </div></section>
}

function BenefitsSection({ onExplore }: { onExplore: () => void }) {
  return <section className="section benefits-section" id="loi-ich"><div className="container benefits-grid">
    <div className="benefits-copy"><span className="eyebrow">FOODGO Ở BÊN BẠN</span><h2>Một nơi cho mọi <span>món ngon</span></h2>
      <p className="benefits-lead">Khám phá nhiều lựa chọn ẩm thực, quản lý đơn hàng thuận tiện và lưu lại những món ăn bạn yêu thích.</p>
      <div className="benefit-list">
        <div><span><Search size={21} /></span><div><h3>Khám phá nhiều món ăn</h3><p>Từ bữa cơm thân quen đến món mới đầy cảm hứng.</p></div></div>
        <div><span><ShoppingBag size={21} /></span><div><h3>Đặt món dễ dàng</h3><p>Chọn món yêu thích trong vài thao tác đơn giản.</p></div></div>
        <div><span><Truck size={21} /></span><div><h3>Theo dõi đơn hàng thuận tiện</h3><p>Mọi thông tin trong một giao diện dễ sử dụng.</p></div></div>
      </div>
      <button className="button button-primary" onClick={onExplore}>Tìm hiểu thêm <ArrowRight size={17} /></button>
    </div>
    <div className="phone-stage" aria-label="Giao diện ứng dụng FoodGo minh họa">
      <div className="phone-halo" />
      <div className="phone-mockup"><div className="phone-notch" /><div className="phone-screen">
        <div className="phone-status">9:41 <span>●●● ▰</span></div>
        <div className="phone-top"><small>Giao đến</small><strong><MapPin size={13} /> Nhà của bạn</strong></div>
        <div className="phone-greeting">Hôm nay ăn gì? <span>👋</span></div>
        <div className="phone-search"><Search size={15} /> Tìm món ngon quanh bạn</div>
        <div className="phone-feature"><FoodPhoto position="50% 0%" /><div><small>GỢI Ý HÔM NAY</small><strong>Ấm bụng với phở ngon</strong><span>Khám phá ngay <ArrowRight size={12} /></span></div></div>
        <div className="phone-row"><strong>Danh mục nổi bật</strong><span>Xem thêm</span></div>
        <div className="phone-categories">{categories.slice(0, 3).map(category => <div key={category.id}><FoodPhoto position={category.imagePosition} /><small>{category.name}</small></div>)}</div>
        <div className="phone-row"><strong>Gần bạn</strong><span>Khám phá</span></div>
        <div className="phone-mini-card"><FoodPhoto position="0% 0%" /><div><strong>Cơm Nhà Việt</strong><small>⭐ 4.8 · 25–35 phút</small></div><ChevronRight size={14} /></div>
        <div className="phone-bottom"><span>⌂<small>Trang chủ</small></span><span>♡<small>Yêu thích</small></span><span>▤<small>Đơn hàng</small></span><span>◯<small>Tài khoản</small></span></div>
      </div></div>
      <div className="phone-floating"><span><Check size={16} /></span> Giao diện minh họa</div>
    </div>
  </div></section>
}

function PartnerSection({ onInfo }: { onInfo: (kind: InfoKind) => void }) {
  return <section className="section partner-section" id="doi-tac"><div className="container">
    <SectionHeading eyebrow="ĐỒNG HÀNH CÙNG FOODGO" title="Cùng FoodGo kết nối nhiều cơ hội hơn" description="Bạn sở hữu nhà hàng hay muốn trở thành đối tác giao hàng? Hãy cùng FoodGo phát triển." centered />
    <div className="partners-grid">
      <article className="partner-card partner-restaurant"><span className="partner-icon"><Store size={28} /></span><div><h3>Đối tác nhà hàng</h3><p>Tiếp cận thêm thực khách và giới thiệu món ngon của bạn.</p><button onClick={() => onInfo('restaurant-partner')}>Đăng ký nhà hàng <ArrowRight size={18} /></button></div><div className="partner-art art-restaurant"><UtensilsCrossed size={84} strokeWidth={1.1} /></div></article>
      <article className="partner-card partner-driver"><span className="partner-icon"><Bike size={30} /></span><div><h3>Đối tác tài xế</h3><p>Tìm hiểu cơ hội hợp tác giao hàng cùng FoodGo.</p><button onClick={() => onInfo('driver-partner')}>Đăng ký tài xế <ArrowRight size={18} /></button></div><div className="partner-art art-driver"><Bike size={92} strokeWidth={1.1} /></div></article>
    </div>
  </div></section>
}

function CallToAction({ onExplore }: { onExplore: () => void }) {
  return <section className="final-cta"><div className="container final-cta-inner"><div className="cta-spark cta-spark-one">✳</div><div className="cta-spark cta-spark-two">✳</div>
    <span className="eyebrow">BỮA NGON BẮT ĐẦU TỪ ĐÂY</span><h2>Hôm nay ăn gì?<br /><span>Để FoodGo giúp bạn!</span></h2>
    <p>Khám phá những món ăn hấp dẫn quanh bạn và bắt đầu đặt món ngay hôm nay.</p>
    <button className="button button-primary" onClick={onExplore}>Khám phá nhà hàng <ArrowRight size={18} /></button>
  </div></section>
}

function Footer({ onInfo, onOffers, onExplore }: { onInfo: (kind: InfoKind) => void; onOffers: () => void; onExplore: () => void }) {
  return <footer className="footer" id="lien-he"><div className="container">
    <div className="footer-grid">
      <div className="footer-about"><Brand /><p>Món ngon gần bạn, niềm vui đến tận cửa. Cùng FoodGo khám phá bữa ăn theo cách của riêng bạn.</p><div className="social-row"><button aria-label="Thông tin Facebook FoodGo" onClick={() => onInfo('social')}><Facebook size={18} /></button><button aria-label="Thông tin Instagram FoodGo" onClick={() => onInfo('social')}><Instagram size={18} /></button></div></div>
      <div className="footer-column"><h3>Khám phá</h3><button onClick={onExplore}>Nhà hàng</button><a href="#kham-pha">Danh mục món ăn</a><button onClick={onOffers}>Ưu đãi</button></div>
      <div className="footer-column"><h3>Đối tác</h3><button onClick={() => onInfo('restaurant-partner')}>Đăng ký nhà hàng</button><button onClick={() => onInfo('driver-partner')}>Đăng ký tài xế</button></div>
      <div className="footer-column"><h3>Hỗ trợ</h3><button onClick={() => onInfo('contact')}>Liên hệ</button><button onClick={() => onInfo('faq')}>Câu hỏi thường gặp</button><button onClick={() => onInfo('privacy')}>Chính sách bảo mật</button><button onClick={() => onInfo('terms')}>Điều khoản sử dụng</button></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} FoodGo. Giao diện và dữ liệu minh họa.</span><span>Được làm với <Heart size={14} fill="currentColor" /> cho những bữa ăn ngon.</span></div>
  </div></footer>
}

function Dialog({ title, children, onClose, className = '' }: { title: string; children: ReactNode; onClose: () => void; className?: string }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  useEffect(() => {
    const previous = document.body.style.overflow
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current()
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled)')]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKeyDown); previousFocus?.focus() }
  }, [])
  return <div className="dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
    <div ref={dialogRef} className={`dialog ${className}`} role="dialog" aria-modal="true" aria-label={title}>
      <div className="dialog-header"><h2>{title}</h2><button ref={closeRef} className="icon-button" onClick={onClose} aria-label="Đóng"><X size={21} /></button></div>
      {children}
    </div>
  </div>
}

function MenuDialog({ restaurant, onClose, onAdd, cartCount, onCart }: { restaurant: Restaurant; onClose: () => void; onAdd: (restaurant: Restaurant, name: string, price: number) => void; cartCount: number; onCart: () => void }) {
  return <Dialog title={restaurant.name} onClose={onClose} className="menu-dialog"><div className="dialog-photo"><FoodPhoto position={restaurant.imagePosition} /><span>Thực đơn demo</span></div>
    <p className="dialog-subtitle">{restaurant.type} · {restaurant.area}</p><div className="menu-items">{restaurant.menu.map(item => <div className="menu-item" key={item.name}><div><h3>{item.name}</h3><p>{item.description}</p><strong>{formatPrice(item.price)}</strong></div><button className="add-button" onClick={() => onAdd(restaurant, item.name, item.price)} aria-label={`Thêm ${item.name} vào giỏ`}><Plus size={19} /></button></div>)}</div>
    <p className="dialog-footnote">Giá, nhà hàng và thực đơn chỉ dùng để minh họa. Không có đơn hàng thật.</p>
    {cartCount > 0 && <button className="button button-primary menu-cart-button" onClick={onCart}><ShoppingBag size={17} /> Xem giỏ hàng demo ({cartCount}) <ArrowRight size={17} /></button>}
  </Dialog>
}

function CartDialog({ items, onClose, onChange, onSubmit }: { items: CartItem[]; onClose: () => void; onChange: (key: string, delta: number) => void; onSubmit: () => void }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return <Dialog title="Giỏ hàng của bạn" onClose={onClose} className="cart-dialog"><p className="dialog-subtitle">Đơn hàng demo · Không thanh toán hoặc giao hàng thật</p>
    {items.length ? <><div className="cart-items">{items.map(item => <div className="cart-item" key={item.key}><div><strong>{item.name}</strong><small>{formatPrice(item.price)}</small></div><div className="quantity"><button onClick={() => onChange(item.key, -1)} aria-label={`Giảm ${item.name}`}><Minus size={15} /></button><span>{item.quantity}</span><button onClick={() => onChange(item.key, 1)} aria-label={`Tăng ${item.name}`}><Plus size={15} /></button></div></div>)}</div><div className="cart-total"><span>Tạm tính</span><strong>{formatPrice(total)}</strong></div><button className="button button-primary cart-checkout" onClick={onSubmit}>Xác nhận đơn demo <ArrowRight size={18} /></button></> : <div className="empty-cart"><ShoppingBag size={39} /><p>Giỏ hàng của bạn đang trống.</p></div>}
  </Dialog>
}

function InfoDialog({ kind, onClose, onLogin, userName }: { kind: InfoKind; onClose: () => void; onLogin: (name: string) => void; userName: string }) {
  const [name, setName] = useState('')
  const [detail, setDetail] = useState('')
  const [done, setDone] = useState(false)
  const isPartner = kind === 'restaurant-partner' || kind === 'driver-partner'
  const title = ({ login: 'Đăng nhập bản demo', 'restaurant-partner': 'Đăng ký nhà hàng', 'driver-partner': 'Đăng ký tài xế', contact: 'Liên hệ FoodGo', faq: 'Câu hỏi thường gặp', privacy: 'Chính sách bảo mật', terms: 'Điều khoản sử dụng', social: 'Kênh cộng đồng FoodGo' } as Record<InfoKind, string>)[kind]
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim() || (kind !== 'login' && !detail.trim())) return
    if (kind === 'login') { onLogin(name.trim()); onClose() } else setDone(true)
  }
  return <Dialog title={title} onClose={onClose}>
    {kind === 'login' && <>{userName ? <div className="info-copy"><CheckCircle2 /><p>Bạn đang dùng bản demo với tên <strong>{userName}</strong>. Tài khoản này chỉ tồn tại trong phiên hiện tại.</p></div> : <><p className="dialog-subtitle">Nhập tên để trải nghiệm giao diện cá nhân hóa. Không cần mật khẩu và không tạo tài khoản thật.</p><form className="simple-form" onSubmit={submit}><label htmlFor="demo-name">Tên của bạn</label><input id="demo-name" minLength={2} required value={name} onChange={e => setName(e.target.value)} placeholder="Ví dụ: An" /><button className="button button-primary" type="submit">Tiếp tục bản demo <ArrowRight size={17} /></button></form></>}</>}
    {(isPartner || kind === 'contact') && (done ? <div className="success-panel"><CheckCircle2 size={34} /><h3>Đã ghi nhận trong bản demo</h3><p>Thông tin chỉ được hiển thị trong phiên này và chưa gửi đến FoodGo. Khi dịch vụ chính thức hoạt động, mẫu đăng ký sẽ được kết nối.</p><button className="button button-outline" onClick={onClose}>Đóng</button></div> : <><p className="dialog-subtitle">Đây là biểu mẫu minh họa. Thông tin chưa được gửi đến hệ thống thật.</p><form className="simple-form" onSubmit={submit}><label htmlFor="contact-name">Họ và tên</label><input id="contact-name" required minLength={2} value={name} onChange={e => setName(e.target.value)} placeholder="Nhập tên của bạn" /><label htmlFor="contact-detail">{kind === 'contact' ? 'Nội dung liên hệ' : 'Số điện thoại liên hệ'}</label>{kind === 'contact' ? <textarea id="contact-detail" required minLength={5} value={detail} onChange={e => setDetail(e.target.value)} placeholder="Bạn cần FoodGo hỗ trợ điều gì?" /> : <input id="contact-detail" required pattern="[0-9+ .()-]{9,15}" value={detail} onChange={e => setDetail(e.target.value)} placeholder="Nhập số điện thoại" type="tel" />}<button className="button button-primary" type="submit">Gửi thông tin demo <ArrowRight size={17} /></button></form></>)}
    {kind === 'faq' && <div className="info-article"><h3>FoodGo đã nhận đơn hàng thật chưa?</h3><p>Chưa. Đây là bản demo giao diện. Nhà hàng, giá và đánh giá hiện là dữ liệu minh họa.</p><h3>Địa chỉ của tôi có được kiểm tra không?</h3><p>Chưa. Tìm kiếm địa chỉ mô phỏng luồng khám phá và chưa xác minh vùng giao hàng.</p><h3>Tôi có thể thanh toán không?</h3><p>Chưa. Giỏ hàng chỉ mô phỏng bước chọn món và xác nhận.</p></div>}
    {kind === 'privacy' && <div className="info-article"><p>Đây là bản demo FoodGo. Tên đăng nhập và nội dung biểu mẫu chỉ được xử lý trong phiên trình duyệt hiện tại. Website không gửi dữ liệu này tới máy chủ FoodGo.</p><p>Khi sản phẩm chính thức ra mắt, chính sách bảo mật đầy đủ sẽ được công bố tại đây.</p></div>}
    {kind === 'terms' && <div className="info-article"><p>FoodGo trên trang này là bản minh họa giao diện. Thông tin nhà hàng, đánh giá, giá, ưu đãi và thời gian giao hàng là dữ liệu mẫu; không cấu thành lời chào bán dịch vụ.</p><p>Không có đơn hàng, thanh toán, giao hàng hoặc đăng ký đối tác thật được tạo từ bản demo này.</p></div>}
    {kind === 'social' && <div className="info-article"><p>Các kênh cộng đồng chính thức của FoodGo sẽ được cập nhật khi sản phẩm ra mắt.</p><p>Trong thời gian này, bạn có thể dùng mục Liên hệ để trải nghiệm biểu mẫu demo.</p></div>}
  </Dialog>
}

function App() {
  const addressInput = useRef<HTMLInputElement>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [location, setLocation] = useState('')
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [info, setInfo] = useState<InfoKind | null>(null)
  const [userName, setUserName] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => { if (toast) { const timer = window.setTimeout(() => setToast(''), 3500); return () => window.clearTimeout(timer) } }, [toast])
  const explore = () => { setFilter('all'); goTo('nha-hang') }
  const order = () => { goTo('trang-chu'); window.setTimeout(() => addressInput.current?.focus(), 350) }
  const offers = () => { setFilter('offers'); goTo('nha-hang') }
  const selectCategory = (category: CategoryId) => { setFilter(category); goTo('nha-hang') }
  const addItem = (restaurant: Restaurant, name: string, price: number) => {
    const key = `${restaurant.id}:${name}`
    setCart(current => { const found = current.find(item => item.key === key); return found ? current.map(item => item.key === key ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { key, name, price, quantity: 1 }] })
    setToast(`Đã thêm ${name} vào giỏ hàng demo`)
  }
  const changeQuantity = (key: string, delta: number) => setCart(current => current.map(item => item.key === key ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0))
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const openCart = () => { setSelectedRestaurant(null); setCartOpen(true) }
  return <>
    <Navbar onOrder={order} onOffers={offers} onInfo={setInfo} userName={userName} />
    <main>
      <HeroSection inputRef={addressInput} onSearch={address => { setLocation(address); setFilter('all'); goTo('nha-hang') }} />
      <FoodCategories onSelect={selectCategory} />
      <FeaturedRestaurants filter={filter} setFilter={setFilter} location={location} onMenu={setSelectedRestaurant} />
      <HowItWorks />
      <BenefitsSection onExplore={() => goTo('cach-hoat-dong')} />
      <PartnerSection onInfo={setInfo} />
      <CallToAction onExplore={explore} />
    </main>
    <Footer onInfo={setInfo} onOffers={offers} onExplore={explore} />
    {cartCount > 0 && <button className="floating-cart" onClick={openCart} aria-label={`Mở giỏ hàng, ${cartCount} món`}><ShoppingBag size={20} /><span>Giỏ hàng</span><b>{cartCount}</b></button>}
    {toast && <div className="toast" role="status"><CheckCircle2 size={18} />{toast}{cartCount > 0 && <button onClick={openCart}>Xem giỏ</button>}</div>}
    {selectedRestaurant && <MenuDialog restaurant={selectedRestaurant} onClose={() => setSelectedRestaurant(null)} onAdd={addItem} cartCount={cartCount} onCart={openCart} />}
    {cartOpen && <CartDialog items={cart} onClose={() => setCartOpen(false)} onChange={changeQuantity} onSubmit={() => { setCart([]); setCartOpen(false); setToast('Đã hoàn tất đơn hàng mô phỏng. Không có đơn hàng thật được tạo.') }} />}
    {info && <InfoDialog kind={info} onClose={() => setInfo(null)} onLogin={setUserName} userName={userName} />}
  </>
}

export default App
