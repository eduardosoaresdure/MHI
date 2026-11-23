
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

  return (
    <div style={{
      width: '100%',
      height: '400px',
      borderRadius: '14px',
      overflow: 'hidden',
      border: '1px solid #C8DDED',
    }}>
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

        {unidadesValidas.map((servico) => (
          <CircleMarker
            key={servico.id}
            center={[
              Number(servico.latitude),
              Number(servico.longitude),
            ]}
            radius={9}
            pathOptions={{
              color: '#FFFFFF',
              fillColor: '#168BC3',
              fillOpacity: 1,
              weight: 3,
            }}
          >
            <Popup>
              <strong>{servico.nome}</strong>
              <br />
              {servico.tipo_servico}
              <br />
              {servico.endereco}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
