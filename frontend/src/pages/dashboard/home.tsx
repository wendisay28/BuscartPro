"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  Heart,
  Bookmark,
  MessageCircle,
  Calendar,
  Users,
  Star,
  Music,
  BookOpen,
  ThumbsUp,
  Edit3,
  MapPin,
  Award,
  Image,
  PenTool,
  Store,
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user } = useAuth();
  const [postContent, setPostContent] = useState("");

  const getPostTypeButtons = () => {
    const baseButtons = [
      { icon: Image, label: "Foto/Video", type: "media" },
      { icon: PenTool, label: "Post escrito", type: "text" },
    ];

    if (user?.userType === "artist") {
      return [
        ...baseButtons,
        { icon: Calendar, label: "Evento", type: "event" },
        { icon: Music, label: "Servicio", type: "service" },
      ];
    }

    if (user?.userType === "company") {
      return [
        ...baseButtons,
        { icon: Calendar, label: "Evento", type: "event" },
        { icon: Users, label: "Oportunidad", type: "opportunity" },
      ];
    }

    return [
      ...baseButtons,
      { icon: BookOpen, label: "Entrada de Blog", type: "blog" },
      { icon: ThumbsUp, label: "Recomendación", type: "recommendation" },
    ];
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-8 py-10">
      {/* LEFT SIDEBAR */}
      <aside className="hidden lg:block space-y-6">
        <Card className="bg-gray-900 border border-gray-800">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-xl font-bold">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </span>
            </div>
            <h3 className="text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              {user?.userType === "artist" && "Artista"}
              {user?.userType === "company" && "Empresa"}
              {user?.userType === "general" && "Usuario General"}
              {!user?.userType && "Invitado"}
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/user/profile">
                <Edit3 className="h-4 w-4 mr-2" /> Ver Perfil
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg">Accesos Rápidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { icon: Bookmark, label: "Guardados", href: "/user/favorites" },
              { icon: Users, label: "Grupos", href: "/community/groups" },
              { icon: BookOpen, label: "Blog", href: "/community/blog" },
              { icon: Store, label: "Tienda", href: "/marketplace" },
              { icon: Calendar, label: "Eventos", href: "/explorer/events" },
              { icon: Star, label: "Suscripciones", href: "/user/subscriptions" },
            ].map((item, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className="w-full justify-start text-left flex-nowrap"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </aside>

      {/* MAIN */}
      <main className="space-y-8">
        <Card className="bg-gray-900 border border-gray-800">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="font-bold">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </span>
              </div>
              <div className="flex-1">
                <Textarea
                  placeholder="¿Qué quieres compartir hoy?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <div className="flex flex-wrap gap-2 mt-4">
                  {getPostTypeButtons().map((button, idx) => {
                    const Icon = button.icon;
                    return (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 min-w-[130px] flex-shrink-0"
                      >
                        <Icon className="h-4 w-4" />{" "}
                        <span className="truncate">{button.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-8">
          <h2 className="text-xl font-semibold">Contenido de tus Favoritos</h2>
          {[1, 2, 3].map((_, idx) => (
            <Card key={idx} className="bg-gray-900 border border-gray-800">
              <CardContent className="p-6">
                <div className="flex gap-4 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-full"></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">María Fernández</h4>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">
                        hace 2 horas
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">Artista Musical</p>
                  </div>
                </div>
                <p className="mb-4">
                  ¡Emocionada de anunciar mi nuevo espectáculo acústico este sábado! 🎸✨
                </p>
                <div className="h-48 bg-gradient-to-br from-primary to-secondary rounded-lg mb-4"></div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-1 hover:text-red-500">
                      <Heart className="h-4 w-4" /> 24
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-500">
                      <MessageCircle className="h-4 w-4" /> 8
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary">
                      <Bookmark className="h-4 w-4" /> Guardar
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-gray-900 border border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  Últimas Entradas del Blog
                </CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/community/blog">Ver más</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((_, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-3 rounded-lg hover:bg-gray-800 transition"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-lg"></div>
                  <div className="flex-1">
                    <h4 className="font-medium">
                      Cómo preparar tu primera presentación en vivo
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Por Carlos Mendoza • hace 1 día
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Consejos clave para artistas que comienzan en el mundo en vivo...
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="space-y-6 hidden lg:block">
        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg">Artistas Sugeridos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Ana Rodríguez</h4>
                  <p className="text-xs text-gray-400">Bailarina</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="h-3 w-3 mr-1" /> Medellín
                  </div>
                </div>
                <Button size="sm" variant="outline">Seguir</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg">Eventos Sugeridos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((_, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-3 hover:shadow-md transition"
              >
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">Festival de Jazz</h4>
                    <p className="text-xs text-gray-400">15 de Abril</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <MapPin className="h-3 w-3 mr-1" /> Teatro Nacional
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary via-secondary to-accent text-white">
          <CardContent className="p-6 text-center">
            <Award className="h-8 w-8 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">
              ¡Únete a nuestro programa de artistas verificados!
            </h3>
            <p className="text-sm mb-4">
              Más visibilidad y credibilidad en la plataforma.
            </p>
            <Button variant="secondary" size="sm" className="w-full">
              Saber más
            </Button>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
