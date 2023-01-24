import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import ShowEvses from './ShowEvses';
import EvseDto from './models/EvseDto';

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
        id: 13,
        uid: '32536',
        name: 'kolonka13',
        evseId: 'BE*BEC*E0415032001',
        status: 'AVAILABLE',
        latitude: '27.9247',
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
    <div className="flex">
      <div className="absolute right-16 z-20 mt-10  flex flex-col gap-2 rounded-2xl bg-white p-3 pt-5 pb-8">
        <p onClick={() => console.log('foo')}>Hello Lyubo!</p>
        <p>Here there will be a switch</p>
        <p>And some filters</p>
      </div>
      <MapContainer className="h-screen w-full z-0" center={[42.8, 24.5]} zoom={8}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ShowEvses data={data?.content} />
      </MapContainer>
    </div>
  );
}

interface Pagination<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export default Map;
