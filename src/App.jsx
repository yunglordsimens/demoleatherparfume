import { useState, useEffect, useMemo } from "react";

// ============ THEMES ============
const light = {
  bg: "#FAF8F4", bgAlt: "#FFFFFF", bgWarm: "#F0EBE2", bgCard: "#FFFFFF",
  text: "#1A1612", textSoft: "#6B635B", textMuted: "#A09A93", brown: "#3C2415",
  gold: "#C5A572", goldDim: "rgba(197,165,114,0.15)", border: "#E8E3DC",
  heroBg: "#1A1612", heroText: "#FFF", heroSub: "rgba(255,255,255,0.5)",
  footerBg: "#1A1612", footerText: "rgba(255,255,255,0.45)",
  inputBg: "#FFF", btnBg: "#1A1612", btnText: "#FFF",
};
const dark = {
  bg: "#121110", bgAlt: "#1C1917", bgWarm: "#1E1B17", bgCard: "#1E1B17",
  text: "#F0EBE3", textSoft: "#A09A93", textMuted: "#6B635B", brown: "#D4BC8E",
  gold: "#C5A572", goldDim: "rgba(197,165,114,0.2)", border: "#2E2A25",
  heroBg: "#0A0908", heroText: "#F0EBE3", heroSub: "rgba(240,235,227,0.4)",
  footerBg: "#0A0908", footerText: "rgba(240,235,227,0.4)",
  inputBg: "#252220", btnBg: "#C5A572", btnText: "#1A1612",
};

// ============ TRANSLATIONS ============
const translations = {
  EN: {
    shop: "Shop Now", wholesale: "Wholesale", cart: "Cart", add: "Add to Cart",
    search: "Search products...", all: "All", price: "Price", sort: "Sort",
    perfumes: "Perfumes", leather: "Leather Goods", gifts: "Gift Sets",
    about: "About", home: "Home", login: "Log In", logout: "Log Out",
    apply: "Apply for Wholesale", quick: "Quick Order", catalog: "Catalog",
    account: "My Account", priceList: "Price List", checkout: "Checkout",
    total: "Total", empty: "Your cart is empty", contShop: "Continue Shopping",
    partnerTitle: "Partner With Us",
    partnerDesc: "Access exclusive wholesale pricing and dedicated support.",
    accessTitle: "Wholesale Access",
    accessDesc: "Log in to view wholesale pricing.",
    noAcc: "New partner?", results: "products", prev: "Prev", next: "Next",
    notes: "Fragrance Notes", related: "You Might Also Like",
    delivery: "Delivery & Returns",
    delInfo: "CZ: 1-3 days, free over 2000 CZK. EU: 3-7 days, 14-day returns.",
    collections: "Collections", best: "Bestsellers", loved: "Most Loved",
    viewAll: "View All", explore: "Explore Our World",
    hero: "Where Scent Meets Craft",
    heroSub: "Curated fragrances and handcrafted leather goods.",
    forBiz: "For Business", bePartner: "Become a Wholesale Partner",
  },
  CZ: {
    shop: "Nakupovat", wholesale: "Velkoobchod", cart: "Kosik", add: "Do kosiku",
    search: "Hledat...", all: "Vse", price: "Cena", sort: "Radit",
    perfumes: "Parfemy", leather: "Kozene zbozi", gifts: "Darkove sady",
    about: "O nas", home: "Domu", login: "Prihlasit", logout: "Odhlasit",
    apply: "Zadost o velkoobchod", quick: "Rychla objednavka", catalog: "Katalog",
    account: "Ucet", priceList: "Cenik", checkout: "Objednat",
    total: "Celkem", empty: "Kosik je prazdny", contShop: "Pokracovat",
    partnerTitle: "Stante se partnerem",
    partnerDesc: "Exkluzivni velkoobchodni ceny a podpora.",
    accessTitle: "Velkoobchodni pristup",
    accessDesc: "Prihlaste se pro velkoobchodni ceny.",
    noAcc: "Novy partner?", results: "produktu", prev: "Zpet", next: "Dalsi",
    notes: "Slozeni vune", related: "Mohlo by se libit",
    delivery: "Doruceni a vraceni",
    delInfo: "CR: 1-3 dny, zdarma nad 2000 Kc. EU: 3-7 dni, vraceni 14 dni.",
    collections: "Kolekce", best: "Bestsellery", loved: "Nejoblibenejsi",
    viewAll: "Vse", explore: "Nas svet",
    hero: "Vune a remeslo",
    heroSub: "Vybrane parfemy a rucne vyrobene kozene zbozi.",
    forBiz: "Pro firmy", bePartner: "Stante se partnerem",
  },
  VN: {
    shop: "Mua sam", wholesale: "Ban si", cart: "Gio hang", add: "Them vao gio",
    search: "Tim kiem...", all: "Tat ca", price: "Gia", sort: "Sap xep",
    perfumes: "Nuoc hoa", leather: "Do da", gifts: "Qua tang",
    about: "Ve chung toi", home: "Trang chu", login: "Dang nhap", logout: "Dang xuat",
    apply: "Dang ky ban si", quick: "Dat nhanh", catalog: "Danh muc",
    account: "Tai khoan", priceList: "Bang gia", checkout: "Thanh toan",
    total: "Tong", empty: "Gio hang trong", contShop: "Tiep tuc",
    partnerTitle: "Tro thanh doi tac",
    partnerDesc: "Gia si va ho tro chuyen biet.",
    accessTitle: "Ban si",
    accessDesc: "Dang nhap de xem gia si.",
    noAcc: "Doi tac moi?", results: "san pham", prev: "Truoc", next: "Tiep",
    notes: "Thanh phan huong", related: "Co the ban thich",
    delivery: "Giao hang",
    delInfo: "Sec: 1-3 ngay. EU: 3-7 ngay.",
    collections: "Bo suu tap", best: "Ban chay", loved: "Yeu thich nhat",
    viewAll: "Xem tat ca", explore: "Kham pha",
    hero: "Huong thom va nghe thuat",
    heroSub: "Nuoc hoa chon loc va do da thu cong.",
    forBiz: "Doanh nghiep", bePartner: "Doi tac ban si",
  },
};

