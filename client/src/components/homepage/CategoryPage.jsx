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

  if (!category) {
    return (
      <div className="catpage-notfound">
        <h2>Category not found</h2>
        <Link to="/">Go Home</Link>
      </div>
    );
  }

  const handleSubcategoryClick = (subName) => {
    // Go directly to All Collections page filtered by this subcategory
    navigate(`/collections/all?category=${encodeURIComponent(subName)}`);
  };

  return (
    <main className="catpage-main">

      {/* Breadcrumb — Collections link goes to /collections/all */}
      <nav className="catpage-breadcrumb">
        <Link to="/" className="bc-link">Home</Link>
        <span className="bc-sep">›</span>
        <Link to="/collections/all" className="bc-link">Collections</Link>
        <span className="bc-sep">›</span>
        <span className="bc-current">{category.label}</span>
      </nav>

      {/* Heading */}
      <div className="catpage-section-head">
        <h1 className="catpage-section-title">{category.label}</h1>
      </div>

      {/* Subcategory Grid */}
      <div className="catpage-grid">
        {category.subcategories.map((sub, i) => (
          <div
            key={sub.name}
            className="subcat-card"
            style={{ animationDelay: `${i * 0.06}s` }}
            onClick={() => handleSubcategoryClick(sub.name)}
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