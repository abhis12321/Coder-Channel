import Link from 'next/link';
import { FaCode, FaComments, FaBlog, FaShare, FaHeart, FaUserPlus, FaMoon, FaSun } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100/60 dark:bg-gray-900 transition-colors duration-300">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">About CoderMedia</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            CoderMedia is a social media platform designed exclusively for coders and developers. 
            We provide a space where you can connect, collaborate, and grow your skills alongside 
            like-minded professionals from around the world.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Whether you're a seasoned developer or just starting your coding journey, 
            CoderMedia offers the tools and community to help you thrive in the world of programming.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<FaCode className="text-4xl text-blue-500 dark:text-blue-400" />}
              title="Code Sharing"
              description="Share your code snippets, get feedback, and learn from others."
            />
            <FeatureCard 
              icon={<FaComments className="text-4xl text-green-500 dark:text-green-400" />}
              title="Developer Chat"
              description="Real-time chat with other developers to discuss ideas and solve problems."
            />
            <FeatureCard 
              icon={<FaBlog className="text-4xl text-red-500 dark:text-red-400" />}
              title="Tech Blog"
              description="Write and read blog posts about the latest in technology and programming."
            />
            <FeatureCard 
              icon={<FaShare className="text-4xl text-purple-500 dark:text-purple-400" />}
              title="Project Collaboration"
              description="Find collaborators for your projects or join exciting new ventures."
            />
            <FeatureCard 
              icon={<FaHeart className="text-4xl text-pink-500 dark:text-pink-400" />}
              title="Community Engagement"
              description="Like, comment, and share posts to engage with the community."
            />
            <FeatureCard 
              icon={<FaUserPlus className="text-4xl text-yellow-500 dark:text-yellow-400" />}
              title="Network Building"
              description="Follow other developers and grow your professional network."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Join Our Community</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Ready to take your coding journey to the next level? Join CoderMedia today and 
            become part of a thriving community of developers who are passionate about coding 
            and technology.
          </p>
          <Link href={'/login'} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition duration-300">
            Sign In Now
          </Link>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-4 text-gray-800 dark:text-white">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
