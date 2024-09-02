// src/components/CardDetails.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Button, Box, DialogActions } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface CardDetailsProps {
  cardId: string;
  onClose: () => void;
}

interface CardData {
  _id: string;
  title: string;
  description: string;
  phone: string;
  imageUrl: string;
}

const CardDetails: React.FC<CardDetailsProps> = ({ cardId, onClose }) => {
  const [card, setCard] = useState<CardData | null>(null);

  useEffect(() => {
    axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`)
      .then(response => {
        setCard(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the card details!", error);
      });
  }, [cardId]);

  if (!card) return null;

  return (
    <Dialog open={Boolean(card)} onClose={onClose}>
      <DialogTitle>
        {card.title}
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={card.imageUrl} alt={card.title} style={{ width: '100%', height: 'auto', maxHeight: '300px' }} />
          <Typography variant="h6">{card.title}</Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>{card.description}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>Phone: {card.phone}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDetails;
