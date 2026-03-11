import { AdminLayout } from "@/components/admin/AdminLayout";
import { Package, TrendingUp, Users, ShoppingCart } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { label: "Total Revenue", value: "€12,500.00", icon: TrendingUp },
    { label: "Active Products", value: "4", icon: Package },
    { label: "New Orders", value: "24", icon: ShoppingCart },
    { label: "Unique Visitors", value: "892", icon: Users },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-display uppercase tracking-widest font-black text-white">Dashboard Overview</h2>
          <p className="text-white/60 font-body">Welcome to the H7 Shop Administration</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-black border border-white/10 p-6 flex items-start justify-between">
                <div>
                  <p className="text-white/50 font-display uppercase tracking-widest text-xs mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                </div>
                <div className="p-3 bg-white/5 text-primary">
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Placeholder Area for Future Charts/Data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-black border border-white/10 p-6 min-h-[400px] flex flex-col">
            <h3 className="text-xl font-display uppercase tracking-widest font-bold text-white mb-4">Recent Sales</h3>
            <div className="flex-1 border border-dashed border-white/20 flex items-center justify-center text-white/30 font-display uppercase tracking-widest">
              [ Supabase Chart Placeholder ]
            </div>
          </div>
          
          <div className="bg-black border border-white/10 p-6 min-h-[400px] flex flex-col">
            <h3 className="text-xl font-display uppercase tracking-widest font-bold text-white mb-4">Latest Activity</h3>
            <div className="flex-1 flex flex-col gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <p className="text-sm text-white/80">Order #{1000 + i} placed</p>
                  <p className="text-xs text-white/40 mt-1">{i} hour(s) ago</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
