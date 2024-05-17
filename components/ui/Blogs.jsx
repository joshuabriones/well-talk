const Blogs = () => {
    return (
      <section className="max-h-[50vh] mx-auto overflow-y-auto prose-sm prose text-gray-500 divide-y mpx-8 py-24 lg:px-32 max-w-7xl prose-headings:font-normal prose-headings:text-xl">
        <div className="space-y-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-32">
            <div className="sticky top-0 lg:pb-16">
              <div className="pt-8"><p>16 March - 2024</p></div>
            </div>
            <div className="lg:col-span-2 pt-8">
              <div className="flex-shrink-0 mx-auto">
                <img className="aspect-[4/3] object-cover" src=".https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2021-05/two_women_-_covid.jpg?itok=rG-JDvC6" alt="#_"/>
                <h1>80% faster widgets</h1>
                <p className="line-clamp-4">
                  In our latest update, we've revolutionized the performance of our
                  widgets, achieving a remarkable 80% increase in loading speeds.
                  This breakthrough ensures a seamless experience across all
                  Snowpeaks widgets, setting a new standard for efficiency and user
                  satisfaction. Dive into the details to see how our widgets now
                  lead the pack in speed and reliability.
                </p>
                <p><a href="#_">Read more</a></p>
              </div>
            </div>
          </div>
          {/* Other blog entries go here */}
        </div>
      </section>
    );
  };
  export default Blogs;
  