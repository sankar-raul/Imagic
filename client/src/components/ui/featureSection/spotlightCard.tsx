export default function SpotlightCard({ 
  icon, 
  title, 
  description
}) {
  return (
    <div className={`bg-[#FEEE91] border border-white/10 rounded-3xl p-8 my-8 w-full max-w-md text-black hover:scale-105 transition-all duration-500`}>
      
      {/* Icon */}
      <div className="mb-4">
        <img src={icon} className="h-20" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold mb-2">
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
