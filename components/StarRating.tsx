import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  count?: number;
}

export function StarRating({ rating, size = 'md', showNumber = false, count }: StarRatingProps) {
  const sizes = { sm: 12, md: 16, lg: 20 };
  const px = sizes[size];
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          size={px}
          fill={s <= Math.round(rating) ? '#FBBF24' : '#E5E7EB'}
          stroke={s <= Math.round(rating) ? '#F59E0B' : '#D1D5DB'}
          strokeWidth={1.5}
        />
      ))}
      {showNumber && (
        <span className={`ml-1 font-semibold ${size === 'sm' ? 'text-xs' : 'text-sm'} text-gray-700`}>
          {rating.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className={`ml-0.5 ${size === 'sm' ? 'text-xs' : 'text-sm'} text-gray-400`}>
          ({count})
        </span>
      )}
    </div>
  );
}
