import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Search, Edit2, Archive, Check } from "lucide-react";
import { INITIAL_PRODUCTS } from "@/data/products";

export default function Products() {
  const [products] = useState(INITIAL_PRODUCTS);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-display uppercase tracking-widest font-black text-white">Product Management</h2>
            <p className="text-white/60 font-body mt-1">Manage catalog details, pricing, and 3D configs</p>
          </div>
          <button className="bg-primary text-black font-display uppercase tracking-widest font-bold px-6 py-2 hover:bg-primary/90 transition-colors">
            Add Product +
          </button>
        </div>

        {/* Search */}
        <div className="bg-black border border-white/10 p-2 flex items-center gap-2 max-w-md">
          <Search className="w-5 h-5 text-white/40 ml-2" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="bg-transparent border-none text-white w-full py-2 px-2 focus:outline-none font-body"
          />
        </div>

        {/* Products Table */}
        <div className="bg-black border border-white/10 overflow-x-auto">
          <table className="w-full text-left font-body">
            <thead className="border-b border-white/10 text-white/50 text-xs font-display uppercase tracking-widest">
              <tr>
                <th className="p-4 font-normal">Product</th>
                <th className="p-4 font-normal">Base Price</th>
                <th className="p-4 font-normal">Details</th>
                <th className="p-4 font-normal">Status</th>
                <th className="p-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(products).map(([id, product]) => (
                <tr key={id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-none overflow-hidden shrink-0">
                         {/* Thumbnail placeholder */}
                         <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
                      </div>
                      <div>
                        <p className="font-bold text-white">{product.name}</p>
                        <p className="text-xs text-white/50 uppercase tracking-widest mt-1">ID: {id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white font-medium">{product.price.toFixed(2)}€</td>
                  <td className="p-4 text-sm text-white/70">
                    <p>{product.sizes?.length || 0} Sizes</p>
                    <p className="mt-1">{product.colors?.length || 0} Colors</p>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-bold uppercase tracking-widest ${
                      product.stockStatus === 'instock' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {product.stockStatus === 'instock' && <Check className="w-3 h-3" />}
                      {product.stockStatus === 'instock' ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button className="p-2 text-white/50 hover:text-white hover:bg-white/10 transition-colors inline-block" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-white/50 hover:text-red-400 hover:bg-red-400/10 transition-colors inline-block" title="Archive">
                      <Archive className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 text-center border-t border-white/10 text-white/30 text-xs font-display uppercase tracking-widest">
             [ Supabase Data Source Pending ]
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
