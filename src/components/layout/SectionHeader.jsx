export default function SectionHeader({ eyebrow, title, description, center = false }) {
  return (
    <div className={`mb-10 md:mb-12 ${center ? 'text-center' : ''}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className={`section-title mt-2 ${center ? '' : ''}`}>{title}</h2>
      {description && (
        <p className={`text-muted mt-3 max-w-xl ${center ? 'mx-auto' : ''}`}>{description}</p>
      )}
    </div>
  );
}
