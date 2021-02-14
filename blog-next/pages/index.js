import Link from "next/link";

export default function Home({ posts }) {
	return (
		<section>
			{/* loop over the posts and show them */}
			{posts &&
				posts.map((post) => (
					<article key={post.id}>
						<h2>{post.Title}</h2>
						<div>{post.User?.username}</div>
						<Link href={`/${post.Slug}`}>more &gt;</Link>
					</article>
				))}
		</section>
	);
}

export async function getStaticProps() {
	// get posts from our api
	const res = await fetch("http://localhost:1337/posts");
	const posts = await res.json();

	return {
		props: { posts },
	};
}
