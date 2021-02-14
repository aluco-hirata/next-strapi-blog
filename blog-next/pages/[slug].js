import Link from "next/link";

export default function Post({ post }) {
	return (
		<section>
			<article>
				<h2>{post.Title}</h2>
				<p>{post.User?.username}</p>
				<p>{post.Content}</p>
				<Link href="/">
					<a>&lt; Go Home</a>
				</Link>
			</article>
		</section>
	);
}

// tell next.js how many pages there are
export async function getStaticPaths() {
	const res = await fetch("http://localhost:1337/posts");
	const posts = await res.json();

	const paths = posts.map((post) => ({
		params: { slug: post.Slug },
	}));

	return {
		paths,
		fallback: true,
	};
}

// for each individual page: get the data for that page
export async function getStaticProps({ params }) {
	const { slug } = params;

	const res = await fetch(`http://localhost:1337/posts?Slug=${slug}`);
	const data = await res.json();
	const post = data[0];

	return {
		props: { post },
	};
}
