import { TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  currentUserType: "general" | "artist" | "company";
  onPortfolioClick?: () => void;
};

export function ProfileTabs({ currentUserType, onPortfolioClick }: Props) {
  return (
    <div className="flex items-center justify-between pb-2 mb-6 border-b border-gray-200">
      <h2 
        className="text-xl font-semibold text-gray-800 cursor-pointer hover:text-orange-500 transition-colors"
        onClick={onPortfolioClick}
      >
        Mi Portafolio
      </h2>
      
      <TabsList className="flex overflow-x-auto space-x-2">
        <TabsTrigger 
          value="portfolio" 
          className="whitespace-nowrap font-semibold"
        >
          Ofertas
        </TabsTrigger>
        <TabsTrigger value="blog" className="whitespace-nowrap">Mi Blog</TabsTrigger>
        <TabsTrigger value="events" className="whitespace-nowrap">Mis Eventos</TabsTrigger>
        <TabsTrigger value="recommendations" className="whitespace-nowrap">Recomendaciones</TabsTrigger>
        <TabsTrigger value="data" className="whitespace-nowrap">Data</TabsTrigger>
        <TabsTrigger value="settings" className="whitespace-nowrap">Configuración</TabsTrigger>
      </TabsList>
    </div>
  );
}
