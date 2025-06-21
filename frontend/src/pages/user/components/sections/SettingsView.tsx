import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";

type Props = {
  onChangeType: () => void;
};

export function SettingsView({ onChangeType }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de Cuenta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium">Tipo de Cuenta</h3>
              <p className="text-sm text-gray-500">
                Actualmente eres: <span className="font-medium capitalize">
                  {new URLSearchParams(window.location.search).get('type') || 'general'}
                </span>
              </p>
            </div>
            <Button variant="outline" onClick={onChangeType}>
              Cambiar Tipo
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
