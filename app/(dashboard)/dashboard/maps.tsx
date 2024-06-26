'use client';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';

interface MapsInterface {
  id: number;
  customerName: string;
  startPoint: string;
  endPoint: string;
  updateAt: Date;
}

export default function MapsDashboard() {
  const [dataTable, setDataTable] = useState<MapsInterface[]>([]);
  const [mapUrl, setMapUrl] = useState('');
  const [loadingTable, setLoadingTable] = useState(false);

  const fetchDataTable = async () => {
    try {
      setLoadingTable(true);
      const response = await axios.get('https://routes-maps-api.vercel.app/api/v1/maps/');
      const data = response.data;
      setDataTable(data);
      setLoadingTable(false);
    } catch (error) {
      setLoadingTable(false);
    }
  };

  const generateMapUrl = (
    startPoint: MapsInterface['startPoint'],
    endPoint: MapsInterface['endPoint']
  ) => {
    setMapUrl('');
    if (!startPoint) return null;
    if (!endPoint) return null;
    const baseUrl = 'https://www.google.com/maps/embed/v1/directions';
    const apiKey = 'AIzaSyBY7RvKARXQeHEsqj4Jh0SRJfZmJ5N052A';
    const url = `${baseUrl}?key=${apiKey}&origin=${encodeURIComponent(
      startPoint
    )}&destination=${encodeURIComponent(endPoint)}`;
    setMapUrl(url);
  };

  useEffect(() => {
    fetchDataTable();
  }, []);

  return (
    <>
      <Tabs defaultValue="SuasRotas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="SuasRotas">Suas Rotas</TabsTrigger>
          <TabsTrigger value="NovaRota">Nova Rota</TabsTrigger>
        </TabsList>
        <TabsContent value="SuasRotas" className="space-y-4">
          <div>
            {/* maps here */}
            {mapUrl && (
              <>
                Rota Selecionada:
                <iframe
                  src={mapUrl}
                  width="600"
                  height="450"
                  style={{ borderRadius: '12px', width: '100%' }}
                  loading="lazy"
                ></iframe>
              </>
            )}
          </div>
          <div>
            <Table style={{ minWidth: '1100px' }}>
              <TableCaption style={{ marginTop: '20px', marginBottom: '20px' }}>
                Lista de suas rotas recentes.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">id</TableHead>
                  <TableHead className="w-[200px]">Nome do Cliente</TableHead>
                  <TableHead>Ponto de Partida</TableHead>
                  <TableHead>Ponto de Destino</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="w-[110px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataTable.length > 0 &&
                  dataTable?.map((data) => (
                    <TableRow key={data?.id}>
                      <TableCell className="font-medium">{data?.id}</TableCell>

                      <TableCell>{data?.customerName}</TableCell>

                      <TableCell>{data?.startPoint}</TableCell>

                      <TableCell>{data?.endPoint}</TableCell>

                      <TableCell>
                        {new Date(data?.updateAt).toLocaleString('pt-BR')}
                      </TableCell>

                      <TableCell>
                        <Button
                          onClick={() =>
                            generateMapUrl(data.startPoint, data.endPoint)
                          }
                        >
                          Ver Rota
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="NovaRota" className="space-y-4">
          Nova rota
        </TabsContent>
      </Tabs>
    </>
  );
}
