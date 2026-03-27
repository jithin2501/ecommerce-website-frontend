import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CollectionsBanner from '../../components/collections/CollectionsBanner';
import AgeSection from '../../components/collections/AgeSection';
import YouMightAlsoLike from '../../components/collections/YouMightAlsoLike';
import '../../styles/collections/CollectionsPage.css';

export default function CollectionsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="collections-page">

      <CollectionsBanner />

      {/* ✅ Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <span>Collections</span>
      </div>

      <AgeSection />
      <YouMightAlsoLike />

    </main>
  );
}