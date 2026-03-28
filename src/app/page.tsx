import { getCompanies, getAgents, buildOrgTree } from '@/lib/api';
import { OrgChart } from '@/components/org-tree';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';
export const revalidate = 30;

export default async function Dashboard() {
  const companies = await getCompanies();
  const primaryCompany = companies[0];
  
  if (!primaryCompany) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold mb-4">No Companies Found</h1>
          <p className="text-zinc-400">Configure a company in Paperclip to get started.</p>
        </div>
      </main>
    );
  }
  
  const agents = await getAgents(primaryCompany.id);
  const orgTree = buildOrgTree(agents);
  
  const statusCounts = agents.reduce((acc, agent) => {
    acc[agent.status] = (acc[agent.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-lg font-bold">
                  📎
                </div>
                <div>
                  <h1 className="text-xl font-bold">{primaryCompany.name}</h1>
                  <p className="text-sm text-zinc-400">Paperclip Dashboard</p>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">Agents:</span>
                <span className="font-medium">{agents.length}</span>
              </div>
              <div className="h-4 w-px bg-zinc-700" />
              <div className="flex items-center gap-2">
                {statusCounts.idle && (
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                    {statusCounts.idle} idle
                  </Badge>
                )}
                {statusCounts.busy && (
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                    {statusCounts.busy} busy
                  </Badge>
                )}
                {statusCounts.error && (
                  <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30">
                    {statusCounts.error} error
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Company Description */}
      {primaryCompany.description && (
        <div className="border-b border-zinc-800 bg-zinc-900/30">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-3">
            <p className="text-sm text-zinc-400">{primaryCompany.description}</p>
          </div>
        </div>
      )}
      
      {/* Org Chart */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <h2 className="text-lg font-semibold mb-6 text-zinc-300">Organization Structure</h2>
        <OrgChart nodes={orgTree} />
      </div>
      
      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-auto">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 text-center text-xs text-zinc-500">
          Paperclip Agent Management • Data refreshes every 30s
        </div>
      </footer>
    </main>
  );
}
