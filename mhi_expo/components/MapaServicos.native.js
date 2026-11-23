
import React from 'react';
import { View, Text } from 'react-native';

export default function MapaServicos() {
  return (
    <View style={{
      height: 180,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#E5F3FC',
      borderRadius: 14,
      padding: 20,
    }}>
      <Text style={{ color: '#123F70', fontWeight: 'bold' }}>
        Mapa de atendimento
      </Text>
      <Text style={{ color: '#587184', marginTop: 8 }}>
        Mapa interativo disponível na versão Web.
      </Text>
    </View>
  );
}
