import styled from '@emotion/styled';
import Rating from '@mui/material/Rating';

export const StyledAverageRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#def186',
    },
    '& .MuiSvgIcon-root': {
        width: 100,
        height: 100,
    },
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: '#e0e0e0',
    },
});

export const StyledTeamAverageRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#def186',
    },
    '& .MuiSvgIcon-root': {
        width: 60,
        height: 60,
    },
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: '#e0e0e0',
    },
});

export const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#def186',
    },
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: '#e0e0e0',
    },
});
