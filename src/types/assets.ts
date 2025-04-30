export interface AssetVersion {
  version: string;
  timestamp: number;
}

export interface AssetVersionInfo {
  category: string;
  language: string;
  version: string;
  checksum: string;
  active: boolean;
}

export interface AssetVersionResponse {
  success: boolean;
  version?: string;
  error?: string;
}