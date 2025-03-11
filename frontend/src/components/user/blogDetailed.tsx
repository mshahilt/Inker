import { useParams } from "react-router-dom";

const dummyPosts = [
  {
    title: "Mastering JavaScript Closures",
    tags: ["javascript", "functional-programming", "advanced"],
    date: "Jan 15",
    minute: 5,
    imageURL:
      "https://tse1.mm.bing.net/th?id=OIP.kkJ4tBMv2tT9OqxmUWlQFgHaEK&pid=Api&P=0&h=180",
    upvotes: 23,
    downvotes: 4,
  },
  {
    title: "Understanding React's Reconciliation Algorithm",
    tags: ["react", "performance", "virtual-dom", "sdfdf"],
    date: "Mar 10",
    minute: 8,
    imageURL:
      "https://tse1.mm.bing.net/th?id=OIP.lyFjc5YkrtksZ1LbAsPuGAHaD4&pid=Api&P=0&h=180",
    upvotes: 30,
    downvotes: 1,
  },
  {
    title: "Git Commands That Might Save You One Day",
    tags: ["productivity", "git", "+1"],
    date: "Feb 20",
    minute: 7,
    imageURL: "https://i.morioh.com/2023/08/18/a0ecc9b5.webp",
    upvotes: 15,
    downvotes: 2,
  },
  {
    title: "Building Scalable Node.js Applications",
    tags: ["nodejs", "backend", "scalability"],
    date: "Dec 05",
    minute: 10,
    imageURL:
      "https://tse4.mm.bing.net/th?id=OIP.W1ZnAvRNWYSyBsBc0NdwpgHaER&pid=Api&P=0&h=180",
    upvotes: 18,
    downvotes: 3,
  },
  {
    title: "A Beginner’s Guide to MongoDB Indexing",
    tags: ["mongodb", "database", "performance"],
    date: "Nov 22",
    minute: 6,
    imageURL: "https://i.morioh.com/2023/08/18/a0ecc9b5.webp",
    upvotes: 12,
    downvotes: 5,
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const post = dummyPosts[parseInt(id || "0")];

  if (!post) {
    return <h2 className="text-center text-red-500 mt-10">Blog not found</h2>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Image */}
      <img
        src={post.imageURL}
        alt={post.title}
        className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg mb-8"
      />

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white-800">
        {post.title}
      </h1>

      {/* Description */}
      <p className="text-white-600 mb-8 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac diam...
      </p>

      {/* White space for future content */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
          
        </div>
      </div>

      {/* Metadata (Date, Read Time, Tags) */}
      <div className="bg-black p-6 rounded-lg shadow-sm">
        <p className="text-white-500 mb-4">
          Published on: {post.date} | Read time: {post.minute} min
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;