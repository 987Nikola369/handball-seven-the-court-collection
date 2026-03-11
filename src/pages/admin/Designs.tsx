import { AdminLayout } from "@/components/admin/AdminLayout";
import { ImagePlus, Trash2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Designs() {
  const [collections, setCollections] = useState([
    { id: 'classic', name: 'CLASSIC', count: 12, isVisible: true },
    { id: 'kids', name: 'KIDS', count: 4, isVisible: true },
    { id: 'vintage', name: 'VINTAGE', count: 6, isVisible: true },
  ]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-display uppercase tracking-widest font-black text-white">Design Management</h2>
            <p className="text-white/60 font-body mt-1">Upload flat PNG designs for the 3D configurator mapping</p>
          </div>
        </div>

        {/* Collections Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col) => (
            <div key={col.id} className="bg-black border border-white/10 flex flex-col">
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-lg font-display uppercase tracking-widest text-primary font-bold">{col.name}</h3>
                <button 
                  onClick={() => setCollections(collections.map(c => c.id === col.id ? { ...c, isVisible: !c.isVisible } : c))}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  {col.isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5 text-red-400" />}
                </button>
              </div>
              <div className="p-4 flex-1 flex flex-col items-center justify-center min-h-[160px]">
                <p className="text-4xl font-black text-white mb-2">{col.count}</p>
                <p className="text-white/50 font-display uppercase tracking-widest text-xs">Active Designs</p>
              </div>
              <div className="p-4 border-t border-white/10">
                <button className="w-full flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 text-white transition-colors font-display uppercase tracking-widest text-sm">
                  <ImagePlus className="w-4 h-4" /> Manage Grid
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Uploads Stub */}
        <div className="bg-black border border-white/10 p-6">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-display uppercase tracking-widest font-bold text-white">Recent Uploads</h3>
             <button className="bg-primary text-black font-display uppercase tracking-widest font-bold px-4 py-2 text-sm hover:bg-primary/90 transition-colors">
               Upload New +
             </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group relative aspect-square bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                <span className="text-white/20 font-display text-sm">Design {i}</span>
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none group-hover:pointer-events-auto">
                   <button className="p-2 bg-white/10 hover:bg-white/20 text-white pointer-events-auto transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                   <button className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-500 pointer-events-auto transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center text-white/30 text-xs font-display uppercase tracking-widest border-t border-dashed border-white/20 pt-4">
             [ Supabase Storage Bucket Integration Pending ]
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
