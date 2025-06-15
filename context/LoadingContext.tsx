'use client';

import { Loading } from '@/components/shared/Loading';
import React, { createContext, useContext, useState } from 'react';

interface LoadingContextType {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    const setLoading = (loading: boolean) => setIsLoading(loading);

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading }}>
            {children}
            {isLoading && (
                <div className="fixed inset-0 z-50 bg-black/30 bg-opacity-30 flex items-center justify-center">
                    <div className="w-auto h-auto">
                        <Loading />
                    </div>
                </div>
            )}
        </LoadingContext.Provider>
    );
};

export const useLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};
