import { Company, Agent, OrgNode } from './types';

const API_BASE = 'https://paperclip.braelin.uk/api';

export async function getCompanies(): Promise<Company[]> {
  const res = await fetch(`${API_BASE}/companies`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error('Failed to fetch companies');
  return res.json();
}

export async function getAgents(companyId: string): Promise<Agent[]> {
  const res = await fetch(`${API_BASE}/companies/${companyId}/agents`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error('Failed to fetch agents');
  return res.json();
}

export function buildOrgTree(agents: Agent[]): OrgNode[] {
  const agentMap = new Map<string, OrgNode>();
  
  // Create nodes for all agents
  agents.forEach(agent => {
    agentMap.set(agent.id, { ...agent, children: [] });
  });
  
  const roots: OrgNode[] = [];
  
  // Build tree structure
  agentMap.forEach(node => {
    if (node.reportsTo && agentMap.has(node.reportsTo)) {
      agentMap.get(node.reportsTo)!.children.push(node);
    } else {
      roots.push(node);
    }
  });
  
  return roots;
}
