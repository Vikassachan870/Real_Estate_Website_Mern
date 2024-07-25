const WhyChooseUs = () => {
  return (
    <>
      <section className="bg-muted py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-background p-6 rounded-lg shadow-md">
              <img
                className="h-8 w-8 text-primary mb-4"
                src="https://png.pngtree.com/png-vector/20201203/ourmid/pngtree-award-icon-vector-and-glyph-png-image_2499769.jpg"
                alt="award"
              ></img>
              <h3 className="text-xl font-bold mb-2">Trusted Experts</h3>
              <p className="text-muted-foreground">
                Our team of experienced real estate professionals are dedicated
                to helping you find your dream home.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-md">
              <img
                className="h-8 w-8 text-primary mb-4"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXT7U99CsxazRLztINzb-vEvtNHsDR2oUFjg&s"
                alt="compass"
              ></img>
              <h3 className="text-xl font-bold mb-2">Comprehensive Search</h3>
              <p className="text-muted-foreground">
                Our extensive database of listings ensures you'll find the
                perfect property, no matter your criteria.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-md">
              <img
                className="h-8 w-8 text-primary mb-4"
                src="https://static.thenounproject.com/png/1047495-200.png"
                alt="bolt"
              />
              <h3 className="text-xl font-bold mb-2">Fast and Efficient</h3>
              <p className="text-muted-foreground">
                We streamline the entire process, from search to closing,
                ensuring a smooth and hassle-free experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default WhyChooseUs;
