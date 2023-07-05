import {
  AboutUs,

  Collections,

  FAQ,
  FeaturedArtworks,
  Footer,
  Hero,
  Navbar,
  Sponsor,
  TopCreator
} from '@/components';
import React from 'react';
import AddProductModal from "@/components/modals/AddProductModal";
import ProductList from "@/components/ProductList";
import RandomProductModal from "@/components/modals/RandomProductModal";

// Export the Home component
export default function Home() {
  return ( 
    <div className='h-full main_bg text-white overflow-hidden' id='top'>
      <Navbar />
      <div>
        <AddProductModal />
    
        <RandomProductModal/>
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
};
