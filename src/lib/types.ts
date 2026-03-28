export interface Company {
  id: string;
  name: string;
  description: string;
  status: string;
  issuePrefix: string;
  issueCounter: number;
  budgetMonthlyCents: number;
  spentMonthlyCents: number;
  requireBoardApprovalForNewAgents: boolean;
  brandColor: string | null;
  logoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  companyId: string;
  name: string;
  role: string;
  title: string | null;
  icon: string | null;
  status: 'idle' | 'busy' | 'error' | 'offline';
  reportsTo: string | null;
  capabilities: string | null;
  adapterType: string;
  adapterConfig: {
    url: string;
    authToken?: string;
    devicePrivateKeyPem?: string;
  };
  runtimeConfig: Record<string, unknown>;
  budgetMonthlyCents: number;
  spentMonthlyCents: number;
  pauseReason: string | null;
  pausedAt: string | null;
  permissions: {
    canCreateAgents: boolean;
  };
  lastHeartbeatAt: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  urlKey: string;
}

export interface OrgNode extends Agent {
  children: OrgNode[];
}
