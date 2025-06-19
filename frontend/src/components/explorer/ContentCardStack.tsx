import React from 'react';

type ExplorerView = 'artistas' | 'eventos' | 'sitios' | 'galeria';

interface ContentCardStackProps {
  activeView: ExplorerView;
}

const ContentCardStack: React.FC<ContentCardStackProps> = ({ activeView }) => {
  let contentTitle = '';
  let contentTypeDescription = '';

  switch (activeView) {
    case 'artistas':
      contentTitle = 'Artistas Destacados';
      contentTypeDescription = 'Aquí se mostrarán tarjetas interactivas de artistas.';
      break;
    case 'eventos':
      contentTitle = 'Próximos Eventos';
      contentTypeDescription = 'Aquí se mostrarán tarjetas interactivas de eventos.';
      break;
    case 'sitios':
      contentTitle = 'Sitios Populares';
      contentTypeDescription = 'Aquí se mostrarán tarjetas interactivas de sitios.';
      break;
    case 'galeria':
      contentTitle = 'Galería de Inspiración';
      contentTypeDescription = 'Aquí se mostrará un feed de contenido visual e inspirador.';
      break;
    default:
      contentTitle = 'Contenido';
      contentTypeDescription = 'Selecciona una pestaña para ver el contenido.';
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-card rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-foreground mb-3">{contentTitle}</h2>
      <p className="text-muted-foreground text-center mb-6">
        {contentTypeDescription}
      </p>
      <div className="text-sm text-blue-500 dark:text-blue-400">
        (Componente: ContentCardStack.tsx)
      </div>
      {activeView !== 'galeria' && (
        <p className="mt-4 text-xs text-muted-foreground">
          (Futura implementación: Navegación tipo Tinder con swipe)
        </p>
      )}
      {activeView === 'galeria' && (
        <p className="mt-4 text-xs text-muted-foreground">
          (Futura implementación: Feed de recomendaciones tipo LinkedIn)
        </p>
      )}
    </div>
  );
};

export default ContentCardStack;
