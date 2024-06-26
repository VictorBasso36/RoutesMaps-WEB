import { Button } from '@/components/ui/button';
import MapsDashboard from './maps';

export default function page() {

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Mapas</h2>
        <div className="hidden items-center space-x-2 md:flex">
  
        </div>
      </div>
      <MapsDashboard />
    </div>
  );
}
