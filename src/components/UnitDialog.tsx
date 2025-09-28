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
import Typography from '@mui/material/Typography';

import CloseIcon from '@mui/icons-material/Close';

import { getHintLabel, getFactionColor } from '../util';
import type { Unit } from './UnitTable';


interface UnitDialogProps {
    open: boolean;
    onClose: () => void;
    unit: Unit;
}

const UnitDialog: React.FC<UnitDialogProps> = ({ open, onClose, unit }) => {

    const [unitImgLoading, setUnitImgLoading] = useState(true);

    useEffect(() => {
        setUnitImgLoading(true);
    }, [open]);

    const factionColor = getFactionColor(unit);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography sx={{ justifyContent: 'center'}}>
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
                <Box>
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
                    <Paper variant="outlined" sx={{ p: 1,  }}>
                        <Typography variant="body1" align="center">{unit.Info}</Typography>
                    </Paper>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default UnitDialog;