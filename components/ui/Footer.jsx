const Footer = () => {
	return (
		<section id="footer" className="relative">
			<div className="pattern-overlay pattern-left absolute -z-10">
				<img src="/images/landing/lleft.png" alt="pattern" />
			</div>
			<div className="pattern-overlay pattern-right absolute bottom-0 right-0 -z-10">
				<img
					src="/images/landing/lright.png"
					alt="pattern"
					className="w-full h-full object-contain"
				/>
			</div>

			<div className="container mx-auto footer-container px-5 lg:px-0">
				<footer className="grid grid-cols-1 lg:grid-cols-6 gap-6 pb-10 lg:pb-20 mx-8">
					{/* Links */}
					{/* <div className="lg:col-span-2">
			  <ul className="nav flex-column">
				<li className="nav-item mb-2">
				  <a href="#" className="uppercase hover:text-gray-500">
					Twitter
				  </a>
				</li>
				<li className="nav-item mb-2">
				  <a href="#" className="uppercase hover:text-gray-500">
					Facebook
				  </a>
				</li>
				<li className="nav-item mb-2">
				  <a href="#" className="uppercase hover:text-gray-500">
					Instagram
				  </a>
				</li>
				<li className="nav-item mb-2">
				  <a href="#" className="uppercase hover:text-gray-500">
					Linkedin
				  </a>
				</li>
				<li className="nav-item mb-2">
				  <a href="#" className="uppercase hover:text-gray-500">
					Youtube
				  </a>
				</li>
			  </ul>
			</div> */}

					{/* Contact Details */}
					{/* <div className="lg:col-span-4 flex justify-end">
  <div className="grid grid-cols-subgrid col-span-2">
    <div className="col-span-2 lg:text-right">
      <p className="m-0">
        <b>joshuajhonn.borres@cit.edu</b>
      </p>
      <p className="m-0">N. Bacalso Avenue, Cebu City, Philippines</p>
      <p className="m-0">+63 32 26177431</p>
    </div>
  </div>
</div> */}
				</footer>

				{/* Copyright */}
				<footer className="border-t flex flex-col justify-center items-center gap-y-4">
					<div className="flex justify-center pt-5 lg:pt-10">
						<p className="mb-0">© 2024 WellTalk. All rights reserved.</p>
					</div>
				</footer>
			</div>
		</section>
	);
};

export default Footer;
