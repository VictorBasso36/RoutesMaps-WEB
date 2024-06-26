import { Button } from '@/components/ui/button';
import MapsDashboard from './maps';

export default function page() {
  const now = new Date();
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  //@ts-ignore
  const dateTimeString = now.toLocaleString('pt-BR', options);

  return (

      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Mapas
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <p>{dateTimeString}</p>
            <Button disabled style={{backgroundColor: 'rgb(173, 250, 29)'}}>Download</Button>
          </div>
        </div>   
        <MapsDashboard />
      </div>

  );
}
