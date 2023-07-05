import {
  AboutUs,
  Collections,
  FAQ,
  FeaturedArtworks,
  Footer,
  Hero,
  Navbar,
  Sponsor,
  TopCreator,
} from '@/components';
import React from 'react';

import AddProductModal from '@/components/modals/AddProductModal';
import ProductList from '@/components/ProductList';
import RandomProductModal from '@/components/modals/RandomProductModal';

export default function Home() {
  return (
    <div className="h-full main_bg text-white overflow-hidden" id="top">
      <Navbar />
      <div>
        <AddProductModal />
        {/* <DeleteProductModal id={0} /> */}
        <RandomProductModal />
        <ProductList />
      </div>
      <Hero />
      <Sponsor />
      <AboutUs />
      <Collections />
      <FeaturedArtworks />
      <TopCreator />
      <FAQ />
      <Footer />
    </div>
  );
}
