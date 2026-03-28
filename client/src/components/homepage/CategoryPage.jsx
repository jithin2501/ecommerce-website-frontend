import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { categoryData } from './Category';
import '../../styles/homepage/CategoryPage.css';

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const category = categoryData.find((c) => c.slug === slug);

  // Scroll to top every time this page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const handleShopByCategory = (e) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('collections');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  if (!category) {
    return (
      <div className="catpage-notfound">
        <h2>Category not found</h2>
        <Link to="/">Go Home</Link>
      </div>
    );
  }

  return (
    <main className="catpage-main">

      {/* Breadcrumb */}
      <nav className="catpage-breadcrumb">
        <Link to="/" className="bc-link">Home</Link>
        <span className="bc-sep">›</span>
        <a href="/" className="bc-link" onClick={handleShopByCategory}>Shop By Category</a>
        <span className="bc-sep">›</span>
        <span className="bc-current">{category.label}</span>
      </nav>

      {/* Heading — centered */}
      <div className="catpage-section-head">
        <h1 className="catpage-section-title">{category.label}</h1>
      </div>

      {/* Subcategory Grid — 4 per row, square image cards */}
      <div className="catpage-grid">
        {category.subcategories.map((sub, i) => (
          <div
            key={sub.name}
            className="subcat-card"
            style={{ animationDelay: `${i * 0.06}s` }}
            onClick={() => navigate(`/category/${slug}/${sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)}
          >
            <div className="subcat-img-box">
              <img
                src={sub.img}
                alt={sub.name}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=400&auto=format&fit=crop';
                }}
              />
            </div>
            <div className="subcat-label">
              <span className="subcat-name">{sub.name}</span>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}