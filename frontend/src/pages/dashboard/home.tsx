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
  const [activeTab, setActiveTab] = useState<"all" | "micro" | "blog">("all");
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
      type: "micro",
    },
  ]);

  const handlePostCreated = (content: string, file?: File) => {
    const newPost: Omit<Post, "id" | "createdAt" | "likes" | "comments"> & { author: User } = {
      content,
      type: activeTab === "blog" ? "blog" : "micro",
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
    setActiveTab("all");
  };

  const openBlogModal = () => {
    setIsBlogModalOpen(true);
    setActiveTab("blog");
  };

  return (
    <div className="min-h-screen bg-black text-white py-6">
      <div className="w-full px-4 sm:px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_250px] gap-8">
        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:block space-y-6">
          <UserProfileCard />
          <QuickAccessMenu />
        </aside>

        {/* MAIN CONTENT */}
        <main className="space-y-8 w-full">
          {/* Microespacios sin restricción interna */}
          <Microspaces />

          {/* Contenedor de Crear Publicación */}
          <div className="w-full space-y-6">
            {/* Desktop Post Composer - Hidden on mobile */}
            <div className="hidden md:block">
              <CreatePost 
                onPostCreated={handlePostCreated} 
                openPostModal={openPostModal}
                openBlogModal={openBlogModal}
              />
            </div>
            
            {/* Mobile Post Composer - Only visible on mobile */}
            <div className="md:hidden">
              <MobilePostComposer 
                onPostCreated={handlePostCreated}
                onNoteCreated={handlePostCreated}
                onBlogCreated={handlePostCreated}
              />
            </div>

            <PostList posts={posts} activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </main>

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
