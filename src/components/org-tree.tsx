'use client';

import { OrgNode } from '@/lib/types';
import { AgentCard } from './agent-card';

interface OrgTreeProps {
  nodes: OrgNode[];
  level?: number;
}

export function OrgTree({ nodes, level = 0 }: OrgTreeProps) {
  return (
    <div className="space-y-4">
      {nodes.map((node) => (
        <div key={node.id} className="relative">
          {/* Connection lines for desktop */}
          {level > 0 && (
            <div className="hidden md:block absolute -left-8 top-1/2 w-8 h-px bg-zinc-700" />
          )}
          
          {/* Node card */}
          <div className={level === 0 ? '' : 'md:ml-8'}>
            <AgentCard agent={node} compact={level > 0} />
          </div>
          
          {/* Children */}
          {node.children.length > 0 && (
            <div className="relative mt-4 pl-4 md:pl-8 border-l-2 border-zinc-800 md:ml-4">
              {/* Vertical connector on mobile */}
              <div className="md:hidden absolute left-0 top-0 h-full w-px bg-zinc-800" />
              
              <OrgTree nodes={node.children} level={level + 1} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function OrgChart({ nodes }: { nodes: OrgNode[] }) {
  if (nodes.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500">
        No agents found
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Mobile view - stacked tree */}
      <div className="md:hidden">
        <OrgTree nodes={nodes} />
      </div>
      
      {/* Desktop view - visual org chart */}
      <div className="hidden md:block">
        <div className="flex flex-col items-center gap-8">
          {nodes.map(ceo => (
            <div key={ceo.id} className="w-full max-w-4xl">
              {/* CEO Level */}
              <div className="flex justify-center mb-8">
                <div className="w-80">
                  <AgentCard agent={ceo} />
                </div>
              </div>
              
              {/* Reports */}
              {ceo.children.length > 0 && (
                <>
                  {/* Connector line down from CEO */}
                  <div className="flex justify-center mb-4">
                    <div className="w-px h-8 bg-zinc-700" />
                  </div>
                  
                  {/* Horizontal line connecting reports */}
                  {ceo.children.length > 1 && (
                    <div className="flex justify-center mb-4">
                      <div 
                        className="h-px bg-zinc-700" 
                        style={{ 
                          width: `${Math.min(ceo.children.length * 280, 800)}px` 
                        }} 
                      />
                    </div>
                  )}
                  
                  {/* Report cards */}
                  <div className="flex flex-wrap justify-center gap-6">
                    {ceo.children.map(report => (
                      <div key={report.id} className="relative">
                        {/* Vertical connector to horizontal line */}
                        {ceo.children.length > 1 && (
                          <div className="absolute left-1/2 -top-4 w-px h-4 bg-zinc-700" />
                        )}
                        <div className="w-64">
                          <AgentCard agent={report} />
                        </div>
                        
                        {/* Sub-reports */}
                        {report.children.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-zinc-800">
                            <div className="space-y-2">
                              {report.children.map(sub => (
                                <AgentCard key={sub.id} agent={sub} compact />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
