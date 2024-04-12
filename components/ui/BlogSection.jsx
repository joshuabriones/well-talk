const BlogSection = () => {
	return (
		<section id="blog-card">
			<div className="flex justify-between px-44 my-6">
				<h2 className="text-3xl sm:text-3xl lg:text-3xl font-Merriweather font-bold">
					Your Blogs
				</h2>
				<div className="flex justify-end items-center">
					<form method="GET">
						<div className="relative text-gray-600 focus-within:text-gray-400">
							<span className="absolute inset-y-0 left-0 flex items-center pl-2">
								<button
									type="submit"
									className="p-1 focus:outline-none focus:shadow-outline">
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
										className="w-6 h-6">
										<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
									</svg>
								</button>
							</span>
							<input
								type="search"
								name="q"
								className="py-2 text-sm text-white bg-gray-200 rounded-full pl-10 focus:outline-none focus:bg-white focus:text-gray-200"
								placeholder="Search..."
								autoComplete="off"
							/>
						</div>
					</form>
				</div>
			</div>
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					<div className="blog-post py-3">
						<div className="image-zoom">
							<a
								href="blog-single.html"
								className="blog-img">
								<img
									src="/images/landing/blog6.png"
									alt=""
									className="img-fluid"
								/>
							</a>
						</div>
						<div className="pt-8">
							<span className="blog-date uppercase">
								by <b>Author</b> on 12th Jan 2023
							</span>
						</div>
						<div>
							<h3 className="py-5">
								<a
									href="blog-single.html"
									className="font-heading font-thin text-2xl hover:text-gray-500 font-Merriweather">
									I am alone, and feel the charm of existence
									created for the bliss
								</a>
							</h3>
							<p className="pb-10 font-Jaldi">
								I am so happy, my dear friend, so absorbed in
								the exquisite sense of mere tranquil existence,
								that I neglect my talents. I should be incapable
								of drawing since
							</p>
							<a
								href="blog-single.html"
								className="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out">
								Read More
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BlogSection;
