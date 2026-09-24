import { createContext, useContext, useState } from 'react';

interface PreviewCtx {
  isReturning: boolean;
  setIsReturning: (v: boolean) => void;
}

const Ctx = createContext<PreviewCtx>({ isReturning: false, setIsReturning: () => {} });

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [isReturning, setIsReturning] = useState(false);
  return <Ctx.Provider value={{ isReturning, setIsReturning }}>{children}</Ctx.Provider>;
}

export function usePreview() {
  return useContext(Ctx);
}