// ============ PRODUCTS ============
const perfumes = [
  { id: "p1", name: "Noir Sauvage", sub: "Inspired by Dior Sauvage", price: 890, wp: 445, moq: 24, cat: "perfume", type: "Men", notes: { Top: "Bergamot, Pepper", Heart: "Lavender, Geranium", Base: "Ambroxan, Cedar" } },
  { id: "p2", name: "Belle Eternelle", sub: "Inspired by La Vie Est Belle", price: 920, wp: 460, moq: 24, cat: "perfume", type: "Women", notes: { Top: "Black Currant, Pear", Heart: "Iris, Jasmine", Base: "Praline, Vanilla" } },
  { id: "p3", name: "Velvet Oud", sub: "Inspired by Tom Ford Oud Wood", price: 1150, wp: 575, moq: 12, cat: "perfume", type: "Unisex", notes: { Top: "Oud, Rosewood", Heart: "Cardamom, Sandalwood", Base: "Tonka Bean, Amber" } },
  { id: "p4", name: "Bleu Nuit", sub: "Inspired by Bleu de Chanel", price: 870, wp: 435, moq: 24, cat: "perfume", type: "Men", notes: { Top: "Citrus, Mint", Heart: "Ginger, Nutmeg", Base: "Cedar, Sandalwood" } },
  { id: "p5", name: "Rose Celeste", sub: "Inspired by Miss Dior", price: 940, wp: 470, moq: 24, cat: "perfume", type: "Women", notes: { Top: "Lily, Peony", Heart: "Rose, Iris", Base: "Musk, Wood" } },
  { id: "p6", name: "Amber Royale", sub: "Inspired by Baccarat Rouge 540", price: 1280, wp: 640, moq: 12, cat: "perfume", type: "Unisex", notes: { Top: "Saffron, Jasmine", Heart: "Amberwood", Base: "Fir Resin, Musk" } },
  { id: "p7", name: "Aventura", sub: "Inspired by Creed Aventus", price: 980, wp: 490, moq: 24, cat: "perfume", type: "Men", notes: { Top: "Pineapple, Bergamot", Heart: "Birch, Rose", Base: "Musk, Amber" } },
  { id: "p8", name: "Opium Noir", sub: "Inspired by YSL Black Opium", price: 910, wp: 455, moq: 24, cat: "perfume", type: "Women", notes: { Top: "Coffee, Pepper", Heart: "Jasmine, Orange", Base: "Vanilla, Cedar" } },
  { id: "p9", name: "Acqua Fresca", sub: "Inspired by Acqua di Gio", price: 850, wp: 425, moq: 24, cat: "perfume", type: "Men", notes: { Top: "Marine, Bergamot", Heart: "Rosemary", Base: "Cedar, Musk" } },
  { id: "p10", name: "Flora Dream", sub: "Inspired by Gucci Flora", price: 930, wp: 465, moq: 24, cat: "perfume", type: "Women", notes: { Top: "Peony, Citrus", Heart: "Rose", Base: "Patchouli" } },
  { id: "p11", name: "Tobacco Vanille", sub: "Inspired by Tom Ford", price: 1200, wp: 600, moq: 12, cat: "perfume", type: "Unisex", notes: { Top: "Tobacco, Spice", Heart: "Vanilla, Tonka", Base: "Cacao" } },
  { id: "p12", name: "Invictus Gold", sub: "Inspired by Paco Rabanne", price: 860, wp: 430, moq: 24, cat: "perfume", type: "Men", notes: { Top: "Grapefruit", Heart: "Laurel, Jasmine", Base: "Amber" } },
];

const leatherGoods = [
  { id: "l1", name: "Heritage Wallet", sub: "Full-grain bifold", price: 1450, wp: 725, moq: 20, cat: "leather", type: "Wallet" },
  { id: "l2", name: "Artisan Belt", sub: "Hand-stitched dress belt", price: 980, wp: 490, moq: 20, cat: "leather", type: "Belt" },
  { id: "l3", name: "Slim Cardholder", sub: "Minimalist 6-slot", price: 690, wp: 345, moq: 30, cat: "leather", type: "Cardholder" },
  { id: "l4", name: "Passport Case", sub: "Premium travel holder", price: 790, wp: 395, moq: 20, cat: "leather", type: "Accessory" },
  { id: "l5", name: "Executive Belt", sub: "Brushed gold buckle", price: 1120, wp: 560, moq: 20, cat: "leather", type: "Belt" },
  { id: "l6", name: "Classic Bifold", sub: "Timeless everyday wallet", price: 1250, wp: 625, moq: 20, cat: "leather", type: "Wallet" },
  { id: "l7", name: "Coin Purse", sub: "Zippered compact", price: 490, wp: 245, moq: 30, cat: "leather", type: "Accessory" },
  { id: "l8", name: "Wide Belt", sub: "Casual Saturday style", price: 880, wp: 440, moq: 20, cat: "leather", type: "Belt" },
  { id: "l9", name: "RFID Card Wallet", sub: "Secure blocking tech", price: 750, wp: 375, moq: 30, cat: "leather", type: "Cardholder" },
  { id: "l10", name: "Leather Keychain", sub: "Handcrafted key holder", price: 390, wp: 195, moq: 40, cat: "leather", type: "Accessory" },
];

