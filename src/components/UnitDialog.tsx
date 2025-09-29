import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

import { getHintLabel, getFactionColor } from '../util';
import type { Unit } from './UnitTable';
import { Grid } from '@mui/system';


interface UnitDialogProps {
    open: boolean;
    onClose: () => void;
    unit: Unit;
}

const UnitDialog: React.FC<UnitDialogProps> = ({ open, onClose, unit }) => {

    const [unitImgLoading, setUnitImgLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        setUnitImgLoading(true);
    }, [open]);

    const factionColor = getFactionColor(unit);
    const isLight = theme.palette.mode === 'light';

    const unitTableAttributes = [
        unit.HasDamage ? { label: 'DPS:', value: String((unit.Damage / unit.AttackSpeed).toFixed(2)) } : null,
        unit.HasDamage ? { label: 'Projectile Speed:', value: getHintLabel((unit as any).ProjectileSpeed_hint, unit.ProjectileSpeed) } : null,
        { label: 'Size:', value: `${unit.length_x} x ${unit.length_y}` },
        unit.HasDamage ? { label: 'Damage Type:', value: getHintLabel((unit as any).DamageType_hint, unit.DamageType) } : null,
        unit.HasDamage && unit.DamageTypeBonus > 0 ? { label: 'Type Strength:', value: `${unit.DamageTypeBonus}%` } : null,
        (unit.HasDamage || unit.Targeting) ? { label: 'Targeting:', value: getHintLabel((unit as any).Targeting_hint, unit.Targeting) } : null,
        { label: 'Available In Shops:', value: unit.InShop ? 'Yes' : 'No' },
        Array.isArray(unit.Conditional) && unit.Conditional.length > 0 ? { label: 'Requires:', value: unit.Conditional.join(', ') } : null,
    ].filter((attr): attr is { label: string; value: string } => !!attr);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: isLight
                        ? theme.palette[factionColor].lighter
                        : theme.palette[factionColor].darker,
                },
            }}
        >
            <DialogTitle
                sx={{
                    backgroundColor: theme.palette[factionColor].main,
                    color: theme.palette.getContrastText(theme.palette[factionColor].main),
                    textAlign: 'center',
                }}
            >
                <Typography >
                    {unit?.Name || 'Unit Details'}
                </Typography>
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
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
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        mb: 2,
                        justifyContent: 'center',
                    }}
                >
                    <Chip label={`Rarity: ${unit.Rarity}`} color={factionColor} />
                    <Chip label={getHintLabel((unit as any).Faction_hint, unit.Faction)} color={factionColor} />
                    <Chip label={getHintLabel((unit as any).Role_hint, unit.Role)} color={factionColor} />
                    <Chip label={getHintLabel((unit as any).Type_hint, unit.Type)} color={factionColor} />
                </Stack>
                <Grid container justifyContent="center" alignItems="center" sx={{ mb: 2 }} spacing={2}>
                    <Grid>
                        <Stack
                            direction="column" spacing={5}
                        >
                            <Box sx={{ flexGrow: 1 }} >
                                <Typography variant="body2" color="text.secondary" align="center">Health:</Typography>
                                <Typography variant="body2" color="text.secondary" align="center">{unit.Health}</Typography>
                            </Box>
                            {unit.HasDamage && (
                                <Box sx={{ flexGrow: 1 }} >
                                    <Typography variant="body2" color="text.secondary" align="center">Damage:</Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">{unit.Damage}</Typography>
                                </Box>
                            )}
                            {unit.HasSpeed && (
                                <Box sx={{ flexGrow: 1 }} >
                                    <Typography variant="body2" color="text.secondary" align="center">Speed:</Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">{unit.AttackSpeed.toFixed(2)}s</Typography>
                                </Box>
                            )}
                        </Stack>
                    </Grid>
                    <Grid>
                        <Box sx={{ mb: 2, textAlign: 'center' }}>
                            {unitImgLoading && (
                                <Skeleton
                                    variant="rectangular"
                                    width={240}
                                    height={240}
                                    sx={{ margin: '0 auto', display: 'block', maxWidth: 400, maxHeight: 400 }}
                                />
                            )}
                            <img
                                src={`images/units/unit_${String(unit.ID).padStart(3, '0')}.png`}
                                alt={unit.Name}
                                style={{
                                    width: '100%',
                                    height: 'auto',
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
                    </Grid>
                </Grid>
                <TableContainer component={Paper} sx={{ mb: 2 }}>
                    <Table size="small" aria-label="unit stats table">
                        <TableBody>
                            {unitTableAttributes.map(attr => (
                                <TableRow
                                    key={attr.label}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right" width="50%">{attr.label}</TableCell>
                                    <TableCell align="left">{attr.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paper variant="outlined" sx={{ p: 1, }}>
                    <Typography variant="body1" align="center">{unit.Info}</Typography>
                </Paper>

            </DialogContent>
        </Dialog>
    );
};

export default UnitDialog;