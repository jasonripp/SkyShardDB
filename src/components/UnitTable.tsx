import { useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { useQuery } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

export type Unit = {
    ID: number;
    Name: string;
    Info: string;
    InShop: boolean;
    Conditional: number[];
    Rarity: number;
    Health: number;
    HasDamage: boolean;
    Damage: number;
    HasSpeed: boolean;
    AttackSpeed: number;
    length_x: number;
    length_y: number;
    PermanentDestroy: boolean;
    DamageType: number;
    DamageTypeBonus: number;
    SpecialDamageType: number;
    Targeting: number;
    ProjectileSpeed: number;
    ValueNames: string[];
    Values: number[];
    CustomValues: { [key: string]: number }[];
    Sprite: string;
    Projectile: string;
    Laser: boolean;
    Type: number;
    Role: number;
    Faction: number;
};

const defaultUnit: Unit = {
    ID: 0,
    Name: '',
    Info: '',
    InShop: false,
    Conditional: [],
    Rarity: 0,
    Health: 0,
    HasDamage: false,
    Damage: 0,
    HasSpeed: false,
    AttackSpeed: 0,
    length_x: 0,
    length_y: 0,
    PermanentDestroy: false,
    DamageType: 0,
    DamageTypeBonus: 0,
    SpecialDamageType: 0,
    Targeting: 0,
    ProjectileSpeed: 0,
    ValueNames: [],
    Values: [],
    CustomValues: [],
    Sprite: '',
    Projectile: '',
    Laser: false,
    Type: 0,
    Role: 0,
    Faction: 0,
};

const unitKeys = Object.keys(defaultUnit);

const fetchUnitData = async () => {
    try {
        const response = await fetch('https://raw.githubusercontent.com/ItsBen321/SkyShard-Public/refs/heads/main/game_info/unit_data.JSON');
        if (!response.ok) throw new Error('Remote fetch failed');
        return response.json();
    } catch (e) {
        // Fallback to local file
        const localResponse = await fetch('/game_info/unit_data.JSON');
        if (!localResponse.ok) throw new Error('Local fetch failed');
        return localResponse.json();
    }
};

// Utility: Parse hint string and get label for value
function getHintLabel(hint: string, value: number | string): string {
    if (!hint) return String(value ?? "");
    const map: Record<string, string> = {};
    hint.split(',').forEach(pair => {
        const [label, val] = pair.split(':');
        if (label && val !== undefined) map[val.trim()] = label.trim();
    });
    return map[String(value)] ?? String(value ?? "");
}

const UnitTable = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['unitData'],
        queryFn: fetchUnitData,
    });

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
    const [unitImgLoading, setUnitImgLoading] = useState(true);

    const handleRowClick = (row: any) => {
        setSelectedUnit(row.original);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedUnit(null);
        setUnitImgLoading(true);
    };

    const formattedData: Unit[] = useMemo(() => {
        if (!data) return [];
        return data.map((unitArr: any[]) => {
            const unitObj: Partial<Unit & Record<string, any>> = {};
            unitArr.forEach((property) => {
                if (
                    property.var &&
                    property.value !== undefined &&
                    unitKeys.includes(property.var)
                ) {
                    unitObj[property.var] = property.value;
                    // If there's a hint, store it as `${var}_hint`
                    if (property.hint) {
                        unitObj[`${property.var}_hint`] = property.hint;
                    }
                }
            });
            // Fill missing fields with defaults
            unitKeys.forEach((key) => {
                if (unitObj[key] === undefined) {
                    unitObj[key] = defaultUnit[key as keyof Unit];
                }
            });
            return unitObj as Unit;
        });
    }, [data]);

    const filterOptions = useMemo(() => {
        // Helper to get options for a key
        const getOptions = (
            key: keyof Unit,
            hintKey?: string,
            labelFn?: (val: any, hint?: string) => string
        ) => {
            const values = Array.from(new Set(formattedData.map(u => u[key])));
            const opts = values.map(val => {
                const unitWithValue = formattedData.find(u => u[key] === val);
                const hint = hintKey && unitWithValue ? (unitWithValue as any)[hintKey] || "" : "";
                return {
                    value: val,
                    label: labelFn ? labelFn(val, hint) : getHintLabel(hint, typeof val === 'string' || typeof val === 'number' ? val : String(val)),
                };
            }).sort((a, b) => {
                // Numeric sort if both are numbers, otherwise string sort
                if (typeof a.value === 'number' && typeof b.value === 'number') {
                    return a.value - b.value;
                }
                return String(a.value).localeCompare(String(b.value));
            });
            return opts;
        };
        return {
            Faction: getOptions('Faction', 'Faction_hint'),
            Type: getOptions('Type', 'Type_hint'),
            Role: getOptions('Role', 'Role_hint'),
            Rarity: getOptions('Rarity', undefined, (val) => `Tier ${val}`),
        };
    }, [formattedData]);

    const multiSelectFilterFn = (row: any, columnId: string, filterValues: any[]) => {
        if (!filterValues || filterValues.length === 0) return true;
        return filterValues.includes(row.getValue(columnId));
    }
    

    const columns = useMemo<MRT_ColumnDef<Unit>[]>(
        () => [
            {
                accessorKey: 'ID',
                header: 'ID',
                enableColumnFilter: false,
                size: 10,
            },
            {
                id: 'Image',
                header: 'Image',
                columnDefType: 'display',
                Cell: ({ row }) => {
                    const [imgLoading, setImgLoading] = useState(true);
                    return (
                        <Box sx={{width: 50}}>
                            {imgLoading && (
                                <CircularProgress
                                    size={32}
                                />
                            )}
                            <img
                                src={`images/units/sm/unit_${String(row.original.ID).padStart(3, '0')}.png`}
                                alt={row.original.Name}
                                style={{
                                    width: 50,
                                    height: 50,
                                    objectFit: 'contain', // maintains aspect ratio
                                    aspectRatio: '1 / 1', // ensures square cell
                                    display: imgLoading ? 'none' : 'block',
                                }}
                                onLoad={() => setImgLoading(false)}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'images/units/sm/placeholder.png';
                                    setImgLoading(false);
                                }}
                            />
                        </Box>
                    );
                },
                size: 50,
            },
            {
                accessorKey: 'Name',
                header: 'Name',
                size: 180,
            },
            {
                accessorKey: 'Info',
                header: 'Info',
                filterFn: 'contains',
                size: 300,
                grow: true,
            },
            {
                accessorKey: 'Rarity',
                header: 'Rarity',
                filterVariant: 'multi-select',
                Cell: ({ row }) => `Tier ${row.original.Rarity}`,
                filterSelectOptions: filterOptions.Rarity,
                filterFn: multiSelectFilterFn,
                size: 50,
            },
            {
                accessorKey: 'Faction',
                header: 'Faction',
                filterVariant: 'multi-select',
                Cell: ({ row }) => getHintLabel((row.original as any)['Faction_hint'] || "", row.original.Faction),
                filterSelectOptions: filterOptions.Faction,
                filterFn: multiSelectFilterFn,
                size: 50,
            },
            {
                accessorKey: 'Role',
                header: 'Role',
                filterVariant: 'multi-select',
                Cell: ({ row }) => getHintLabel((row.original as any)['Role_hint'] || "", row.original.Role),
                filterSelectOptions: filterOptions.Role,
                filterFn: multiSelectFilterFn,
                size: 50,
            },
            {
                accessorKey: 'Type',
                header: 'Type',
                filterVariant: 'multi-select',
                Cell: ({ row }) => getHintLabel((row.original as any)['Type_hint'] || "", row.original.Type),
                filterSelectOptions: filterOptions.Type,
                filterFn: multiSelectFilterFn,
                size: 50,
            },
        ],
        [formattedData, filterOptions],
    );

    const table = useMaterialReactTable({
        columns,
        data: formattedData,
        enableFacetedValues: true,
        enablePagination: false,
        // positionGlobalFilter: 'left',
        enableStickyHeader: true,
        enableStickyFooter: true,
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => handleRowClick(row),
            sx: {
                cursor: 'pointer', 
            },
        }),
        muiTableContainerProps: { sx: { maxHeight: '80vh' } },
        initialState: {
            columnVisibility:{
                ID: false,
            },
            showColumnFilters: true,
            showGlobalFilter: true,
            sorting: [
                {
                    id: 'Rarity',
                    desc: false,
                },
                {
                    id: 'Faction',
                    desc: false,
                },
                {
                    id: 'Role',
                    desc: false
                },
                {
                    id: 'Type',
                    desc: false
                }
            ],
        },
    });

    if (isLoading) return <Box><CircularProgress /></Box>;
    if (error) return <div>Error loading data</div>;

    return (
        <>
            <MaterialReactTable table={table} />
            <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {selectedUnit?.Name || 'Unit Details'}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleDialogClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    {selectedUnit && (
                        <Box>
                            <Box sx={{ mb: 2, textAlign: 'center' }}>
                                {unitImgLoading && (
                                    <CircularProgress
                                        size={64}
                                    />
                                )}
                                <img
                                    src={`images/units/unit_${String(selectedUnit.ID).padStart(3, '0')}.png`}
                                    alt={selectedUnit.Name}
                                    style={{
                                        maxWidth: 400,
                                        maxHeight: 400,
                                        objectFit: 'contain',
                                        aspectRatio: '1 / 1',
                                        display: unitImgLoading ? 'none' : 'block',
                                        margin: '0 auto',
                                    }}
                                    onLoad={() => setUnitImgLoading(false)}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'images/units/placeholder.png';
                                        setUnitImgLoading(false);
                                    }}
                                />
                            </Box>
                            <Typography variant="body1"><strong>Info:</strong> {selectedUnit.Info}</Typography>
                            <Typography variant="body2"><strong>Rarity:</strong> {selectedUnit.Rarity}</Typography>
                            <Typography variant="body2"><strong>Faction:</strong> {selectedUnit.Faction}</Typography>
                            <Typography variant="body2"><strong>Role:</strong> {selectedUnit.Role}</Typography>
                            <Typography variant="body2"><strong>Type:</strong> {selectedUnit.Type}</Typography>
                            {/* Add more fields as needed */}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UnitTable;
