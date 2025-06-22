import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import NavigationHeader from "@/components/navigation-header";

import { UserProfileHeader } from "./components/UserProfileHeader";
import { ProfileTabs } from "./components/ProfileTabs";
import PortfolioView from "./components/portfolio";
import { 
  BlogView, 
  EventsView, 
  OffersView, 
  RecommendationsView, 
  SettingsView 
} from "./components/sections";
import { EditProfileDialog } from "./dialogs/EditProfileDialog";
import { UserTypeDialog } from "./dialogs/UserTypeDialog";
import { CreateEventDialog } from "./dialogs/CreateEventDialog";
import { CreateRecommendationDialog } from "./dialogs/CreateRecommendationDialog";

export default function UserProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("portfolio");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showRecommendationDialog, setShowRecommendationDialog] = useState(false);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showChangeTypeDialog, setShowChangeTypeDialog] = useState(false);

  const currentUserType = (user?.userType || "general") as "general" | "artist" | "company";

  return (
    <div className="min-h-screen bg-black text-white">
      <NavigationHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Contenido principal */}
          <div className="w-full lg:w-3/4">
            <UserProfileHeader 
              user={user}
              currentUserType={currentUserType}
              onEdit={() => setShowEditDialog(true)}
            />
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="mt-6"
            >
              <ProfileTabs 
                onPortfolioClick={() => setActiveTab("portfolio")}
                activeTab={activeTab}
              />
              
              <div className="mt-6">
                <TabsContent value="portfolio">
                  <PortfolioView />
                </TabsContent>

                <TabsContent value="blog">
                  <BlogView />
                </TabsContent>

                <TabsContent value="events">
                  <EventsView onCreate={() => setShowEventDialog(true)} />
                </TabsContent>

                <TabsContent value="recommendations">
                  <RecommendationsView onCreate={() => setShowRecommendationDialog(true)} />
                </TabsContent>

                <TabsContent value="offers">
                  <OffersView />
                </TabsContent>

                <TabsContent value="settings">
                  <SettingsView onChangeType={() => setShowChangeTypeDialog(true)} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
          {/* Columna derecha - Sidebar */}
          <div className="w-full md:w-1/4 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-4">Información de contacto</h3>
              <p className="text-sm text-gray-600">
                Aquí puedes agregar información adicional, estadísticas o cualquier otro contenido relevante para la barra lateral.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-4">Eventos próximos</h3>
              <p className="text-sm text-gray-600">
                Próximamente: Lista de eventos programados.
              </p>
            </div>
          </div>
        </div>
      </div>

      <EditProfileDialog open={showEditDialog} onClose={() => setShowEditDialog(false)} />
      <UserTypeDialog
        open={showChangeTypeDialog}
        onClose={() => setShowChangeTypeDialog(false)}
        currentUserType={currentUserType}
      />
      <CreateEventDialog open={showEventDialog} onClose={() => setShowEventDialog(false)} />
      <CreateRecommendationDialog
        open={showRecommendationDialog}
        onClose={() => setShowRecommendationDialog(false)}
      />
    </div>
  );
}
