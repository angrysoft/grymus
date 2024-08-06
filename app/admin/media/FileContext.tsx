"use client";
import { ReactNode, createContext, useState } from "react";

interface IFilesContext {
  loading: boolean;
  setLoading: (state:boolean) => void;
  needRefresh: boolean;
  setNeedRefresh: (state: boolean) => void;
  showDeleteConfirm: boolean
  setShowDeleteConfirm: (state:boolean) => void;
  offset: number;
  items: number;
}

const FileContext = createContext<IFilesContext | null>(null);

const FileProvider = ({ children }: { children: ReactNode }) => {
  const [needRefresh, setNeedRefresh] = useState(true);
  const [cursor, serCursor] = useState({ offset: 0, items: 10 });
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


  return (
    <FileContext.Provider
      value={{
        loading: loading,
        setLoading: setLoading,
        needRefresh: needRefresh,
        setNeedRefresh: setNeedRefresh,
        showDeleteConfirm: showDeleteConfirm,
        setShowDeleteConfirm: setShowDeleteConfirm, 
        offset: cursor.offset,
        items: cursor.items,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export { FileContext, FileProvider };
export type { IFilesContext  };
