import React, { useState, useEffect } from 'react';

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
                {unit?.Name || 'Unit Details'}
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
                <Typography variant="body1"><strong>Info:</strong> {unit.Info}</Typography>
                <Typography variant="body2"><strong>Rarity:</strong> {unit.Rarity}</Typography>
                <Typography variant="body2"><strong>Faction:</strong> {unit.Faction}</Typography>
                <Typography variant="body2"><strong>Role:</strong> {unit.Role}</Typography>
                <Typography variant="body2"><strong>Type:</strong> {unit.Type}</Typography>
                {/* Add more fields as needed */}
            </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UnitDialog;