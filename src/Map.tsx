import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import ShowEvses from './ShowEvses';

function Map() {
  const [data] = useState<Pagination<EvseDto>>({
    totalElements: 5,
    content: [
      {
        id: 1,
        uid: '3256',
        name: 'kolonka1',
        evseId: 'BE*BEC*E041503001',
        status: 'AVAILABLE',
        latitude: '27.9147',
        longitude: '43.2141',
        capabilities: [
          {
            id: 3,
            type: 'CHIP_CARD_SUPPORT',
            description: 'EVSE has a payment terminal that supports chip cards'
          },
          {
            id: 1,
            type: 'CHARGING_PROFILE_CAPABLE',
            description: 'The EVSE supports charging profiles'
          }
        ],
        connectors: [
          {
            id: 1,
            standard: 'IEC_62196_T2',
            format: 'CABLE',
            powerType: 'AC_3_PHASE',
            evse: 1,
            maxVoltage: 220,
            maxAmperage: 16,
            lastUpdated: '2023-01-21T17:18:28'
          }
        ],
        tenant: 2,
        partition: 2,
        lastUpdated: '2023-01-21T17:18:28'
      },
      {
        id: 2,
        uid: '3257',
        name: 'kolonka2',
        evseId: 'BE*BEC*E041503002',
        status: 'AVAILABLE',
        latitude: '27.9147',
        longitude: '43.2141',
        capabilities: [
          {
            id: 3,
            type: 'CHIP_CARD_SUPPORT',
            description: 'EVSE has a payment terminal that supports chip cards'
          }
        ],
        connectors: [
          {
            id: 3,
            standard: 'IEC_60309_2_single_16',
            format: 'SOCKET',
            powerType: 'AC_1_PHASE',
            evse: 2,
            maxVoltage: 220,
            maxAmperage: 20,
            lastUpdated: '2023-01-21T17:18:28'
          },
          {
            id: 2,
            standard: 'CHADEMO',
            format: 'SOCKET',
            powerType: 'AC_3_PHASE',
            evse: 2,
            maxVoltage: 220,
            maxAmperage: 16,
            lastUpdated: '2023-01-21T17:18:28'
          }
        ],
        tenant: 3,
        partition: 2,
        lastUpdated: '2023-01-21T17:18:28'
      },
      {
        id: 3,
        uid: '3258',
        name: 'kolonka3',
        evseId: 'BE*BEC*E041503003',
        status: 'AVAILABLE',
        latitude: '27.9147',
        longitude: '43.2141',
        capabilities: [
          {
            id: 1,
            type: 'CHARGING_PROFILE_CAPABLE',
            description: 'The EVSE supports charging profiles'
          }
        ],
        connectors: [],
        tenant: 3,
        partition: 2,
        lastUpdated: '2023-01-21T17:18:28'
      },
      {
        id: 2540,
        uid: '3280',
        status: 'AVAILABLE',
        latitude: '24.6067',
        longitude: '43.4170',
        capabilities: [],
        connectors: [],
        tenant: 2,
        partition: 2,
        location: 1,
        lastUpdated: '2023-01-21T17:18:28'
      },
      {
        id: 2541,
        uid: '3292',
        name: 'kolonka1',
        evseId: 'BE*BEC*E041503221',
        status: 'AVAILABLE',
        latitude: '24.6067',
        longitude: '43.4170',
        capabilities: [],
        connectors: [],
        tenant: 2,
        partition: 2,
        location: 1,
        lastUpdated: '2023-01-21T17:18:28'
      }
    ],
    pageNumber: 0,
    pageSize: 999,
    totalPages: 1
  });

  return (
    <MapContainer className="h-screen w-full" center={[42.8, 24.5]} zoom={8}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ShowEvses data={data?.content} />
    </MapContainer>
  );
}

interface Pagination<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

type EvseDto = {
  id: number;
  uid: string;
  name?: string;
  evseId?: string;
  status: any;
  latitude?: string;
  longitude?: string;
  address?: string;
  description?: string;
  capabilities?: any[];
  connectors?: any[];
  tenant: number;
  partition?: number;
  location?: number;
  lastUpdated: any;
};

export default Map;