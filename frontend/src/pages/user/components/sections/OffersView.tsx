import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Tipos para iconos SVG
interface SVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// Componentes de iconos
const Clock = ({ className, ...props }: SVGProps) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const DollarIcon = ({ className, ...props }: SVGProps) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const MessageIcon = ({ className, ...props }: SVGProps) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);


// Datos de ejemplo
type Offer = {
  id: number;
  title: string;
  client: string;
  clientName: string;
  clientImage: string;
  projectType: string;
  budget: string;
  amount: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'solicitada' | 'en_progreso' | 'completada';
  timeAgo?: string;
  progress?: number;
  deadline?: string;
  rating?: number;
  completedDate?: string;
  date?: string;
};

const pendingOffers: Offer[] = [
  {
    id: 1,
    title: "Ilustración para libro infantil",
    client: "María González",
    clientName: "María González",
    clientImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50",
    projectType: "Ilustración para libro infantil",
    budget: "800.00",
    amount: "800.00",
    description: "Necesito ilustraciones para un libro infantil de 20 páginas con estilo colorido y amigable",
    timeAgo: "2 horas",
    status: "pending"
  },
  {
    id: 2,
    title: "Logo para startup tech",
    client: "Roberto Silva",
    clientName: "Roberto Silva",
    clientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50",
    projectType: "Logo para startup tech",
    budget: "450.00",
    amount: "450.00",
    description: "Logo moderno y minimalista para empresa de tecnología blockchain",
    timeAgo: "5 horas",
    status: "pending"
  }
];

const activeOffers: Offer[] = [
  {
    id: 3,
    title: "Arte conceptual para videojuego",
    client: "Ana Martínez",
    clientName: "Ana Martínez",
    clientImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50",
    projectType: "Arte conceptual para videojuego",
    budget: "1200.00",
    amount: "1200.00",
    description: "Concept art para personajes principales de videojuego indie estilo fantasy",
    progress: 65,
    deadline: "15 días",
    status: "active"
  }
];

const completedOffers: Offer[] = [
  {
    id: 4,
    title: "Ilustración corporativa",
    client: "Luis Pérez",
    clientName: "Luis Pérez",
    clientImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50",
    projectType: "Ilustración corporativa",
    budget: "600.00",
    amount: "600.00",
    description: "Ilustraciones para campaña corporativa",
    rating: 5,
    completedDate: "3 días",
    status: "completed"
  }
];

export function OffersView() {
  return (
    <div className="bg-black w-full">
      <div className="border-t border-gray-700 w-full mt-2"></div>
      <Tabs defaultValue="pending" className="w-full px-4 py-2">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-[#141b2a] p-1 rounded-xl border border-gray-700">
          <TabsTrigger 
            value="pending" 
            className="data-[state=active]:bg-[#e74f05] data-[state=active]:text-white hover:bg-[#e74f05]/20 hover:text-[#e74f05] rounded-lg py-2 transition-colors"
          >
            Pendientes ({pendingOffers.length})
          </TabsTrigger>
          <TabsTrigger 
            value="active"
            className="data-[state=active]:bg-[#e74f05] data-[state=active]:text-white hover:bg-[#e74f05]/20 hover:text-[#e74f05] rounded-lg py-2 transition-colors"
          >
            Activas ({activeOffers.length})
          </TabsTrigger>
          <TabsTrigger 
            value="completed"
            className="data-[state=active]:bg-[#e74f05] data-[state=active]:text-white hover:bg-[#e74f05]/20 hover:text-[#e74f05] rounded-lg py-2 transition-colors"
          >
            Completadas ({completedOffers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="space-y-4">
            {pendingOffers.map((offer) => (
              <Card key={offer.id} className="bg-[#0f172a] border border-gray-700 hover:border-[#bb00aa]/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <img 
                        src={offer.clientImage}
                        alt={offer.clientName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-white">{offer.clientName}</h3>
                          <Badge variant="outline" className="text-xs text-gray-300 border-gray-600">
                            <Clock className="w-3 h-3 mr-1 text-gray-400" />
                            {offer.timeAgo}
                          </Badge>
                        </div>
                        <h4 className="text-sm font-medium text-[#e74f05] mb-2">{offer.projectType}</h4>
                        <p className="text-sm text-gray-300 mb-3">{offer.description}</p>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center text-sm font-semibold text-[#e74f05]">
                            <DollarIcon className="w-4 h-4 mr-1" />
                            ${offer.budget}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" className="bg-[#e74f05] hover:bg-[#e74f05]/90 text-white border border-[#e74f05] hover:border-[#e74f05]/90 transition-colors">
                        Aceptar
                      </Button>
                      <Button size="sm" variant="outline" className="text-white border-gray-600 hover:bg-[#e74f05] hover:border-[#e74f05] transition-colors">
                        <MessageIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="space-y-4">
            {activeOffers.map((offer) => (
              <Card key={offer.id} className="bg-[#0f172a] border border-gray-700 hover:border-[#bb00aa]/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <img 
                        src={offer.clientImage}
                        alt={offer.clientName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-white">{offer.clientName}</h3>
                          <Badge className="bg-[#e74f05]/20 text-[#e74f05] border-[#e74f05]/30">
                            En progreso
                          </Badge>
                        </div>
                        <h4 className="text-sm font-medium text-[#e74f05] mb-2">{offer.projectType}</h4>
                        <p className="text-sm text-gray-300 mb-3">{offer.description}</p>
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="flex items-center text-sm font-semibold text-[#e74f05]">
                            <DollarIcon className="w-4 h-4 mr-1" />
                            ${offer.budget}
                          </span>
                          <span className="text-sm text-gray-400">
                            Entrega en {offer.deadline}
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-[#e74f05] h-2 rounded-full transition-all"
                            style={{ width: `${offer.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          <span className="font-semibold">{offer.progress}%</span> completado
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline" className="text-white border-gray-600 hover:bg-[#e74f05] hover:border-[#e74f05] transition-colors">
                        Ver detalles
                      </Button>
                      <Button size="sm" variant="outline" className="text-white border-gray-600 hover:bg-[#e74f05] hover:border-[#e74f05] transition-colors">
                        <MessageIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="space-y-4">
            {completedOffers.map((offer) => (
              <Card key={offer.id} className="bg-[#0f172a] border border-gray-700 hover:border-[#bb00aa]/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <img 
                        src={offer.clientImage}
                        alt={offer.clientName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-white">{offer.clientName}</h3>
                          <Badge className="bg-[#e74f05]/20 text-[#e74f05] border-[#e74f05]/30">
                            Completado
                          </Badge>
                        </div>
                        <h4 className="text-sm font-medium text-[#e74f05] mb-2">{offer.projectType}</h4>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center text-sm font-semibold text-[#e74f05]">
                            <DollarIcon className="w-4 h-4 mr-1" />
                            ${offer.budget}
                          </span>
                          <span className="text-sm text-gray-400">
                            Completado hace {offer.completedDate}
                          </span>
                          <div className="flex items-center">
                            {[...Array(offer.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400">★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline" className="text-white border-gray-600 hover:bg-[#e74f05] hover:border-[#e74f05] transition-colors">
                        Ver proyecto
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
