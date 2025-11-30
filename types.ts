import { ReactNode } from 'react';

export enum AppId {
  BILL_SYSTEM = 'BILL_SYSTEM',
  SPATIAL_GALLERY = 'SPATIAL_GALLERY',
  SYSTEM_MONITOR = 'SYSTEM_MONITOR',
  NOTES = 'NOTES',
  SETTINGS = 'SETTINGS',
  WEB_BROWSER = 'WEB_BROWSER',
  FILE_MANAGER = 'FILE_MANAGER'
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: Position;
  size: Size;
  content: ReactNode;
  icon: ReactNode;
}

export interface ShapeVector {
  c: number; // Correctness
  m: number; // Misconception
  f: number; // Fog
  k: number; // Confidence
}

export interface BillResponse {
  vector: ShapeVector;
  explanation: string;
}

export interface TourStep {
  target: 'center' | 'dock' | 'window' | 'status';
  title: string;
  description: string;
  targetId?: string;
}

export interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'file' | 'image' | 'doc';
    size?: string;
    date?: string;
    content?: string;
}