import { CheckCircle } from 'lucide-react';
import { StarRating } from './StarRating';
import type { Review } from '@/lib/types';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const initials = review.author
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const colors = ['#0D9488', '#7C3AED', '#DB2777', '#2563EB', '#059669', '#D97706'];
  const color = colors[review.author.charCodeAt(0) % colors.length];

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
          style={{ backgroundColor: color }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-900 text-sm">{review.author}</span>
            {review.verified && (
              <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                <CheckCircle size={12} />
                Paciente verificado
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <StarRating rating={review.rating} size="sm" />
            <span className="text-xs text-gray-400">
              {new Date(review.date).toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-gray-600 text-sm leading-relaxed">{review.comment}</p>
    </div>
  );
}
