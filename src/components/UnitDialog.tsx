import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CloseIcon from '@mui/icons-material/Close';

import { getHintLabel } from './UnitTable';
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
                    <Chip label={`Rarity: ${unit.Rarity}`} color="primary" />
                    <Chip label={getHintLabel((unit as any).Faction_hint, unit.Faction)} color="primary" />
                    <Chip label={getHintLabel((unit as any).Role_hint, unit.Role)} color="primary" />
                    <Chip label={getHintLabel((unit as any).Type_hint, unit.Type)} color="primary" />
                </Stack>
                <Box>
                    <Box sx={{ mb: 2, textAlign: 'center' }}>
                        {unitImgLoading && (
                            <CircularProgress
                                size={64}
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
            {/* <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions> */}
        </Dialog>
    );
};

export default UnitDialog;