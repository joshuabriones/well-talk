import React from 'react';
const Card = () => {
	const posts = [
		{
			title: "Strengthening Mental Health Support for Students",
			desc: "The distress that so many students are experiencing calls for us to act with urgency and compassion. It also calls for us to find innovative approaches that can reach more young people and help form a stronger network of support for college-age youth.",
			img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQPninQfI_9PozknJd3stRq22ICiZ3gFqXnnrRMAIuXdn3-qEMO",
			date: "Sept 5 2023",
			href: "https://www.nami.org/kids-teens-young-adults/strengthening-mental-health-support-for-students/",
		},
		{
			title: "How Does Social Anxiety Affect the Brain?",
			desc: "Social anxiety can affect the areas of the brain that help you process fear, anxiety, and information about other people.",
			img: "https://media.post.rvohealth.io/wp-content/uploads/sites/4/2022/08/human-brain-in-box-spot-light-732x549-thumbnail-732x549.jpg",
			date: "July 29 2020",
			href: "https://psychcentral.com/anxiety/eye-tracking-evidence-shows-that-social-anxiety-changes-the-picture",
		},
		{
			title: "Tips For Easing Back-to-School Anxiety",
			desc: "As summer ends, a mix of emotions can fill households. While some parents eagerly anticipate sending their kids back to school, and some kids look forward to reuniting with friends and teachers, this time of year can also be met with anxiety and frustration.",
			img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRA1MpUfzoiww6g3vetIf_RZwnD2mi2KhnlTmWoE2q0qoTstj5w",
			date: "Aug 28 2023",
			href: "https://www.nami.org/anxiety-disorders/tips-for-easing-back-to-school-anxiety/",
		},
		{
			title: "The Importance of Prioritizing Emotional Wellness over Academic Achievement",
			desc: "As a society, we pressure youth to achieve certain milestones “on time.” Teenagers are expected to finish high school by a certain age, attend college directly after high school, graduate from college in four years and find a job (and hopefully a career) soon after.",
			img: "https://miro.medium.com/v2/resize:fit:640/format:webp/1*Ex9xiS6naN00crrNGROBVA.jpeg",
			date: "Dec 12 2022",
			href: "https://www.nami.org/bipolar-and-related-disorders/the-importance-of-prioritizing-emotional-wellness-over-academic-achievement/",
		},
		{
			title: "Children Should Not Have to Be Resilient",
			desc: "I felt pressure to continue being ‘the brave, resilient one’ in moments I deserved to rest, recuperate and simply be a child.",
			img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTkEkGWeYt2Ir05JO4kO0LU77CCA1VK0NBqP66qi4XMHg8lS52E",
			date: "Feb 24 2023",
			href: "https://www.nami.org/family-member-caregivers/children-should-not-have-to-be-resilient/",
		},
	];

	return (
		<section className="">
			<div className="max-w-screen-xl mx-auto px-4 md:px-8">
				<ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
					{posts.map((item, key) => (
						<React.Fragment key={key}>
							<li
								className="w-full mx-auto group"
								key={key}>
								<a
									href={item.href}
									className="flex items-center space-x-7">
									<img
										src={item.img}
										loading="lazy"
										alt={item.title}
										className="w-40 h-32 rounded-lg object-cover"
									/>
									<div className="flex flex-col space-y-2">
										<span className=" text-sm text-maroon">
											{item.date}
										</span>
										<h3 className="text-lg text-gray-800 duration-150 group-hover:text-gold font-semibold">
											{item.title}
										</h3>
										<p className="text-gray-600 text-sm duration-150 group-hover:text-gray-800">
											{item.desc}
										</p>
									</div>
								</a>
							</li>
							{key !== posts.length - 1 && (
								<li
									className="w-full mx-auto border-b border-gray-200"
									key={`divider-${key}`}></li>
							)}
						</React.Fragment>
					))}
				</ul>
			</div>
		</section>
	);
};
export default Card;
