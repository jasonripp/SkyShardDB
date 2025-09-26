import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { useQuery } from '@tanstack/react-query';

import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Box, } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const fetchPatchData = async () => {
    try {
        const response = await fetch('https://raw.githubusercontent.com/ItsBen321/SkyShard-Public/refs/heads/main/game_info/Main.json');
        if (!response.ok) throw new Error('Remote fetch failed');
        return response.json();
    } catch (e) {
        // Fallback to local file
        const localResponse = await fetch('/game_info/Main.json');
        if (!localResponse.ok) throw new Error('Local fetch failed');
        return localResponse.json();
    }
};

const fetchPatchNotes = async (version: string) => {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/ItsBen321/SkyShard-Public/refs/heads/main/game_info/patch_notes/${version}.md`);
        if (!response.ok) throw new Error('Remote fetch failed');
        return response.text();
    } catch (e) {
        // Fallback to local file
        const localResponse = await fetch(`/game_info/patch_notes/${version}.md`);
        if (!localResponse.ok) throw new Error('Local fetch failed');
        return localResponse.text();
    }
};

const PatchInfo = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { data: patchData, isLoading, error } = useQuery({
        queryKey: ['patchData'],
        queryFn: fetchPatchData,
    });

    const { data: patchNotes, isLoading: isPatchNotesLoading, error: patchNotesError } = useQuery({
        queryKey: ['patchNotes', patchData?.Patch],
        queryFn: () => fetchPatchNotes(patchData.Patch),
        enabled: !!patchData?.Patch,
    });

    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error loading data</div>;

    return (
        <React.Fragment>
            <Box><CircularProgress /></Box>
            <p className="version">
                Current game version: <Button onClick={handleClickOpen}>{patchData?.Patch}</Button>
            </p>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Patch Notes - {patchData?.Patch}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
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
                    {isPatchNotesLoading ? <Box><CircularProgress /></Box> : (
                        <Markdown remarkPlugins={[remarkGfm]}>
                            {patchNotesError ? "Error loading patch notes" : patchNotes || "No patch notes available."}
                        </Markdown>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

export default PatchInfo;