/* Components */
import Hero from "~/components/home/hero";
import Footer from "~/components/globals/footer";
import JoinCommunity from "~/components/home/join-community";
import NavBar from "~/components/globals/navbar";
import InteractiveHomeContent from "~/components/home/interactive-home-content";

/* Queries */
import { getCachedTopPostsWithAuthor } from "~/server/db/queries/posts";

export let revalidate = 3600;

export default async function Home() {
  const topStories = await getCachedTopPostsWithAuthor({ limit: 5, type: 'story' });
  const topScenarios = await getCachedTopPostsWithAuthor({ limit: 5, type: 'scenario' });

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <Hero />

      <InteractiveHomeContent topStories={topStories} topScenarios={topScenarios} />

      <JoinCommunity />
      <Footer />
    </div>
  );
}