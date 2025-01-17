import React, { createContext, useState } from 'react';

interface DefaultLayoutContextType {
    handleToggle: () => void;
    isCollapsed: boolean;
    isTransparent: boolean;
    setIsTransparent: React.Dispatch<React.SetStateAction<boolean>>;
}

const DefaultLayoutContext = createContext<DefaultLayoutContextType | null>(null);

const DefaultLayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isTransparent, setIsTransparent] = useState(true);

    const handleToggle = () => {
        setIsCollapsed((prev) => !prev);
    };

    const ref = {
        handleToggle,
        isCollapsed,
        isTransparent,
        setIsTransparent,
    };

    return <DefaultLayoutContext.Provider value={ref}>{children}</DefaultLayoutContext.Provider>;
};

export { DefaultLayoutContext, DefaultLayoutProvider };
