'use client';

import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
}

export default function ClientOnly({ children }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="bg-[#e3dcd6] min-h-screen flex items-center justify-center">
        <div className="text-[#421d13] text-xl font-playfair">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
