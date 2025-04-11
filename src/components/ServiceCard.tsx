import Link from 'next/link';

interface ServiceCardProps {
  id: number;
  name: string;
  path: string;
  icon: string;
  description?: string;
}

export default function ServiceCard({ id, name, path, icon, description }: ServiceCardProps) {
  return (
    <Link 
      href={path}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <div className="bg-gradient-to-r from-sunrin-blue to-sunrin-green p-4 text-white">
          <div className="text-4xl mb-2">{icon}</div>
          <h3 className="font-bold text-lg">{name}</h3>
        </div>
        {description && (
          <div className="p-4 text-gray-600 text-sm">
            <p>{description}</p>
          </div>
        )}
        <div className="mt-auto p-4 flex justify-between items-center border-t">
          <span className="text-xs text-gray-500">서비스 #{id}</span>
          <span className="text-sunrin-blue font-medium">바로가기 &rarr;</span>
        </div>
      </div>
    </Link>
  );
} 