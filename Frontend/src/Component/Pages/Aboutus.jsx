const Aboutus=()=>
{
  return <>
   <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full pt-12 md:pt-24 lg:pt-32">
        <div className="container space-y-10 xl:space-y-16">
          <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                About Acme Real Estate
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Acme Real Estate is a leading provider of premium real estate services, dedicated to helping our clients
                find their dream homes and investment properties.
              </p>
            </div>
            <img
              src=""
              width="1270"
              height="550"
              alt="Hero"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <img className="h-12 w-12 text-primary" src="https://i.pinimg.com/736x/b3/e0/b9/b3e0b92ac2d5fda1ddedd54ae876b02c.jpghttps://e7.pngegg.com/pngimages/37/860/png-clipart-computer-icons-calendar-date-calendar-text-calendar-thumbnail.pnghttps://i.pinimg.com/736x/e2/94/c8/e294c83ab5639bdc9f2e322a2670b751.jpghttps://w7.pngwing.com/pngs/481/5/png-transparent-computer-icons-calendar-time-text-calendar-logo-thumbnail.pnghttps://t4.ftcdn.net/jpg/07/97/18/45/360_F_797184519_0jHoB5YTdoCeTk5R4Am9YpCUNQ2lzaYD.jpghttps://icons.veryicon.com/png/o/miscellaneous/face-monochrome-icon/calendar-249.png" alt="" />
              <h3 className="text-2xl font-bold">Our History</h3>
              <p className="text-muted-foreground">
                Acme Real Estate was founded in 1985 with a mission to provide exceptional real estate services to our
                local community. Over the past 35 years, we've grown to become a trusted name in the industry.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <img className="h-12 w-12 text-primary" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRxvL3ZHnq7DRDrTAFnjxGYMRcchXuY0-j0Q&s" alt="" />
              <h3 className="text-2xl font-bold">Our Values</h3>
              <p className="text-muted-foreground">
                At the heart of our business are our core values of integrity, excellence, and client-centric service.
                We are committed to upholding these principles in everything we do.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <img  className="h-12 w-12 text-primary" src="https://cdn-icons-png.flaticon.com/512/74/74577.png" alt="" />
              <h3 className="text-2xl font-bold">Our Team</h3>
              <p className="text-muted-foreground">
                Our team of experienced real estate professionals is dedicated to providing our clients with the highest
                level of service and expertise. We work tirelessly to ensure your real estate journey is a smooth and
                successful one.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
}
export default Aboutus