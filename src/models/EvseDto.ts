export default interface EvseDto {
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
}
