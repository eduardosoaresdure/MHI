
import React from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

export default function MapaServicos({ servicos = [] }) {
  const unidadesValidas = servicos.filter((servico) => {
    return (
      servico.latitude != null &&
      servico.longitude != null &&
      Number.isFinite(Number(servico.latitude)) &&
      Number.isFinite(Number(servico.longitude))
    );
  });

  const obterCor = (tipo) => {
    const categoria = (tipo || '').toUpperCase();

    if (categoria.includes('AD')) return '#8B5CF6';
    if (categoria.includes('IA')) return '#0D9488';

    return '#168BC3';
  };

  return (
    <div
      style={{
        width: '100%',
        height: '400px',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid #C8DDED',
      }}
    >
      <MapContainer
        center={[-29.7175, -52.4258]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {unidadesValidas.map((servico) => {
          const latitude = Number(servico.latitude);
          const longitude = Number(servico.longitude);

          const linkMaps =
            `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

          return (
            <CircleMarker
              key={servico.id}
              center={[latitude, longitude]}
              radius={10}
              pathOptions={{
                color: '#FFFFFF',
                fillColor: obterCor(servico.tipo_servico),
                fillOpacity: 1,
                weight: 3,
              }}
            >
              <Popup>
                <div
                  style={{
                    minWidth: '190px',
                    fontFamily: 'Arial, sans-serif',
                    color: '#102D42',
                  }}
                >
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 'bold',
                      marginBottom: '7px',
                    }}
                  >
                    {servico.nome}
                  </div>

                  <div
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#E5F3FC',
                      color: '#087DBB',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      marginBottom: '9px',
                    }}
                  >
                    {servico.tipo_servico}
                  </div>

                  <div style={{ fontSize: '13px', lineHeight: '1.5' }}>
                    <strong>Endereço</strong>
                    <br />
                    {servico.endereco || 'Não informado'}
                  </div>

                  {servico.telefone && (
                    <div
                      style={{
                        fontSize: '13px',
                        marginTop: '8px',
                      }}
                    >
                      <strong>Telefone:</strong> {servico.telefone}
                    </div>
                  )}

                  <a
                    href={linkMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      marginTop: '12px',
                      padding: '9px',
                      backgroundColor: '#168BC3',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      textDecoration: 'none',
                      borderRadius: '7px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    Abrir no Google Maps
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