const giftSets = [
  { id: "g1", name: "Gentleman's Edit", sub: "Perfume + Wallet", price: 2190, wp: 1095, moq: 10, cat: "gift", type: "Set" },
  { id: "g2", name: "Signature Set", sub: "Perfume + Cardholder", price: 1490, wp: 745, moq: 10, cat: "gift", type: "Set" },
  { id: "g3", name: "Date Night", sub: "Perfume + Belt", price: 1780, wp: 890, moq: 10, cat: "gift", type: "Set" },
  { id: "g4", name: "Business Class", sub: "Wallet + Belt", price: 2200, wp: 1100, moq: 10, cat: "gift", type: "Set" },
  { id: "g5", name: "VIP Gift Box", sub: "Premium Perfume + Wallet + Belt", price: 3400, wp: 1700, moq: 5, cat: "gift", type: "Set" },
];

const ALL = [...perfumes, ...leatherGoods, ...giftSets];
const PER_PAGE = 12;

// ============ PRODUCT IMAGE PLACEHOLDER ============
function ProductImage({ product }) {
  const idx = parseInt(product.id.replace(/\D/g, "")) || 1;
  const isP = product.cat === "perfume";
  const isL = product.cat === "leather";
  const hue = isP ? 32 + (idx % 6) * 4 : isL ? 20 + (idx % 5) * 3 : 30;
  const sat = isP ? 48 : isL ? 36 : 44;
  const lt = 86 - (idx % 4) * 2;

  return (
    <div style={{
      width: "100%", aspectRatio: "4/5", borderRadius: 8, overflow: "hidden",
      background: `linear-gradient(160deg, hsl(${hue},${sat}%,${lt}%) 0%, hsl(${hue},${sat - 10}%,${lt - 10}%) 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
    }}>
      {isP && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 8, height: 16, background: `hsl(${hue},25%,60%)`, borderRadius: "3px 3px 0 0" }} />
          <div style={{ width: 24, height: 8, background: `hsl(${hue},20%,55%)` }} />
          <div style={{
            width: 36, height: 60, borderRadius: "5px 5px 3px 3px",
            background: `linear-gradient(180deg, hsl(${hue + idx * 6},${sat}%,${68 - idx % 4 * 4}%) 0%, hsl(${hue},${sat - 8}%,55%) 100%)`,
          }} />
        </div>
      )}
      {isL && (
        <div style={{
          width: "54%", height: "40%", borderRadius: 5,
          background: `linear-gradient(135deg, hsl(${20 + idx * 4},38%,${32 + idx % 4 * 4}%) 0%, hsl(20,34%,22%) 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: "60%", height: 2, background: "rgba(255,255,255,0.15)" }} />
        </div>
      )}
      {product.cat === "gift" && (
        <div style={{
          width: "50%", height: "44%", borderRadius: 5, position: "relative",
          background: `linear-gradient(135deg, hsl(35,46%,60%) 0%, hsl(28,36%,46%) 100%)`,
        }}>
          <div style={{ position: "absolute", width: "100%", height: 2, background: "rgba(255,255,255,0.3)", top: "50%", left: 0 }} />
          <div style={{ position: "absolute", height: "100%", width: 2, background: "rgba(255,255,255,0.3)", left: "50%", top: 0 }} />
        </div>
      )}
      <span style={{
        position: "absolute", bottom: 8, fontSize: 8, letterSpacing: 2.5,
        textTransform: "uppercase", color: `hsl(${hue},16%,50%)`,
      }}>{product.cat}</span>
    </div>
  );
}

