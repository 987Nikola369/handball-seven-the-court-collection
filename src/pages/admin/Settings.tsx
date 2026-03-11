import { AdminLayout } from "@/components/admin/AdminLayout";
import { Save, AlertTriangle } from "lucide-react";

export default function Settings() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-display uppercase tracking-widest font-black text-white">Store Settings</h2>
            <p className="text-white/60 font-body mt-1">Configure global store behavior</p>
          </div>
          <button className="bg-primary text-black flex items-center gap-2 font-display uppercase tracking-widest font-bold px-6 py-2 hover:bg-primary/90 transition-colors">
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {/* Shipping config */}
          <div className="bg-black border border-white/10 p-6 flex flex-col">
            <h3 className="text-xl font-display uppercase tracking-widest font-bold text-white mb-6 border-b border-white/10 pb-4">Shipping Rules</h3>
            <div className="space-y-4 font-body flex-1">
              <div>
                <label className="block text-white/50 text-xs font-display uppercase tracking-widest mb-2">Free Shipping Threshold (€)</label>
                <input 
                  type="number" 
                  defaultValue={100}
                  className="w-full bg-white/5 border border-white/10 text-white p-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-display uppercase tracking-widest mb-2">Standard Shipping Cost (€)</label>
                <input 
                  type="number" 
                  defaultValue={5}
                  className="w-full bg-white/5 border border-white/10 text-white p-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Integration config */}
          <div className="bg-black border border-white/10 p-6 flex flex-col relative overflow-hidden">
            <h3 className="text-xl font-display uppercase tracking-widest font-bold text-white mb-6 border-b border-white/10 pb-4">Database Connection</h3>
            
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 p-4 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-red-500 font-bold font-display uppercase tracking-widest text-sm">Supabase Disconnected</h4>
                <p className="text-red-500/70 text-xs mt-1 font-body">Please connect via Lovable UI to enable backend services.</p>
              </div>
            </div>

            <div className="space-y-4 font-body opacity-50 pointer-events-none">
              <div>
                <label className="block text-white/50 text-xs font-display uppercase tracking-widest mb-2">Project URL</label>
                <input 
                  type="text" 
                  placeholder="https://[project_id].supabase.co"
                  disabled
                  className="w-full bg-white/5 border border-white/10 text-white p-3 focus:outline-none focus:border-primary transition-colors cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-display uppercase tracking-widest mb-2">Anon Key</label>
                <input 
                  type="password" 
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5..."
                  disabled
                  className="w-full bg-white/5 border border-white/10 text-white p-3 focus:outline-none focus:border-primary transition-colors cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
