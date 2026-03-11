import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-display uppercase tracking-widest">Loading...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-5">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-display uppercase tracking-widest text-foreground">Access Denied</h1>
          <p className="text-muted-foreground font-body">You don't have admin privileges.</p>
          <a href="/" className="btn-primary inline-block">Go Home</a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
