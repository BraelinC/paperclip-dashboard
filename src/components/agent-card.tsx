'use client';

import { Agent } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const statusColors: Record<string, string> = {
  idle: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  busy: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  error: 'bg-red-500/20 text-red-400 border-red-500/30',
  offline: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
};

const roleLabels: Record<string, string> = {
  ceo: 'CEO',
  cmo: 'CMO',
  cto: 'CTO',
  cfo: 'CFO',
  engineer: 'Engineer',
  designer: 'Designer',
  analyst: 'Analyst',
};

const roleIcons: Record<string, string> = {
  ceo: '👑',
  cmo: '📢',
  cto: '⚙️',
  cfo: '💰',
  engineer: '🔧',
  designer: '🎨',
  analyst: '📊',
};

interface AgentCardProps {
  agent: Agent;
  compact?: boolean;
}

export function AgentCard({ agent, compact = false }: AgentCardProps) {
  const endpointUrl = agent.adapterConfig?.url?.replace('wss://', 'https://').replace('ws://', 'http://') || 'N/A';
  
  if (compact) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 hover:border-zinc-700 transition-colors">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg">{roleIcons[agent.role] || '🤖'}</span>
            <span className="font-medium text-white truncate">{agent.name}</span>
          </div>
          <Badge variant="outline" className={statusColors[agent.status] || statusColors.offline}>
            {agent.status}
          </Badge>
        </div>
        <div className="mt-1 text-xs text-zinc-500">
          {roleLabels[agent.role] || agent.role.toUpperCase()}
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-zinc-900/50">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="text-2xl">{roleIcons[agent.role] || '🤖'}</div>
            <div className="min-w-0">
              <CardTitle className="text-lg text-white truncate">{agent.name}</CardTitle>
              <p className="text-sm text-zinc-400">{roleLabels[agent.role] || agent.role.toUpperCase()}</p>
            </div>
          </div>
          <Badge variant="outline" className={statusColors[agent.status] || statusColors.offline}>
            {agent.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <p className="text-xs text-zinc-500 uppercase tracking-wider">Endpoint</p>
          <code className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300 block truncate">
            {endpointUrl}
          </code>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-500">Budget</span>
          <span className="text-zinc-300">${(agent.budgetMonthlyCents / 100).toFixed(2)}/mo</span>
        </div>
        {agent.permissions?.canCreateAgents && (
          <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-xs">
            Can Create Agents
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
