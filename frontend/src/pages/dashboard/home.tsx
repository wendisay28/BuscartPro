"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Post, User } from "./types";

// Components
import { UserProfileCard } from "./components/profile/UserProfileCard";
import { QuickAccessMenu } from "./components/sidebar/QuickAccessMenu";
import CreatePost from "./components/posts/CreatePost";
import { CreatePostModal } from "./components/posts/CreatePostModal";
import { CreateBlogPost } from "./components/posts/CreateBlogPost";
import { Microspaces } from "./components/posts/Microspaces";
import { PostList } from "./components/posts/PostList";
import { SuggestedArtists } from "./components/sidebar/SuggestedArtists";
import { VerificationBanner } from "./components/sidebar/VerificationBanner";
import { MobilePostComposer } from "./components/posts/MobilePostComposer";

// Hooks
import { usePosts } from "./hooks/usePosts";

export default function Home() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"post" | "nota" | "blog">("post");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  const { posts, addPost } = usePosts([
    {
      id: "1",
      content: "¡Bienvenido a BuscArt! Comparte tus creaciones y conecta con otros artistas.",
      author: {
        id: "system",
        firstName: "BuscArt",
        lastName: "Team",
        userType: "general",
      },
      createdAt: new Date(),
      likes: 42,
      comments: 7,
      type: "nota",
    },
  ]);

  const handlePostCreated = (content: string, file?: File) => {
    const newPost: Omit<Post, "id" | "createdAt" | "likes" | "comments"> & { author: User } = {
      content,
      type: activeTab === "blog" ? "blog" : activeTab === "nota" ? "nota" : "post",
      author: {
        id: user?.id || "anonymous",
        firstName: user?.firstName || "Usuario",
        lastName: user?.lastName || "Anónimo",
        userType: user?.userType || "general",
        avatar: user?.avatar,
      },
      mediaUrl: file ? URL.createObjectURL(file) : undefined,
    };
    
    addPost(newPost);
    console.log("Nuevo post:", content, file);
    setIsPostModalOpen(false);
  };


  const openPostModal = () => {
    setIsPostModalOpen(true);
    setActiveTab("post");
  };

  const openBlogModal = () => {
    setIsBlogModalOpen(true);
    setActiveTab("blog");
  };

  return (
    <div className="min-h-screen bg-black text-white py-4 sm:py-6">
      <div className="w-full px-4 sm:px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_250px] gap-6">
        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:block space-y-4">
          <UserProfileCard />
          <QuickAccessMenu />
        </aside>

        {/* MAIN CONTENT */}
        <div className="relative">
          <main className="space-y-0 w-full">
            {/* Microespacios */}
            <div className="mt-2">
              <Microspaces />
            </div>

            {/* Contenedor de Crear Publicación */}
            <div className="w-full">
              {/* Desktop Post Composer - Hidden on mobile */}
              <div className="hidden md:block">
                <CreatePost 
                  onPostCreated={handlePostCreated} 
                  openPostModal={openPostModal}
                  openBlogModal={openBlogModal}
                />
              </div>

              {/* Pestañas de navegación para escritorio */}
              <div className="hidden md:block w-full border-b border-gray-800 mt-4">
                <div className="grid grid-cols-3">
                  {[
                    { label: "Post", value: "post" as const },
                    { label: "Nota", value: "nota" as const },
                    { label: "Blog", value: "blog" as const },
                  ].map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => setActiveTab(tab.value)}
                      className={`relative py-3 text-sm font-medium transition-colors duration-200 ${
                        activeTab === tab.value
                          ? 'text-white'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <span>{tab.label}</span>
                        {activeTab === tab.value && (
                          <div className="absolute bottom-0 w-1/3 h-0.5 bg-[#a020f0] rounded-full"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Post Composer - Only visible on mobile */}
              <div className="md:hidden">
                <MobilePostComposer 
                  onPostCreated={handlePostCreated}
                  onNoteCreated={handlePostCreated}
                  onBlogCreated={handlePostCreated}
                />
              </div>

              {/* Barra de navegación móvil */}
              <div className="md:hidden w-full border-b border-gray-800">
                <div className="flex items-center justify-around py-2">
                  {[
                    { label: "Post", value: "post" as const },
                    { label: "Nota", value: "nota" as const },
                    { label: "Blog", value: "blog" as const },
                  ].map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => setActiveTab(tab.value)}
                      className={`relative px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                        activeTab === tab.value
                          ? 'text-white'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.value && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-[#a020f0] rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <PostList posts={posts} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </main>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:block space-y-6">
          <SuggestedArtists />
          <VerificationBanner />
        </aside>
      </div>

      {/* Modales */}
      <CreatePostModal 
        open={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
      
      <CreateBlogPost 
        open={isBlogModalOpen}
        onClose={() => setIsBlogModalOpen(false)}
        userName={user?.firstName || 'Usuario'}
      />
    </div>
  );
}
