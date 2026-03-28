import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import FilterSidebar from '../../components/collections/FilterSidebar';
import ProductGrid from '../../components/collections/ProductGrid';
import '../../styles/collections/AllProductsPage.css';

// ─────────────────────────────────────────────────────────────────────────────
// ALL_PRODUCTS — category field MUST exactly match subcategory names in
// Category.jsx so that ?category=... filtering works correctly.
// Replace img paths and product details with your real data.
// ─────────────────────────────────────────────────────────────────────────────
const ALL_PRODUCTS = [
  // ── Occasion & Daily Wear ──────────────────────────────────────────────────
  { id: 1,  name: 'Floral Birthday Gown',       age: '3-6Y',  category: 'Birthday Party Frocks',              stars: 5, reviews: 24, price: '₹1199', oldPrice: '₹1599', img: '/images/collections/Little Girls.jpg', badge: 'Hot' },
  { id: 2,  name: 'Sparkle Birthday Frock',      age: '0-2Y',  category: 'Birthday Party Frocks',              stars: 4, reviews: 18, price: '₹899',  oldPrice: null,     img: '/images/collections/Infant.webp' },
  { id: 3,  name: 'Silk Wedding Frock',          age: '3-6Y',  category: 'Wedding / Festive Frocks',           stars: 5, reviews: 31, price: '₹1799', oldPrice: '₹2299', img: '/images/collections/Little Girls.jpg', badge: 'New' },
  { id: 4,  name: 'Zari Festive Dress',          age: '6-12Y', category: 'Wedding / Festive Frocks',           stars: 4, reviews: 12, price: '₹1499', oldPrice: null,     img: '/images/collections/Kids.webp' },
  { id: 5,  name: 'Evening Shimmer Gown',        age: '6-12Y', category: 'Reception / Evening Wear',           stars: 5, reviews: 19, price: '₹2099', oldPrice: '₹2699', img: '/images/collections/Pre-Teen.webp', badge: 'Sale' },
  { id: 6,  name: 'Tulle Reception Dress',       age: '3-6Y',  category: 'Reception / Evening Wear',           stars: 4, reviews: 9,  price: '₹1349', oldPrice: null,     img: '/images/collections/Toddler.webp' },
  { id: 7,  name: 'Puff Sleeve Photo Frock',     age: '0-2Y',  category: 'Photoshoot Special Frocks',          stars: 5, reviews: 27, price: '₹999',  oldPrice: '₹1299', img: '/images/collections/newborn.avif', badge: 'Best' },
  { id: 8,  name: 'Lace Photoshoot Dress',       age: '3-6Y',  category: 'Photoshoot Special Frocks',          stars: 4, reviews: 14, price: '₹1099', oldPrice: null,     img: '/images/collections/Little Girls.jpg' },
  { id: 9,  name: 'Princess Tutu Dress',         age: '0-2Y',  category: 'Princess / Fancy Dress',             stars: 5, reviews: 33, price: '₹1249', oldPrice: '₹1799', img: '/images/collections/Infant.webp', badge: 'Hot' },
  { id: 10, name: 'Fairy Wing Fancy Dress',      age: '3-6Y',  category: 'Princess / Fancy Dress',             stars: 4, reviews: 11, price: '₹849',  oldPrice: null,     img: '/images/collections/Toddler.webp' },
  { id: 11, name: 'Soft Cotton Frock',           age: '0-2Y',  category: 'Casual Cotton Frocks',               stars: 4, reviews: 16, price: '₹549',  oldPrice: null,     img: '/images/collections/newborn.avif' },
  { id: 12, name: 'Printed Cotton Dress',        age: '3-6Y',  category: 'Casual Cotton Frocks',               stars: 4, reviews: 21, price: '₹649',  oldPrice: '₹849',  img: '/images/collections/Toddler.webp', badge: 'Sale' },
  { id: 13, name: 'Ruffle Play Frock',           age: '0-2Y',  category: 'Playtime Frocks',                    stars: 4, reviews: 8,  price: '₹499',  oldPrice: null,     img: '/images/collections/Infant.webp' },
  { id: 14, name: 'Denim Playwear Dress',        age: '3-6Y',  category: 'Playtime Frocks',                    stars: 4, reviews: 13, price: '₹749',  oldPrice: null,     img: '/images/collections/Little Girls.jpg' },
  { id: 15, name: 'Check School Frock',          age: '6-12Y', category: 'School Casual Frocks',               stars: 3, reviews: 9,  price: '₹699',  oldPrice: null,     img: '/images/collections/Kids.webp' },
  { id: 16, name: 'Solid Casual School Dress',   age: '3-6Y',  category: 'School Casual Frocks',               stars: 4, reviews: 17, price: '₹599',  oldPrice: '₹799',  img: '/images/collections/Toddler.webp', badge: 'Sale' },
  { id: 17, name: 'Breezy Floral Sundress',      age: '3-6Y',  category: 'Summer Wear Frocks',                 stars: 5, reviews: 22, price: '₹699',  oldPrice: null,     img: '/images/collections/Little Girls.jpg' },
  { id: 18, name: 'Cotton Sleeveless Dress',     age: '6-12Y', category: 'Summer Wear Frocks',                 stars: 4, reviews: 10, price: '₹749',  oldPrice: null,     img: '/images/collections/Pre-Teen.webp' },
  { id: 19, name: 'Comfy Lounge Dress',          age: '0-2Y',  category: 'Comfortable Home Wear',              stars: 4, reviews: 15, price: '₹449',  oldPrice: null,     img: '/images/collections/newborn.avif' },
  { id: 20, name: 'Soft Jersey Home Frock',      age: '3-6Y',  category: 'Comfortable Home Wear',              stars: 4, reviews: 7,  price: '₹499',  oldPrice: null,     img: '/images/collections/Toddler.webp' },

  // ── Party Wear ─────────────────────────────────────────────────────────────
  { id: 21, name: 'Layered Net Party Frock',     age: '3-6Y',  category: 'Net Frocks',                         stars: 5, reviews: 29, price: '₹1099', oldPrice: '₹1499', img: '/images/collections/Little Girls.jpg', badge: 'Hot' },
  { id: 22, name: 'Net Ruffle Dress',            age: '6-12Y', category: 'Net Frocks',                         stars: 4, reviews: 14, price: '₹1199', oldPrice: null,     img: '/images/collections/Kids.webp' },
  { id: 23, name: 'Cinderella Gown',             age: '3-6Y',  category: 'Gown Style Frocks',                  stars: 5, reviews: 38, price: '₹1599', oldPrice: '₹2099', img: '/images/collections/Toddler.webp', badge: 'Best' },
  { id: 24, name: 'Ball Gown Dress',             age: '6-12Y', category: 'Gown Style Frocks',                  stars: 5, reviews: 21, price: '₹1899', oldPrice: null,     img: '/images/collections/Pre-Teen.webp' },
  { id: 25, name: 'Frill Layer Party Frock',     age: '0-2Y',  category: 'Layered / Frill Frocks',             stars: 4, reviews: 17, price: '₹899',  oldPrice: '₹1199', img: '/images/collections/Infant.webp', badge: 'Sale' },
  { id: 26, name: 'Tiered Ruffle Dress',         age: '3-6Y',  category: 'Layered / Frill Frocks',             stars: 4, reviews: 12, price: '₹1049', oldPrice: null,     img: '/images/collections/Little Girls.jpg' },
  { id: 27, name: 'Sequin Shimmer Frock',        age: '6-12Y', category: 'Sequin / Glitter Frocks',            stars: 5, reviews: 26, price: '₹1699', oldPrice: '₹2199', img: '/images/collections/Pre-Teen.webp', badge: 'New' },
  { id: 28, name: 'Glitter Star Dress',          age: '3-6Y',  category: 'Sequin / Glitter Frocks',            stars: 4, reviews: 9,  price: '₹1299', oldPrice: null,     img: '/images/collections/Toddler.webp' },
  { id: 29, name: 'Designer Party Gown',         age: '6-12Y', category: 'Designer Party Wear',                stars: 5, reviews: 34, price: '₹2299', oldPrice: '₹2999', img: '/images/collections/Kids.webp', badge: 'Hot' },
  { id: 30, name: 'Boutique Party Dress',        age: '3-6Y',  category: 'Designer Party Wear',                stars: 4, reviews: 18, price: '₹1799', oldPrice: null,     img: '/images/collections/Little Girls.jpg' },

  // ── Designer & Premium ─────────────────────────────────────────────────────
  { id: 31, name: 'Hand Embroidered Frock',      age: '3-6Y',  category: 'Boutique Designer Frocks',           stars: 5, reviews: 22, price: '₹2499', oldPrice: '₹2999', img: '/images/collections/Little Girls.jpg', badge: 'New' },
  { id: 32, name: 'Boutique Floral Dress',       age: '6-12Y', category: 'Boutique Designer Frocks',           stars: 4, reviews: 11, price: '₹1999', oldPrice: null,     img: '/images/collections/Kids.webp' },
  { id: 33, name: 'Zardozi Work Frock',          age: '6-12Y', category: 'Handwork / Embroidery Frocks',       stars: 5, reviews: 19, price: '₹2799', oldPrice: '₹3499', img: '/images/collections/Pre-Teen.webp', badge: 'Hot' },
  { id: 34, name: 'Mirror Work Dress',           age: '3-6Y',  category: 'Handwork / Embroidery Frocks',       stars: 4, reviews: 14, price: '₹1899', oldPrice: null,     img: '/images/collections/Toddler.webp' },
  { id: 35, name: 'Custom Bridal Frock',         age: '3-6Y',  category: 'Custom Made Frocks',                 stars: 5, reviews: 8,  price: '₹3499', oldPrice: null,     img: '/images/collections/Little Girls.jpg' },
  { id: 36, name: 'Tailor Made Party Dress',     age: '6-12Y', category: 'Custom Made Frocks',                 stars: 4, reviews: 6,  price: '₹2999', oldPrice: null,     img: '/images/collections/Kids.webp' },
  { id: 37, name: 'Premium Silk Gown',           age: '6-12Y', category: 'Luxury Collection',                  stars: 5, reviews: 16, price: '₹3999', oldPrice: '₹4999', img: '/images/collections/Pre-Teen.webp', badge: 'New' },
  { id: 38, name: 'Gold Embossed Dress',         age: '3-6Y',  category: 'Luxury Collection',                  stars: 5, reviews: 10, price: '₹3499', oldPrice: null,     img: '/images/collections/Little Girls.jpg' },

  // ── Traditional & Ethnic ───────────────────────────────────────────────────
  { id: 39, name: 'Kanchipuram Silk Frock',      age: '3-6Y',  category: 'Pattu / Silk Frocks',                stars: 5, reviews: 41, price: '₹2199', oldPrice: '₹2799', img: '/images/collections/Little Girls.jpg', badge: 'Best' },
  { id: 40, name: 'Pattu Pavadai',               age: '0-2Y',  category: 'Pattu / Silk Frocks',                stars: 5, reviews: 28, price: '₹1699', oldPrice: null,     img: '/images/collections/Infant.webp' },
  { id: 41, name: 'Lehenga Frock Set',           age: '3-6Y',  category: 'Lehenga Style Frocks',               stars: 5, reviews: 33, price: '₹1899', oldPrice: '₹2399', img: '/images/collections/Toddler.webp', badge: 'Hot' },
  { id: 42, name: 'Bridal Lehenga Dress',        age: '6-12Y', category: 'Lehenga Style Frocks',               stars: 4, reviews: 19, price: '₹2299', oldPrice: null,     img: '/images/collections/Kids.webp' },
  { id: 43, name: 'Anarkali Suit Dress',         age: '6-12Y', category: 'Anarkali Frocks',                    stars: 5, reviews: 27, price: '₹1799', oldPrice: '₹2299', img: '/images/collections/Pre-Teen.webp', badge: 'New' },
  { id: 44, name: 'Flared Anarkali Frock',       age: '3-6Y',  category: 'Anarkali Frocks',                    stars: 4, reviews: 15, price: '₹1499', oldPrice: null,     img: '/images/collections/Little Girls.jpg' },
  { id: 45, name: 'Indo Western Kurti Dress',    age: '6-12Y', category: 'Indo-Western Styles',                stars: 4, reviews: 22, price: '₹1299', oldPrice: null,     img: '/images/collections/Kids.webp' },
  { id: 46, name: 'Crop Top Skirt Set',          age: '3-6Y',  category: 'Indo-Western Styles',                stars: 4, reviews: 13, price: '₹1099', oldPrice: '₹1399', img: '/images/collections/Toddler.webp', badge: 'Sale' },
  { id: 47, name: 'Diwali Special Pavadai',      age: '0-2Y',  category: 'Festival Special (Diwali, Navratri, etc.)', stars: 5, reviews: 36, price: '₹1599', oldPrice: '₹1999', img: '/images/collections/Infant.webp', badge: 'Hot' },
  { id: 48, name: 'Navratri Chaniya Dress',      age: '3-6Y',  category: 'Festival Special (Diwali, Navratri, etc.)', stars: 5, reviews: 24, price: '₹1399', oldPrice: null,     img: '/images/collections/Little Girls.jpg' },

  // ── Fabric-Based ───────────────────────────────────────────────────────────
  { id: 49, name: 'Pure Cotton Summer Frock',    age: '0-2Y',  category: 'Cotton Frocks',                      stars: 4, reviews: 19, price: '₹549',  oldPrice: null,     img: '/images/collections/newborn.avif' },
  { id: 50, name: 'Block Print Cotton Dress',    age: '3-6Y',  category: 'Cotton Frocks',                      stars: 4, reviews: 14, price: '₹649',  oldPrice: '₹849',  img: '/images/collections/Toddler.webp', badge: 'Sale' },
  { id: 51, name: 'Net Overlay Party Frock',     age: '3-6Y',  category: 'Net Frocks',                         stars: 5, reviews: 23, price: '₹1149', oldPrice: '₹1499', img: '/images/collections/Little Girls.jpg' },
  { id: 52, name: 'Double Layer Net Dress',      age: '6-12Y', category: 'Net Frocks',                         stars: 4, reviews: 11, price: '₹1249', oldPrice: null,     img: '/images/collections/Kids.webp' },
  { id: 53, name: 'Satin Bow Dress',             age: '3-6Y',  category: 'Satin Frocks',                       stars: 5, reviews: 17, price: '₹1299', oldPrice: '₹1699', img: '/images/collections/Toddler.webp', badge: 'New' },
  { id: 54, name: 'Shiny Satin Party Frock',     age: '6-12Y', category: 'Satin Frocks',                       stars: 4, reviews: 9,  price: '₹1399', oldPrice: null,     img: '/images/collections/Pre-Teen.webp' },
  { id: 55, name: 'Pure Silk Ethnic Dress',      age: '3-6Y',  category: 'Silk Frocks',                        stars: 5, reviews: 31, price: '₹1999', oldPrice: '₹2499', img: '/images/collections/Little Girls.jpg', badge: 'Best' },
  { id: 56, name: 'Silk Embroidered Frock',      age: '6-12Y', category: 'Silk Frocks',                        stars: 4, reviews: 16, price: '₹2199', oldPrice: null,     img: '/images/collections/Kids.webp' },
  { id: 57, name: 'Organza Ruffle Dress',        age: '3-6Y',  category: 'Organza Frocks',                     stars: 5, reviews: 20, price: '₹1499', oldPrice: '₹1899', img: '/images/collections/Toddler.webp', badge: 'New' },
  { id: 58, name: 'Sheer Organza Gown',          age: '6-12Y', category: 'Organza Frocks',                     stars: 4, reviews: 12, price: '₹1699', oldPrice: null,     img: '/images/collections/Pre-Teen.webp' },
  { id: 59, name: 'Velvet Winter Frock',         age: '3-6Y',  category: 'Velvet Frocks (Winter Special)',     stars: 5, reviews: 25, price: '₹1599', oldPrice: '₹1999', img: '/images/collections/Little Girls.jpg', badge: 'Hot' },
  { id: 60, name: 'Plush Velvet Party Dress',    age: '6-12Y', category: 'Velvet Frocks (Winter Special)',     stars: 4, reviews: 14, price: '₹1799', oldPrice: null,     img: '/images/collections/Kids.webp' },
];

