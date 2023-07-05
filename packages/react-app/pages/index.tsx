import {
  AboutUs,
  Button,
  Collections,
  Container,
  FAQ,
  FeaturedArtworks,
  Footer,
  Hero,
  Navbar,
  Sponsor,
  TopCreator,
} from '@/components';
import React from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInDownShorter } from '@/keyframes';
import AddProductModal from '@/components/modals/AddProductModal';
import ProductList from '@/components/ProductList';
import RandomProductModal from '@/components/modals/RandomProductModal';
// import DeleteProductModal from '@/components/modals/DeleteProductModal';

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
      <Container className={undefined}>
        <div
          className="bg-gradient-to-b from-[#ff9a02] to-[#ffa806] rounded-xl py-20 px-10 flex items-center justify-center shadow-lg flex-col mb-44"
        >
          <h2 className="font-bold text-2xl sm:text-4xl lg:text-5xl mb-5 w-full md:w-2/5 leading-snug text-center">
            Explore All Sneakers you desire.
          </h2>
          <Reveal delay={200} duration={1000} keyframes={fadeInDownShorter}>
            <Button variant={undefined} isLink={undefined} href={undefined} onClick={undefined}>
              Get Started
            </Button>
          </Reveal>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
