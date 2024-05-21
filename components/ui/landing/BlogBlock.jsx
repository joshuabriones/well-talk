const BlogBlock = () => {
	return (
	  <section id="blog-block" className="pt-10 lg:pt-0">
		<div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
		  {/* Blog blocks */}
		  <BlogItem
			imgSrc="/images/landing/blog7.png"
			title="5 Helpful Tips for Living Healthy Life"
			href="https://www.verywellmind.com/the-best-mental-health-blogs-5205192"
		  />
		  <BlogItem
			imgSrc="/images/landing/blog8.png"
			title="5 Helpful Tips for Living Healthy Life"
			href="https://psychcentral.com/blog"
		  />
		  <BlogItem
			imgSrc="/images/landing/blog9.png"
			title="5 Helpful Tips for Living Healthy Life"
			href="blog-single.html"
		  />
		  <BlogItem
			imgSrc="/images/landing/blog10.png"
			title="5 Helpful Tips for Living Healthy Life"
			href="blog-single.html"
		  />
		  <BlogItem
			imgSrc="/images/landing/blog11.png"
			title="5 Helpful Tips for Living Healthy Life"
			href="blog-single.html"
		  />
		</div>
	  </section>
	);
  };
  
  const BlogItem = ({ imgSrc, title, href }) => {
	return (
	  <figure className="blog-block-content image-zoom relative">
		<a href={href} className="block">
		  <img className="blog-block-img object-cover w-full h-full" src={imgSrc} alt="" />
		  <div className="header-overlay lg:hidden absolute inset-x-0 bottom-0 bg-black bg-opacity-50">
			<h5 className="font-heading text-white text-sm p-2 font-Jaldi">
			  {title}
			</h5>
		  </div>
		</a>
		<div className="hidden lg:flex absolute inset-x-0 bottom-0 justify-center">
		  <h5 className="font-heading text-white text-xl p-4 lg:p-12 font-Jaldi">
			{title}
		  </h5>
		</div>
	  </figure>
	);
  };
  
  export default BlogBlock;
  