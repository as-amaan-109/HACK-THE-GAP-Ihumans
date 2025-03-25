import { Star, StarHalf, StarOff, User } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 4.5,
    review: "This course was amazing! The content was well-structured and easy to understand.",
    avatar: "",
  },
  {
    id: 2,
    name: "Alice Smith",
    rating: 5,
    review: "One of the best courses I've taken. Highly recommended for beginners!",
    avatar: "",
  },
  {
    id: 3,
    name: "Michael Johnson",
    rating: 3.5,
    review: "Good course, but could use more practical examples. Overall, a solid learning experience.",
    avatar: "",
  },
];

const ReviewCard = ({ name, rating, review, avatar }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="text-yellow-400 w-5 h-5" />);
      } else if (i - 0.5 === rating) {
        stars.push(<StarHalf key={i} className="text-yellow-400 w-5 h-5" />);
      } else {
        stars.push(<StarOff key={i} className="text-gray-400 w-5 h-5" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-purple-500 text-white p-6 rounded-2xl shadow-lg w-full max-w-sm transition-transform hover:scale-105">
      <div className="flex items-center gap-4">
        {avatar ? (
          <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
        ) : (
          <User className="w-12 h-12 text-white bg-purple-700 p-2 rounded-full" />
        )}
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex">{renderStars(rating)}</div>
        </div>
      </div>
      <p className="mt-4 text-sm">{review}</p>
    </div>
  );
};

export default function CourseReviews() {
  return (
    <div className="p-3  min-h-screen flex flex-col items-center gap-6">
      <h2 className="text-3xl font-bold text-purple-600">Course Reviews</h2>
      <div className="flex flex-col gap-3">
        {reviews.map((r) => (
          <ReviewCard key={r.id} {...r} />
        ))}
      </div>
    </div>
  );
}
