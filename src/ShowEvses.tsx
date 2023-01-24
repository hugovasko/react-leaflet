import React, { useCallback, useEffect, useState } from 'react';
import L, { point } from 'leaflet';
import useSupercluster from 'use-supercluster';
import { Marker, Popup, useMap } from 'react-leaflet';
import ClusterIcon from './assets/GreenDotIcon.svg';
import MarkerIcon from './assets/MarkerIcon.svg';
import { PointFeature } from 'supercluster';
import { GeoJsonProperties } from 'geojson';
import EvseDto from './models/EvseDto';

const ShowEvses: React.FC<ShowEvsesProps> = ({ data }) => {
  const maxZoom = 22;
  const [bounds, setBounds] = useState<GeoJSON.BBox | undefined>();
  const [zoom, setZoom] = useState(12);
  const map = useMap();

  // get map bounds
  const updateMap = () => {
    const bounds = map.getBounds();
    setBounds([
      bounds.getSouthWest().lng,
      bounds.getSouthWest().lat,
      bounds.getNorthEast().lng,
      bounds.getNorthEast().lat
    ]);
    setZoom(map.getZoom());
  };

  const onMove = useCallback(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);

  const points: Array<PointFeature<GeoJsonProperties>> = data.map((evse: EvseDto) => ({
    type: 'Feature',
    properties: { cluster: false, evseId: evse.id, category: 'evses' },
    geometry: {
      type: 'Point',
      coordinates: [parseFloat(evse.latitude || '0'), parseFloat(evse.longitude || '0')]
    }
  }));

  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds: bounds,
    zoom: zoom,
    options: { radius: 75, maxZoom: 17 }
  });

  const markerIcon = new L.Icon({
    iconUrl: MarkerIcon,
    iconSize: [45, 45]
  });

  const clusterIcon = function (cluster: any) {
    return L.divIcon({
      html: `<div class="flex items-center justify-center  relative">
        <img src="${ClusterIcon}" alt="cluster icon" class="h-9 object-cover relative"/>
        <span class="text-white text-sm font-medium absolute">${cluster.properties.point_count}</span>
        </div>`,
      className: 'bg-transparent'
    });
  };

  const logEvseInfo = (markerData: EvseDto | undefined) => {
    console.log(markerData);
  };

  return (
    <>
      {clusters.map((cluster) => {
        // every cluster point has coordinates
        const [longitude, latitude] = cluster.geometry.coordinates;
        // the point may be either a cluster or a crime point
        const { cluster: isCluster } = cluster.properties as { cluster: boolean };

        // we have a cluster to render
        if (isCluster && supercluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={clusterIcon(cluster)}>
              <Popup>
                {supercluster.getLeaves(Number(cluster.id)).map((c) => {
                  const markerData = data.find((evse) => evse.id === c?.properties?.evseId);
                  return (
                    <div
                      key={c?.properties?.evseId}
                      className="flex flex-col gap-0"
                      onClick={() => logEvseInfo(markerData)}>
                      {markerData?.name || 'No name'}
                    </div>
                  );
                })}
              </Popup>
            </Marker>
          );
        }

        // we have a single point (crime) to render
        const markerId: number = cluster?.properties?.evseId;
        const markerData = data.find((evse) => evse.id === markerId);
        return (
          <Marker position={[latitude, longitude]} icon={markerIcon}>
            <Popup>
              <div className="flex flex-col gap-0">
                <div>{markerData?.name}</div>
                <div>{markerData?.id}</div>
                <div>{markerData?.uid}</div>
                <div>{markerData?.evseId}</div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

interface ShowEvsesProps {
  data: EvseDto[];
}

export default ShowEvses;