// ============ SVG ICONS ============
function CartIcon({ color, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
function ArrowIcon({ color, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function SearchIcon({ color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function LockIcon({ color, size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}
function DownloadIcon({ color, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

// ============ MAIN APP ============
export default function LeatherParfum() {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("EN");
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const T = theme === "light" ? light : dark;
  const t = translations[lang];

  function go(p) { setPage(p); }
  function goProduct(p) { setSelectedProduct(p); setPage("product"); }
  function addToCart(p) { setCart(function (prev) { return [...prev, p]; }); }

  useEffect(function () { window.scrollTo(0, 0); }, [page]);

  var flags = { EN: "\uD83C\uDDEC\uD83C\uDDE7", CZ: "\uD83C\uDDE8\uD83C\uDDFF", VN: "\uD83C\uDDFB\uD83C\uDDF3" };

  // ---- HEADER ----
  function Header() {
    var navItems = [
      { label: t.perfumes, pg: "perfumes" },
      { label: t.leather, pg: "leather" },
      { label: t.gifts, pg: "gifts" },
      { label: t.about, pg: "about" },
      { label: t.wholesale, pg: "wholesale" },
    ];

    return (
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: theme === "light" ? "rgba(250,248,244,0.96)" : "rgba(18,17,16,0.96)",
        backdropFilter: "blur(12px)", borderBottom: "1px solid " + T.border,
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "12px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <div onClick={function () { go("home"); }} style={{ cursor: "pointer" }}>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 3, color: T.brown }}>LEATHER PARFUM</div>
            <div style={{ fontSize: 7, letterSpacing: 4, color: T.gold, textTransform: "uppercase" }}>Fragrance & Craft</div>
          </div>

          <nav style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {navItems.map(function (n) {
              var active = page === n.pg;
              return (
                <button key={n.pg} onClick={function () { go(n.pg); }} style={{
                  fontSize: 12, fontWeight: active ? 800 : 500, letterSpacing: 1,
                  textTransform: "uppercase", cursor: "pointer",
                  background: active ? T.goldDim : "transparent",
                  color: active ? T.brown : T.textSoft,
                  border: "none", padding: "10px 14px", borderRadius: 6,
                }}>{n.pg === "wholesale" ? "\uD83C\uDFE2 " + n.label : n.label}</button>
              );
            })}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ display: "flex", gap: 3, background: T.bgAlt, borderRadius: 8, padding: 3, border: "1px solid " + T.border }}>
              {["EN", "CZ", "VN"].map(function (code) {
                return (
                  <button key={code} onClick={function () { setLang(code); }} style={{
                    fontSize: 20, padding: "8px 12px", border: "none", borderRadius: 6,
                    cursor: "pointer", background: lang === code ? T.gold : "transparent",
                    opacity: lang === code ? 1 : 0.5,
                  }}>{flags[code]}</button>
                );
              })}
            </div>

            <button onClick={function () { setTheme(theme === "light" ? "dark" : "light"); }} style={{
              background: T.bgAlt, border: "1px solid " + T.border, borderRadius: 8,
              padding: "10px 14px", cursor: "pointer", fontSize: 14,
            }}>{theme === "light" ? "\uD83C\uDF19" : "\u2600\uFE0F"}</button>

            <button onClick={function () { go("cart"); }} style={{
              background: T.bgAlt, border: "1px solid " + T.border, borderRadius: 8,
              padding: "10px 16px", cursor: "pointer", display: "flex", alignItems: "center",
              gap: 8, position: "relative", color: T.text, fontSize: 14, fontWeight: 700,
            }}>
              <CartIcon color={T.brown} size={20} />
              <span>{t.cart}</span>
              {cart.length > 0 && (
                <span style={{
                  background: T.gold, color: "#FFF", fontSize: 11, fontWeight: 900,
                  width: 22, height: 22, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "absolute", top: -8, right: -8,
                }}>{cart.length}</span>
              )}
            </button>
          </div>
        </div>
      </header>
    );
  }

  // ---- PRODUCT CARD ----
  function Card({ product, onClick, showWholesale }) {
    return (
      <div onClick={onClick} style={{ cursor: "pointer" }}>
        <ProductImage product={product} />
        <div style={{ paddingTop: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 2 }}>{product.name}</div>
          <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 6 }}>{product.sub}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 17, fontWeight: 800, color: T.brown }}>{product.price} CZK</span>
            {showWholesale && (
              <span style={{ fontSize: 11, fontWeight: 700, color: T.gold, background: T.goldDim, padding: "4px 10px", borderRadius: 4 }}>
                {t.wholesale}: {product.wp} CZK
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---- CATALOG ----
  function CatalogPage({ products, title, subtitle }) {
    var _search = useState("");
    var search = _search[0];
    var setSearch = _search[1];
    var _typeF = useState("All");
    var typeF = _typeF[0];
    var setTypeF = _typeF[1];
    var _sort = useState("name");
    var sort = _sort[0];
    var setSort = _sort[1];
    var _pg = useState(1);
    var pg = _pg[0];
    var setPg = _pg[1];

    var types = ["All"];
    products.forEach(function (p) {
      if (types.indexOf(p.type) === -1) types.push(p.type);
    });

    var filtered = useMemo(function () {
      var r = products.slice();
      if (search) {
        var s = search.toLowerCase();
        r = r.filter(function (p) { return p.name.toLowerCase().indexOf(s) !== -1 || p.sub.toLowerCase().indexOf(s) !== -1; });
      }
      if (typeF !== "All") r = r.filter(function (p) { return p.type === typeF; });
      if (sort === "pa") r.sort(function (a, b) { return a.price - b.price; });
      else if (sort === "pd") r.sort(function (a, b) { return b.price - a.price; });
      else r.sort(function (a, b) { return a.name.localeCompare(b.name); });
      return r;
    }, [products, search, typeF, sort]);

    var totalPages = Math.ceil(filtered.length / PER_PAGE);
    var paged = filtered.slice((pg - 1) * PER_PAGE, pg * PER_PAGE);

    useEffect(function () { setPg(1); }, [search, typeF, sort]);

    return (
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 20px 72px" }}>
        <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: T.gold, marginBottom: 4 }}>{subtitle}</p>
        <h1 style={{ fontSize: 32, fontWeight: 300, color: T.brown, marginBottom: 24 }}>{title}</h1>

        <div style={{
          display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center",
          padding: "14px 18px", background: T.bgAlt, borderRadius: 10, border: "1px solid " + T.border,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "1 1 180px" }}>
            <SearchIcon color={T.textMuted} />
            <input value={search} onChange={function (e) { setSearch(e.target.value); }}
              placeholder={t.search}
              style={{ fontSize: 14, padding: "10px 0", border: "none", background: "transparent", outline: "none", color: T.text, width: "100%" }} />
          </div>

          <div style={{ width: 1, height: 28, background: T.border }} />

          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {types.map(function (tp) {
              var active = typeF === tp;
              return (
                <button key={tp} onClick={function () { setTypeF(tp); }} style={{
                  fontSize: 13, fontWeight: active ? 800 : 500, padding: "10px 18px",
                  borderRadius: 6, cursor: "pointer",
                  background: active ? T.btnBg : "transparent",
                  color: active ? T.btnText : T.textSoft,
                  border: active ? "none" : "1px solid " + T.border,
                }}>{tp === "All" ? t.all : tp}</button>
              );
            })}
          </div>

          <div style={{ width: 1, height: 28, background: T.border }} />

          <select value={sort} onChange={function (e) { setSort(e.target.value); }} style={{
            fontSize: 13, padding: "10px 14px", borderRadius: 6,
            border: "1px solid " + T.border, background: T.inputBg, color: T.text,
            cursor: "pointer", fontWeight: 600,
          }}>
            <option value="name">{t.sort}: A-Z</option>
            <option value="pa">{t.price} low-high</option>
            <option value="pd">{t.price} high-low</option>
          </select>
        </div>

        <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 18, fontWeight: 600 }}>{filtered.length} {t.results}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 24 }}>
          {paged.map(function (p) {
            return <Card key={p.id} product={p} onClick={function () { goProduct(p); }} />;
          })}
        </div>

        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginTop: 44 }}>
            <button onClick={function () { setPg(Math.max(1, pg - 1)); }} disabled={pg === 1}
              style={{ padding: "12px 20px", borderRadius: 6, background: T.bgAlt, border: "1px solid " + T.border, color: T.text, fontSize: 14, fontWeight: 700, cursor: pg === 1 ? "default" : "pointer", opacity: pg === 1 ? 0.3 : 1 }}>
              {t.prev}
            </button>
            <span style={{ padding: "12px 18px", fontSize: 15, fontWeight: 700, color: T.brown, background: T.goldDim, borderRadius: 6 }}>{pg} / {totalPages}</span>
            <button onClick={function () { setPg(Math.min(totalPages, pg + 1)); }} disabled={pg === totalPages}
              style={{ padding: "12px 20px", borderRadius: 6, background: T.bgAlt, border: "1px solid " + T.border, color: T.text, fontSize: 14, fontWeight: 700, cursor: pg === totalPages ? "default" : "pointer", opacity: pg === totalPages ? 0.3 : 1 }}>
              {t.next}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ---- PRODUCT DETAIL ----
  function ProductDetail() {
    if (!selectedProduct) return null;
    var p = selectedProduct;
    var isP = p.cat === "perfume";
    var related = ALL.filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).slice(0, 4);

    return (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px 72px" }}>
        <p style={{ fontSize: 12, color: T.textMuted, marginBottom: 24 }}>
          <span onClick={function () { go("home"); }} style={{ cursor: "pointer", textDecoration: "underline" }}>{t.home}</span>
          {" / "}
          <span onClick={function () { go(p.cat === "perfume" ? "perfumes" : p.cat === "leather" ? "leather" : "gifts"); }}
            style={{ cursor: "pointer", textDecoration: "underline" }}>
            {p.cat === "perfume" ? t.perfumes : p.cat === "leather" ? t.leather : t.gifts}
          </span>
          {" / "}{p.name}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          <div style={{ maxWidth: 420 }}><ProductImage product={p} /></div>
          <div>
            <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: T.gold, marginBottom: 6 }}>{p.type}</p>
            <h1 style={{ fontSize: 30, fontWeight: 300, color: T.brown, marginBottom: 6 }}>{p.name}</h1>
            <p style={{ fontSize: 14, color: T.textMuted, marginBottom: 24 }}>{p.sub}</p>
            <p style={{ fontSize: 28, fontWeight: 800, color: T.text, marginBottom: 28 }}>{p.price} CZK</p>

            {isP && p.notes && (
              <div style={{ marginBottom: 28, padding: "20px 0", borderTop: "1px solid " + T.border, borderBottom: "1px solid " + T.border }}>
                <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: T.gold, marginBottom: 14 }}>{t.notes}</p>
                {Object.keys(p.notes).map(function (key) {
                  return (
                    <div key={key} style={{ display: "flex", gap: 14, marginBottom: 8 }}>
                      <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, minWidth: 48 }}>{key}</span>
                      <span style={{ fontSize: 14, color: T.text }}>{p.notes[key]}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <button onClick={function () { addToCart(p); }} style={{
              width: "100%", padding: "18px 32px", fontSize: 15, fontWeight: 700,
              letterSpacing: 1.2, textTransform: "uppercase", borderRadius: 6,
              background: T.btnBg, color: T.btnText, border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            }}>
              <CartIcon color={T.btnText} size={18} /> {t.add}
            </button>

            <div style={{ marginTop: 20, padding: "16px 0", borderTop: "1px solid " + T.border }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: T.textSoft, marginBottom: 6 }}>{t.delivery}</p>
              <p style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.8 }}>{t.delInfo}</p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h2 style={{ fontSize: 22, fontWeight: 300, color: T.brown, marginBottom: 24 }}>{t.related}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 20 }}>
              {related.map(function (r) {
                return <Card key={r.id} product={r} onClick={function () { setSelectedProduct(r); window.scrollTo(0, 0); }} />;
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---- WHOLESALE ----
  function WholesalePage() {
    var _li = useState(false);
    var loggedIn = _li[0];
    var setLoggedIn = _li[1];
    var _tab = useState("catalog");
    var tab = _tab[0];
    var setTab = _tab[1];

    if (!loggedIn) {
      return (
        <div>
          <section style={{ background: T.heroBg, padding: "64px 20px", textAlign: "center" }}>
            <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: T.gold, marginBottom: 14 }}>{t.wholesale}</p>
            <h1 style={{ fontSize: 36, fontWeight: 300, color: T.heroText, marginBottom: 16 }}>{t.partnerTitle}</h1>
            <p style={{ fontSize: 15, color: T.heroSub, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>{t.partnerDesc}</p>
          </section>

          <section style={{ maxWidth: 860, margin: "0 auto", padding: "48px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16 }}>
              {[
                { e: "\uD83D\uDCB0", title: "50% Off", desc: "Volume wholesale pricing" },
                { e: "\uD83D\uDCE6", title: "Low MOQ", desc: "Start with 10-24 units" },
                { e: "\uD83E\uDD1D", title: "Support", desc: "Personal account manager" },
                { e: "\uD83D\uDCF8", title: "Assets", desc: "Photos & POS materials" },
              ].map(function (b, i) {
                return (
                  <div key={i} style={{ padding: 28, background: T.bgCard, borderRadius: 8, border: "1px solid " + T.border, textAlign: "center" }}>
                    <div style={{ fontSize: 32, marginBottom: 10 }}>{b.e}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: T.brown, marginBottom: 6 }}>{b.title}</div>
                    <div style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.6 }}>{b.desc}</div>
                  </div>
                );
              })}
            </div>
          </section>

          <section style={{ maxWidth: 400, margin: "0 auto", padding: "0 20px 64px" }}>
            <div style={{ padding: 40, background: T.bgCard, border: "1px solid " + T.border, borderRadius: 10, textAlign: "center" }}>
              <LockIcon color={T.gold} />
              <h3 style={{ fontSize: 20, fontWeight: 300, color: T.brown, marginTop: 14, marginBottom: 6 }}>{t.accessTitle}</h3>
              <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 24 }}>{t.accessDesc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                <input placeholder="Email" style={{ fontSize: 15, padding: "14px 16px", border: "1.5px solid " + T.border, borderRadius: 6, background: T.inputBg, color: T.text, outline: "none" }} />
                <input placeholder="Password" type="password" style={{ fontSize: 15, padding: "14px 16px", border: "1.5px solid " + T.border, borderRadius: 6, background: T.inputBg, color: T.text, outline: "none" }} />
              </div>
              <button onClick={function () { setLoggedIn(true); }} style={{
                width: "100%", padding: "16px", fontSize: 15, fontWeight: 700,
                letterSpacing: 1.2, textTransform: "uppercase", borderRadius: 6,
                background: T.btnBg, color: T.btnText, border: "none", cursor: "pointer",
              }}>{t.login}</button>
              <p style={{ fontSize: 13, color: T.textMuted, marginTop: 18 }}>
                {t.noAcc}{" "}
                <span style={{ color: T.gold, cursor: "pointer", textDecoration: "underline", fontWeight: 700 }}>{t.apply}</span>
              </p>
            </div>
          </section>
        </div>
      );
    }

    return (
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px 72px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, paddingBottom: 16, borderBottom: "1px solid " + T.border, flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: T.gold }}>Wholesale Portal</p>
            <h1 style={{ fontSize: 26, fontWeight: 300, color: T.brown }}>Welcome, Partner</h1>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={function () { alert("Demo: PDF download"); }} style={{
              padding: "12px 24px", borderRadius: 6, border: "1.5px solid " + T.text,
              background: "transparent", color: T.text, cursor: "pointer", fontSize: 13,
              fontWeight: 700, display: "flex", alignItems: "center", gap: 8,
            }}><DownloadIcon color={T.text} /> {t.priceList}</button>
            <button onClick={function () { setLoggedIn(false); }} style={{
              padding: "12px 20px", background: "transparent", border: "none",
              color: T.gold, cursor: "pointer", fontSize: 13, fontWeight: 700,
            }}>{t.logout}</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
          {[
            { k: "catalog", l: "\uD83D\uDCCB " + t.catalog },
            { k: "quick", l: "\u26A1 " + t.quick },
            { k: "account", l: "\uD83D\uDC64 " + t.account },
          ].map(function (tb) {
            var active = tab === tb.k;
            return (
              <button key={tb.k} onClick={function () { setTab(tb.k); }} style={{
                fontSize: 14, fontWeight: active ? 800 : 500, padding: "12px 22px",
                borderRadius: 6, cursor: "pointer",
                background: active ? T.goldDim : "transparent",
                color: active ? T.brown : T.textMuted,
                border: active ? "2px solid " + T.gold : "1px solid " + T.border,
              }}>{tb.l}</button>
            );
          })}
        </div>

        {tab === "catalog" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 20 }}>
            {ALL.map(function (p) {
              return <Card key={p.id} product={p} showWholesale onClick={function () { goProduct(p); }} />;
            })}
          </div>
        )}

        {tab === "quick" && (
          <div>
            <div style={{ border: "1px solid " + T.border, borderRadius: 8, overflow: "hidden" }}>
              <div style={{
                display: "grid", gridTemplateColumns: "2fr 80px 1fr 90px 70px",
                padding: "10px 16px", background: T.bgWarm, fontSize: 11,
                letterSpacing: 1.5, textTransform: "uppercase", color: T.textMuted, fontWeight: 700,
              }}>
                <span>Product</span><span>MOQ</span><span>{t.price}</span><span>Qty</span><span></span>
              </div>
              {ALL.slice(0, 10).map(function (p, i) {
                return (
                  <div key={p.id} style={{
                    display: "grid", gridTemplateColumns: "2fr 80px 1fr 90px 70px",
                    padding: "12px 16px", alignItems: "center",
                    borderTop: "1px solid " + T.border,
                    background: i % 2 === 0 ? T.bgCard : T.bg,
                  }}>
                    <span style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>{p.name}</span>
                    <span style={{ fontSize: 13, color: T.textMuted }}>{p.moq}</span>
                    <span style={{ fontSize: 13, color: T.brown, fontWeight: 700 }}>{p.wp} CZK</span>
                    <input type="number" min={0} placeholder="0" style={{
                      fontSize: 14, padding: "10px", width: 70,
                      border: "1.5px solid " + T.border, borderRadius: 6,
                      background: T.inputBg, color: T.text, outline: "none",
                    }} />
                    <button style={{
                      fontSize: 12, fontWeight: 800, padding: "10px 12px",
                      background: T.gold, color: "#FFF", border: "none",
                      borderRadius: 6, cursor: "pointer",
                    }}>Add</button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "account" && (
          <div style={{ maxWidth: 460, padding: 28, background: T.bgCard, border: "1px solid " + T.border, borderRadius: 8 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: T.brown, marginBottom: 16 }}>{t.account}</h3>
            {[
              { l: "Company", v: "Demo Retail s.r.o." },
              { l: "Contact", v: "partner@demo.cz" },
              { l: "Status", v: "Approved" },
              { l: "Payment", v: "Net 14 / Bank Transfer" },
            ].map(function (r, i) {
              return (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid " + T.border }}>
                  <span style={{ fontSize: 13, color: T.textMuted }}>{r.l}</span>
                  <span style={{ fontSize: 13, color: T.text, fontWeight: 700 }}>{r.v}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ---- CART ----
  function CartPage() {
    var total = cart.reduce(function (s, i) { return s + i.price; }, 0);
    return (
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "36px 20px 72px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 300, color: T.brown, marginBottom: 28 }}>{t.cart}</h1>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <p style={{ fontSize: 16, color: T.textMuted, marginBottom: 20 }}>{t.empty}</p>
            <button onClick={function () { go("perfumes"); }} style={{
              padding: "16px 32px", fontSize: 14, fontWeight: 700, letterSpacing: 1.2,
              textTransform: "uppercase", borderRadius: 6, background: T.btnBg,
              color: T.btnText, border: "none", cursor: "pointer",
            }}>{t.contShop}</button>
          </div>
        ) : (
          <div>
            {cart.map(function (item, i) {
              return (
                <div key={i} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: "1px solid " + T.border, alignItems: "center" }}>
                  <div style={{ width: 60, flexShrink: 0 }}><ProductImage product={item} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: T.textMuted }}>{item.sub}</div>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 800, color: T.brown }}>{item.price} CZK</span>
                </div>
              );
            })}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0" }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: T.text }}>{t.total}: {total} CZK</span>
              <button style={{
                padding: "16px 32px", fontSize: 14, fontWeight: 700, letterSpacing: 1.2,
                textTransform: "uppercase", borderRadius: 6, background: T.btnBg,
                color: T.btnText, border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 10,
              }}>{t.checkout} <ArrowIcon color={T.btnText} /></button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---- HOME ----
  function HomePage() {
    return (
      <div>
        <section style={{
          background: T.heroBg, minHeight: 440, display: "flex", alignItems: "center",
          justifyContent: "center", textAlign: "center",
        }}>
          <div style={{ padding: "56px 24px", maxWidth: 600 }}>
            <p style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: T.gold, marginBottom: 22 }}>Fragrance & Leather Craft</p>
            <h1 style={{ fontSize: 44, fontWeight: 300, color: T.heroText, lineHeight: 1.15, marginBottom: 18 }}>{t.hero}</h1>
            <p style={{ fontSize: 15, color: T.heroSub, lineHeight: 1.7, marginBottom: 36 }}>{t.heroSub}</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={function () { go("perfumes"); }} style={{
                padding: "18px 36px", fontSize: 15, fontWeight: 700, letterSpacing: 1.2,
                textTransform: "uppercase", borderRadius: 6, background: T.gold,
                color: "#FFF", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 10,
              }}>{t.shop} <ArrowIcon color="#FFF" /></button>
              <button onClick={function () { go("wholesale"); }} style={{
                padding: "16px 32px", fontSize: 13, fontWeight: 700, letterSpacing: 1.2,
                textTransform: "uppercase", borderRadius: 6, background: "transparent",
                color: T.gold, border: "1.5px solid rgba(255,255,255,0.2)", cursor: "pointer",
              }}>{"\uD83C\uDFE2"} {t.wholesale}</button>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 20px" }}>
          <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: T.gold, marginBottom: 8, textAlign: "center" }}>{t.collections}</p>
          <h2 style={{ fontSize: 28, fontWeight: 300, color: T.brown, textAlign: "center", marginBottom: 36 }}>{t.explore}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { label: t.perfumes, count: perfumes.length, pg: "perfumes", hue: 35 },
              { label: t.leather, count: leatherGoods.length, pg: "leather", hue: 22 },
              { label: t.gifts, count: giftSets.length, pg: "gifts", hue: 30 },
            ].map(function (col, i) {
              var bgColor = theme === "light"
                ? "linear-gradient(165deg, hsl(" + col.hue + ",36%,86%), hsl(" + col.hue + ",30%,78%))"
                : "linear-gradient(165deg, hsl(" + col.hue + ",22%,16%), hsl(" + col.hue + ",18%,12%))";
              return (
                <div key={i} onClick={function () { go(col.pg); }} style={{
                  background: bgColor, borderRadius: 10, padding: "44px 28px",
                  cursor: "pointer", minHeight: 200, display: "flex",
                  flexDirection: "column", justifyContent: "flex-end",
                  border: "1px solid " + T.border,
                }}>
                  <span style={{ fontSize: 26, fontWeight: 300, color: T.brown, marginBottom: 4 }}>{col.label}</span>
                  <span style={{ fontSize: 13, color: T.textMuted, fontWeight: 600 }}>{col.count} {t.results}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section style={{ background: T.bgAlt, padding: "64px 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
            <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: T.gold, marginBottom: 4 }}>{t.best}</p>
            <h2 style={{ fontSize: 24, fontWeight: 300, color: T.brown, marginBottom: 28 }}>{t.loved}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
              {[perfumes[0], perfumes[1], perfumes[5], leatherGoods[0]].map(function (p) {
                return <Card key={p.id} product={p} onClick={function () { goProduct(p); }} />;
              })}
            </div>
          </div>
        </section>

        <section style={{ background: T.heroBg, padding: "52px 20px", textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: T.gold, marginBottom: 12 }}>{t.forBiz}</p>
          <h2 style={{ fontSize: 24, fontWeight: 300, color: T.heroText, marginBottom: 12 }}>{t.bePartner}</h2>
          <p style={{ fontSize: 14, color: T.heroSub, marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" }}>{t.partnerDesc}</p>
          <button onClick={function () { go("wholesale"); }} style={{
            padding: "16px 32px", fontSize: 14, fontWeight: 700, letterSpacing: 1.2,
            textTransform: "uppercase", borderRadius: 6, background: T.gold,
            color: "#FFF", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 10, margin: "0 auto",
          }}>{t.apply} <ArrowIcon color="#FFF" /></button>
        </section>
      </div>
    );
  }

  // ---- ABOUT ----
  function AboutPage() {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "48px 20px 72px" }}>
        <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: T.gold, marginBottom: 10 }}>{t.about}</p>
        <h1 style={{ fontSize: 30, fontWeight: 300, color: T.brown, marginBottom: 20 }}>Leather Parfum</h1>
        <p style={{ fontSize: 15, color: T.textSoft, lineHeight: 1.9, marginBottom: 16 }}>
          Born from a simple belief: premium quality does not require a premium price. Based in Prague, we curate inspired fragrances and partner with skilled leather artisans.
        </p>
        <p style={{ fontSize: 15, color: T.textSoft, lineHeight: 1.9 }}>
          We serve both individual customers and business partners through our wholesale program. Quality you can trust.
        </p>
      </div>
    );
  }

  // ---- FOOTER ----
  function Footer() {
    return (
      <footer style={{ background: T.footerBg, padding: "48px 20px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 28, marginBottom: 36 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: 2, color: T.gold }}>LEATHER PARFUM</div>
              <p style={{ fontSize: 12, color: T.footerText, marginTop: 8 }}>Prague, Czech Republic</p>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: T.gold, marginBottom: 12, fontWeight: 700 }}>{t.shop}</div>
              <p style={{ fontSize: 13, color: T.footerText, marginBottom: 7, cursor: "pointer" }} onClick={function () { go("perfumes"); }}>{t.perfumes}</p>
              <p style={{ fontSize: 13, color: T.footerText, marginBottom: 7, cursor: "pointer" }} onClick={function () { go("leather"); }}>{t.leather}</p>
              <p style={{ fontSize: 13, color: T.footerText, marginBottom: 7, cursor: "pointer" }} onClick={function () { go("gifts"); }}>{t.gifts}</p>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: T.gold, marginBottom: 12, fontWeight: 700 }}>Info</div>
              <p style={{ fontSize: 13, color: T.footerText, marginBottom: 7, cursor: "pointer" }} onClick={function () { go("about"); }}>{t.about}</p>
              <p style={{ fontSize: 13, color: T.footerText, marginBottom: 7, cursor: "pointer" }} onClick={function () { go("wholesale"); }}>{t.wholesale}</p>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: T.gold, marginBottom: 12, fontWeight: 700 }}>Contact</div>
              <p style={{ fontSize: 13, color: T.footerText, marginBottom: 7 }}>info@leatherparfum.cz</p>
              <p style={{ fontSize: 13, color: T.footerText }}>+420 000 000 000</p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <p style={{ fontSize: 11, color: T.footerText }}>2025 Leather Parfum</p>
            <div style={{ display: "flex", gap: 10 }}>
              {["EN", "CZ", "VN"].map(function (code) {
                return (
                  <button key={code} onClick={function () { setLang(code); }} style={{
                    fontSize: 18, background: "none", border: "none", cursor: "pointer",
                    opacity: lang === code ? 1 : 0.35,
                  }}>{flags[code]}</button>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // ---- RENDER ----
  function renderPage() {
    switch (page) {
      case "home": return <HomePage />;
      case "perfumes": return <CatalogPage products={perfumes} title={t.perfumes} subtitle="ONLYYOU - ChatDor" />;
      case "leather": return <CatalogPage products={leatherGoods} title={t.leather} subtitle="Wild Things Only" />;
      case "gifts": return <CatalogPage products={giftSets} title={t.gifts} subtitle="Curated Bundles" />;
      case "product": return <ProductDetail />;
      case "wholesale": return <WholesalePage />;
      case "cart": return <CartPage />;
      case "about": return <AboutPage />;
      default: return <HomePage />;
    }
  }

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      background: T.bg, minHeight: "100vh", color: T.text,
      transition: "background 0.3s, color 0.3s",
    }}>
      <Header />
      {renderPage()}
      <Footer />
    </div>
  );
}
