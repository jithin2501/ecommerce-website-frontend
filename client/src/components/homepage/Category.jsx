import { useNavigate } from 'react-router-dom';
import '../../styles/homepage/Category.css';

export const categoryData = [
  {
    slug: 'occasion-daily-wear',
    label: 'Occasion & Daily Wear Frocks',
    emoji: '👗',
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400',
    fallback: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=400&auto=format&fit=crop',
    subcategories: [
      { name: 'Birthday Party Frocks', img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=400' },
      { name: 'Wedding / Festive Frocks', img: 'https://images.unsplash.com/photo-1604917018619-9ab6c6d67b13?q=80&w=400' },
      { name: 'Reception / Evening Wear', img: 'https://images.unsplash.com/photo-1621786030484-4c855eed6974?q=80&w=400' },
      { name: 'Photoshoot Special Frocks', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400' },
      { name: 'Princess / Fancy Dress', img: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?q=80&w=400' },
      { name: 'Casual Cotton Frocks', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=400' },
      { name: 'Playtime Frocks', img: 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?q=80&w=400' },
      { name: 'School Casual Frocks', img: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=400' },
      { name: 'Summer Wear Frocks', img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=400' },
      { name: 'Comfortable Home Wear', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400' },
    ],
  },

  {
    slug: 'party-wear',
    label: 'Party Wear Collection',
    emoji: '💃',
    img: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=400',
    fallback: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=400',
    subcategories: [
      { name: 'Net Frocks', img: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?q=80&w=400' },
      { name: 'Gown Style Frocks', img: 'https://images.unsplash.com/photo-1621786030484-4c855eed6974?q=80&w=400' },
      { name: 'Layered / Frill Frocks', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400' },
      { name: 'Sequin / Glitter Frocks', img: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=400' },
      { name: 'Designer Party Wear', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=400' },
    ],
  },

  {
    slug: 'designer-premium',
    label: 'Designer & Premium Frocks',
    emoji: '🎀',
    img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400',
    fallback: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400',
    subcategories: [
      { name: 'Boutique Designer Frocks', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=400' },
      { name: 'Handwork / Embroidery Frocks', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400' },
      { name: 'Custom Made Frocks', img: 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?q=80&w=400' },
      { name: 'Luxury Collection', img: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?q=80&w=400' },
    ],
  },

  {
    slug: 'traditional-ethnic',
    label: 'Traditional & Ethnic Frocks',
    emoji: '🌸',
    img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400',
    fallback: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400',
    subcategories: [
      { name: 'Pattu / Silk Frocks', img: 'https://images.unsplash.com/photo-1604917018619-9ab6c6d67b13?q=80&w=400' },
      { name: 'Lehenga Style Frocks', img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=400' },
      { name: 'Anarkali Frocks', img: 'https://images.unsplash.com/photo-1621786030484-4c855eed6974?q=80&w=400' },
      { name: 'Indo-Western Styles', img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=400' },
      { name: 'Festival Special (Diwali, Navratri, etc.)', img: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=400' },
    ],
  },

  {
    slug: 'fabric-based',
    label: 'Fabric-Based Categories',
    emoji: '🌈',
    img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=400',
    fallback: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=400',
    subcategories: [
      { name: 'Cotton Frocks', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=400' },
      { name: 'Net Frocks', img: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?q=80&w=400' },
      { name: 'Satin Frocks', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400' },
      { name: 'Silk Frocks', img: 'https://images.unsplash.com/photo-1604917018619-9ab6c6d67b13?q=80&w=400' },
      { name: 'Organza Frocks', img: 'https://images.unsplash.com/photo-1621786030484-4c855eed6974?q=80&w=400' },
      { name: 'Velvet Frocks (Winter Special)', img: 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?q=80&w=400' },
    ],
  },
];

export default function Category() {
  const navigate = useNavigate();

  return (
    <section id="collections" className="category-section">
      <div className="section-inner">

        <div className="category-header">
          <h2 className="category-title">
            <span>Shop By</span> Category
          </h2>
        </div>

        <div className="category-grid">
          {categoryData.map((cat) => (
            <a
              key={cat.slug}
              href="#"
              className="category-card"
              onClick={(e) => { e.preventDefault(); navigate(`/category/${cat.slug}`); }}
            >
              <div className="category-circle">
                <img
                  src={cat.img}
                  alt={cat.label}
                  onError={(e) => { e.target.src = cat.fallback; }}
                />
              </div>
              <span className="category-label">{cat.label}</span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}