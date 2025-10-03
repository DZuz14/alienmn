import { Annotation } from '@/app/types';

/**
 * Displays an annotation tooltip at the specified position
 * @param {Object} props
 * @param {Annotation} props.annotation - The annotation object with text and position
 * @param {Function} props.onClose - Handler for closing the annotation
 */
export default function AnnotationTooltip({
  annotation,
  onClose,
}: {
  annotation: Annotation;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed bg-gray-800/90 backdrop-blur-sm text-white p-4 rounded-lg text-base max-w-sm shadow-lg transition-opacity duration-200 tooltip z-50"
      style={{
        top: annotation.position.top,
        left: annotation.position.left,
        transform: annotation.position.transform,
      }}
      onClick={(e) => {
        e.stopPropagation();
        // Don't close on click - let user click outside to close
      }}
    >
      {annotation.text}
      <div className="absolute left-1/2 bottom-0 w-2 h-2 bg-gray-800/90 transform rotate-45 translate-y-1/2 -translate-x-1/2"></div>
    </div>
  );
}
