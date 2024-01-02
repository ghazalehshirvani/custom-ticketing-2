import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from '../../theme';

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="10px">
      <Typography
        variant="h3"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 5px 20px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
