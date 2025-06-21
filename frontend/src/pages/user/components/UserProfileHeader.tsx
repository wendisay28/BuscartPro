import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import { MapPin, Edit, Calendar, Brush, Palette, Sparkles, Users, Camera } from "lucide-react";
import { useState, useRef } from "react";
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

type Props = {
  user: any;
  currentUserType: "general" | "artist" | "company";
  onEdit: () => void;
};

export function UserProfileHeader({ user, currentUserType, onEdit }: Props) {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(2400); // 2.4K seguidores
  const imgRef = useRef<HTMLImageElement>(null);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result as string);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const size = Math.min(width, height);
    setCrop({
      unit: 'px',
      x: (width - size) / 2,
      y: (height - size) / 2,
      width: size,
      height: size,
    });
  };

  const getCroppedImg = (image: HTMLImageElement, crop: Crop): Promise<string> => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width!;
    canvas.height = crop.height!;
    const ctx = canvas.getContext('2d')!;

    ctx.drawImage(
      image,
      crop.x! * scaleX,
      crop.y! * scaleY,
      crop.width! * scaleX,
      crop.height! * scaleY,
      0,
      0,
      crop.width!,
      crop.height!
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const fileUrl = URL.createObjectURL(blob);
          resolve(fileUrl);
        },
        'image/jpeg',
        1
      );
    });
  };

  const handleCropComplete = async () => {
    if (imgRef.current && crop?.width && crop?.height) {
      const croppedImageUrl = await getCroppedImg(imgRef.current, crop);
      setProfileImage(croppedImageUrl);
      setShowCropModal(false);
      setImageToCrop(null);
    }
  };

  const displayName =
    currentUserType === "artist"
      ? "Carlos Mendoza"
      : currentUserType === "company"
      ? "Centro Cultural Arte"
      : `${user?.firstName || "Usuario"} ${user?.lastName || ""}`;

  const bio =
    currentUserType === "artist"
      ? "Especialista en ilustración digital con más de 8 años de experiencia creando arte conceptual para videojuegos y animación. Apasionado por dar vida a mundos fantásticos y transformar ideas en experiencias visuales inolvidables."
      : currentUserType === "company"
      ? "Espacio cultural dedicado a promover el arte local. Salas de eventos y exposiciones."
      : "Amante de la cultura y las artes. Siempre buscando nuevas experiencias artísticas.";

  const city = user?.city || "Medellín, Colombia";
  const userType = currentUserType === "general" ? "Usuario" : currentUserType === "artist" ? "Artista" : "Empresa";
  const userTypeColor = {
    general: "bg-blue-500",
    artist: "bg-[#e74f05]",
    company: "bg-purple-600"
  };

  return (
    <div className="w-full bg-[#141b2a] min-h-0 mt-0 mb-0">
      <div className="w-full bg-[#141b2a] rounded-xl shadow-md border border-gray-700 overflow-hidden">
        {/* Portada */}
        <div className="relative h-60 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] rounded-t-xl">
          {coverImage ? (
            <img
              src={coverImage}
              alt="Portada"
              className="w-full h-full object-cover opacity-90"
              onError={() => setCoverImage(null)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-[#e74c3c] to-[#e67e22]"></div>
          )}
          
          {/* Botón para editar portada */}
          <div className="absolute top-4 right-4">
            <label className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center">
              <Camera className="w-4 h-4" />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleCoverImageChange}
              />
            </label>
          </div>
          
          <div className="absolute left-4 md:left-6 bottom-[-3rem] md:bottom-[-3.5rem] group">
            <div className="relative">
              <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-white shadow-md">
                {profileImage ? (
                  <AvatarImage 
                    src={profileImage} 
                    alt={displayName}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="bg-orange-100 text-orange-600 text-2xl">
                  {user?.firstName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              
              {/* Botón para editar foto de perfil */}
              <div>
                <input 
                  id="profile-image-upload"
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
                <label 
                  htmlFor="profile-image-upload"
                  className="absolute -bottom-1 -right-1 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full cursor-pointer transition-all duration-200 border-2 border-[#141b2a] group-hover:opacity-100 opacity-0 flex items-center justify-center"
                >
                  <Camera className="w-3 h-3" />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="mt-2 px-4 md:px-6 pb-0" style={{ backgroundColor: '#141b2a' }}>
          <div className="flex justify-end gap-2 mb-4">
            <Button 
              onClick={onEdit} 
              variant="outline"
              className="w-36 py-2 h-10 rounded-lg text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <Edit className="w-4 h-4" />
              <span className="font-medium">Editar perfil</span>
            </Button>
            <Button 
              variant={isFollowing ? "outline" : "default"}
              className={`w-36 py-2 h-10 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                isFollowing 
                  ? 'border-[#e74f05] text-[#e74f05] hover:bg-[#e74f05]/10 hover:border-[#d14704] hover:text-[#d14704]' 
                  : 'bg-[#e74f05] hover:bg-[#d14704] text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:shadow-[#e74f05]/30'
              }`}
              onClick={() => {
                setIsFollowing(!isFollowing);
                setFollowersCount(prev => isFollowing ? prev - 1 : prev + 1);
              }}
            >
              {isFollowing ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Siguiendo
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Seguir
                </>
              )}
            </Button>
          </div>

          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            {displayName} 
            <span className={`${userTypeColor[currentUserType]}/20 text-${currentUserType === 'artist' ? '[#e74f05]' : currentUserType === 'company' ? 'purple-600' : 'blue-500'} border border-${currentUserType === 'artist' ? '[#e74f05]' : currentUserType === 'company' ? 'purple-600' : 'blue-500'} text-xs px-3 py-1 rounded-full`}>
              {userType}
            </span>
          </h1>
          
          <p className="text-gray-400 text-md">
            {currentUserType === "artist" 
              ? "Ilustrador Digital & Concept Artist" 
              : currentUserType === "company" 
                ? "Centro Cultural" 
                : "Entusiasta del arte"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-300 mt-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white/60" /> {city}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-white/80" /> 
              {currentUserType === "artist" 
                ? "Disponible: Lun-Vie · 9:00-18:00" 
                : currentUserType === "company"
                  ? "Horario: Mar-Dom · 10:00-20:00"
                  : "Activo ahora"}
            </div>
          </div>

          <p className="mt-2 text-gray-200 max-w-3xl">{bio}</p>

          {currentUserType === "artist" && (
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                { label: "Ilustración Digital", icon: <Brush className="w-4 h-4" /> },
                { label: "Concept Art", icon: <Palette className="w-4 h-4" /> },
                { label: "Character Design", icon: <Sparkles className="w-4 h-4" /> },
              ].map(({ label, icon }) => (
                <Badge
                  key={label}
                  className="bg-[#e74f05]/20 text-[#e74f05] border border-[#e74f05] flex items-center gap-1"
                >
                  {icon} {label}
                </Badge>
              ))}
            </div>
          )}

          <hr className="border-t border-gray-700 my-4" />

          <div className="flex flex-wrap gap-4 mt-2 mb-4 text-sm text-white">
            <div className="flex items-center gap-2">
              <span className="font-semibold">156</span> Proyectos Completados
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">4.9</span> 127 reseñas
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-white" />
              <span className="font-semibold">
                {followersCount >= 1000 
                  ? `${(followersCount / 1000).toFixed(1)}K` 
                  : followersCount}
              </span> Seguidores
            </div>
          </div>
        </div>
      </div>

      {/* Modal de recorte de imagen */}
      {showCropModal && imageToCrop && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-4">Ajusta tu foto de perfil</h3>
            <div className="relative max-h-[60vh] overflow-auto">
              <ReactCrop
                crop={crop}
                onChange={c => setCrop(c)}
                aspect={1}
                circularCrop
              >
                <img
                  ref={imgRef}
                  src={imageToCrop}
                  onLoad={onImageLoad}
                  alt="Recortar"
                  className="max-w-full"
                />
              </ReactCrop>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCropModal(false);
                  setImageToCrop(null);
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleCropComplete}>
                Aplicar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}