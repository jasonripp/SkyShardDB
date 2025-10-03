import React, { createContext, useContext, useState } from 'react';

import type { MRT_ColumnFiltersState } from 'material-react-table';

interface UnitTableState {
    filters: MRT_ColumnFiltersState;
    sorting: Array<{ id: string; desc: boolean }>;
    columnVisibility: Record<string, boolean>;
    showColumnFilters: boolean;
    showGlobalFilter: boolean;
    globalFilter: string;
    data: any[];
}

const defaultState: UnitTableState = {
    filters: [],
    sorting: [
        { id: 'Rarity', desc: false },
        { id: 'Faction', desc: false },
        { id: 'Role', desc: false },
        { id: 'Type', desc: false },
    ],
    columnVisibility: {
        ID: false,
        Health: false,
        Damage: false,
        AttackSpeed: false,
        InShop: false,
        Conditional: false,
    },
    showColumnFilters: true,
    showGlobalFilter: true,
    globalFilter: '',
    data: [],
};

const UnitTableContext = createContext<{
    state: UnitTableState;
    setState: React.Dispatch<React.SetStateAction<UnitTableState>>;
} | undefined>(undefined);

export const UnitTableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<UnitTableState>(() => {
        const stored = sessionStorage.getItem('unitTableState');
        if (stored) {
            const parsed = JSON.parse(stored);
            // Merge defaults for missing keys
            return {
                ...defaultState,
                ...parsed,
                columnVisibility: { ...defaultState.columnVisibility, ...parsed.columnVisibility },
                sorting: parsed.sorting && parsed.sorting.length ? parsed.sorting : defaultState.sorting,
                showColumnFilters: typeof parsed.showColumnFilters === 'boolean' ? parsed.showColumnFilters : defaultState.showColumnFilters,
                showGlobalFilter: typeof parsed.showGlobalFilter === 'boolean' ? parsed.showGlobalFilter : defaultState.showGlobalFilter,
                globalFilter: typeof parsed.globalFilter === 'string' ? parsed.globalFilter : defaultState.globalFilter,
            };
        }
        return defaultState;
    });

    // Persist state to sessionStorage whenever it changes
    React.useEffect(() => {
        sessionStorage.setItem('unitTableState', JSON.stringify(state));
    }, [state]);

    return (
        <UnitTableContext.Provider value={{ state, setState }}>
            {children}
        </UnitTableContext.Provider>
    );
};

export const useUnitTableState = () => {
    const context = useContext(UnitTableContext);
    if (!context) throw new Error('useUnitTableState must be used within a UnitTableProvider');
    return context;
};
