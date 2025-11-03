// Local GTA V JSON data utilities

import vehiclesData from '../data/gta-v-data-dumps-master/vehicles.json';
import weaponsData from '../data/gta-v-data-dumps-master/weapons.json';
import pedsData from '../data/gta-v-data-dumps-master/peds.json';

export interface Vehicle {
  Name: string;
  DisplayName: {
    English: string;
    [key: string]: string | number;
  };
  Hash: number;
  SignedHash: number;
  HexHash: string;
  DlcName: string;
  HandlingId: string;
  LayoutId: string;
  Manufacturer: string;
  ManufacturerDisplayName: {
    English: string;
    [key: string]: string | number;
  };
  Class: string;
  ClassId: number;
  Type: string;
  PlateType: string;
  DashboardType: string;
  WheelType: string;
  [key: string]: any;
}

export interface Weapon {
  Name: string;
  TranslatedLabel: {
    English: string;
    [key: string]: string | number;
  };
  Hash: number;
  IntHash: number;
  DlcName: string;
  Category: string;
  ModelName: string | null;
  AmmoType: string;
  DamageType: string;
  [key: string]: any;
}

export interface Ped {
  Name: string;
  TranslatedDirectorName: {
    English: string;
    [key: string]: string | number;
  };
  Hash: number;
  SignedHash: number;
  HexHash: string;
  DlcName: string;
  Pedtype: string;
  [key: string]: any;
}

// Type guards
export function isVehicle(data: any): data is Vehicle {
  return data && data.Name && data.DisplayName && data.Manufacturer !== undefined;
}

export function isWeapon(data: any): data is Weapon {
  return data && data.Name && data.TranslatedLabel && data.Category !== undefined;
}

export function isPed(data: any): data is Ped {
  return data && data.Name && data.TranslatedDirectorName && data.Pedtype !== undefined;
}

// Get all vehicles
export function getAllVehicles(): Vehicle[] {
  return vehiclesData as Vehicle[];
}

// Get all weapons
export function getAllWeapons(): Weapon[] {
  return weaponsData as Weapon[];
}

// Get all peds (characters)
export function getAllPeds(): Ped[] {
  return pedsData as Ped[];
}

// Filter vehicles
export function filterVehicles(query: string): Vehicle[] {
  const vehicles = getAllVehicles();
  if (!query) return vehicles;
  
  const lowerQuery = query.toLowerCase();
  return vehicles.filter(vehicle => 
    vehicle.DisplayName?.English?.toLowerCase().includes(lowerQuery) ||
    vehicle.Name.toLowerCase().includes(lowerQuery) ||
    vehicle.ManufacturerDisplayName?.English?.toLowerCase().includes(lowerQuery) ||
    vehicle.Class?.toLowerCase().includes(lowerQuery)
  );
}

// Filter weapons
export function filterWeapons(query: string): Weapon[] {
  const weapons = getAllWeapons();
  if (!query) return weapons;
  
  const lowerQuery = query.toLowerCase();
  return weapons.filter(weapon =>
    weapon.TranslatedLabel?.English?.toLowerCase().includes(lowerQuery) ||
    weapon.Name.toLowerCase().includes(lowerQuery) ||
    weapon.Category?.toLowerCase().includes(lowerQuery)
  );
}

// Filter peds
export function filterPeds(query: string): Ped[] {
  const peds = getAllPeds();
  if (!query) return peds;
  
  const lowerQuery = query.toLowerCase();
  return peds.filter(ped =>
    ped.TranslatedDirectorName?.English?.toLowerCase().includes(lowerQuery) ||
    ped.Name.toLowerCase().includes(lowerQuery) ||
    ped.Pedtype?.toLowerCase().includes(lowerQuery)
  );
}

// Get vehicle by name
export function getVehicleByName(name: string): Vehicle | undefined {
  const vehicles = getAllVehicles();
  return vehicles.find(v => 
    v.Name.toLowerCase() === name.toLowerCase() ||
    v.DisplayName?.English?.toLowerCase() === name.toLowerCase()
  );
}

// Get weapon by name
export function getWeaponByName(name: string): Weapon | undefined {
  const weapons = getAllWeapons();
  return weapons.find(w =>
    w.Name.toLowerCase() === name.toLowerCase() ||
    w.TranslatedLabel?.English?.toLowerCase() === name.toLowerCase()
  );
}

// Get ped by name
export function getPedByName(name: string): Ped | undefined {
  const peds = getAllPeds();
  return peds.find(p =>
    p.Name.toLowerCase() === name.toLowerCase() ||
    p.TranslatedDirectorName?.English?.toLowerCase() === name.toLowerCase()
  );
}

