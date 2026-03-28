import { useNavigate, Link } from 'react-router-dom';
import '../../styles/collections/AgeSection.css';

const ageGroups = [
  {
    slug: 'newborn-frocks',
    range: '0–6 Months',
    label: 'Newborn',
    img: '/images/collections/newborn.avif',
    colorClass: 'age-card--peach',
  },
  {
    slug: 'infant-frocks',
    range: '6–12 Months',
    label: 'Infant',
    img: '/images/collections/Infant.webp',
    colorClass: 'age-card--sage',
  },
  {
    slug: 'toddler-frocks',
    range: '1–3 Years',
    label: 'Toddler',
    img: '/images/collections/Toddler.webp',
    colorClass: 'age-card--sand',
  },
  {
    slug: 'little-girls',
    range: '3–6 Years',
    label: 'Little Girls',
    img: '/images/collections/Little Girls.jpg',
    colorClass: 'age-card--peach',
  },
  {
    slug: 'kids',
    range: '6–9 Years',
    label: 'Kids',
    img: '/images/collections/Kids.webp',
    colorClass: 'age-card--sage',
  },
  {
    slug: 'pre-teen',
    range: '9–12 Years',
    label: 'Pre-Teen',
    img: '/images/collections/Pre-Teen.webp',
    colorClass: 'age-card--sand',
  },
];

export default function AgeSection() {
  const navigate = useNavigate();

  return (
    <section id="age-sections" className="age-section">
      <div className="section-inner">

        {/* Breadcrumb */}
        <div className="page-breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-sep"> › </span>
          <span className="breadcrumb-current">Collections</span>
        </div>

        <div className="age-grid">
          {ageGroups.map((group) => (
            <div
              key={group.slug}
              className={`age-card ${group.colorClass}`}
              onClick={() => navigate(`/collections/${group.slug}`)}
            >
              <div className="age-img-wrap">
                <img src={group.img} alt={group.range} />
              </div>
              <div className="age-card-info">
                <span className="age-card-label">{group.label}</span>
                <span className="age-card-range">{group.range}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}