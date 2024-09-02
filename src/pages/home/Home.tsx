// src/pages/Home.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, IconButton, Box, Stack, Pagination } from '@mui/material';
import { Favorite as FavoriteIcon, Phone as PhoneIcon } from '@mui/icons-material';
import CardDetails from '../../components/card-details/CardDetails';
import Navbar from '../../components/navbar/Navbar';

interface CardData {
  _id: string;
  title: string;
  description: string;
  phone: string;
  imageUrl: string;
}

const HomePage: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const cardsPerPage = 6;

  useEffect(() => {
    axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the cards!", error);
      });
  }, []);

  const handleCardClick = (cardId: string) => {
    setSelectedCardId(cardId);
  };

  const closePopup = () => {
    setSelectedCardId(null);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  // חיתוך הכרטיסים לפי העמוד הנוכחי
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Navbar />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Stack direction="row" spacing={3} flexWrap="wrap" justifyContent="center">
          {currentCards.map(card => (
            <Box key={card._id} sx={{ flex: '1 1 300px', maxWidth: '300px' }}>
              <Card onClick={() => handleCardClick(card._id)} sx={{ cursor: 'pointer', height: '100%' }}>
                <CardMedia component="img" height="140" image={card.imageUrl} alt={card.title} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{card.description}</Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                  <IconButton aria-label="like" color="secondary"><FavoriteIcon /></IconButton>
                  <IconButton aria-label="phone" href={`tel:${card.phone}`} color="primary"><PhoneIcon /></IconButton>
                </Box>
              </Card>
            </Box>
          ))}
        </Stack>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={Math.ceil(cards.length / cardsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {selectedCardId && (
        <CardDetails cardId={selectedCardId} onClose={closePopup} />
      )}
    </Box>
  );
};

export default HomePage;