export default function AllProductsPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const presetCategory = searchParams.get('category') || '';
  const presetAge      = searchParams.get('age')      || '';

  // Always scroll to top when this page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.search]);

  const [selectedCategories, setSelectedCategories] = useState(
    presetCategory ? [presetCategory] : []
  );
  const [selectedColors, setSelectedColors] = useState([]);

  // Re-sync filter when URL param changes (e.g. clicking different subcategories)
  useEffect(() => {
    setSelectedCategories(presetCategory ? [presetCategory] : []);
  }, [presetCategory]);

  const filtered = ALL_PRODUCTS.filter((p) => {
    if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
    if (presetAge && p.age !== presetAge) return false;
    return true;
  });

  const pageTitle = presetCategory || 'All Collections';

  return (
    <main className="all-products-main">

      {/* Breadcrumb — z-index 0, navbar covers it on scroll */}
      <div className="all-products-bc-bar">
        <div className="all-products-inner">
          <nav className="all-products-breadcrumb">
            <Link to="/" className="ap-bc-link">Home</Link>
            <span className="ap-bc-sep">›</span>
            <Link to="/collections/all" className="ap-bc-link">Collections</Link>
            {presetCategory && (
              <>
                <span className="ap-bc-sep">›</span>
                <span className="ap-bc-current">{presetCategory}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Sidebar + Grid */}
      <div className="all-products-inner">

        {/* ── Top bar: Filter label + title on same line ── */}
        <div className="all-products-topbar">
          <div className="ap-topbar-left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            <span className="ap-topbar-filter">Filter</span>
            <button
              className="ap-topbar-reset"
              onClick={() => { setSelectedCategories([]); setSelectedColors([]); }}
            >
              Reset
            </button>
          </div>
          <div className="ap-topbar-right">
            <h2 className="ap-grid-title">
              {pageTitle}
              <span className="ap-grid-count">({filtered.length} products)</span>
            </h2>
          </div>
        </div>

        <div className="all-products-body">

          <FilterSidebar
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            onReset={() => { setSelectedCategories([]); setSelectedColors([]); }}
          />

          <section className="all-products-grid-area">
            <ProductGrid products={filtered} />
          </section>

        </div>
      </div>
    </main>
  );
}