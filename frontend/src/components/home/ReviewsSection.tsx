import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Amit Sharma",
    feedback: "Excellent service and luxury experience. Booking was easy and smooth.",
    rating: 5,
  },
  {
    name: "Priya Rao",
    feedback: "The car was in top condition and pick-up was super convenient.",
    rating: 4,
  },
  {
    name: "Ravi Mehta",
    feedback: "Best car rental experience I've had. Highly recommend!",
    rating: 5,
  },
];

const ReviewsSection = () => (
  <section className="py-16 px-6 bg-gray-900">
    <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {reviews.map((review, index) => (
        <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-semibold">{review.name}</h4>
            <div className="flex gap-1 text-yellow-400">
              {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
          </div>
          <p className="text-gray-300 text-sm">{review.feedback}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ReviewsSection;