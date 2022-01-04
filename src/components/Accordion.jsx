import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
//(props) => {return <Accordion {...props} />}
//(props) => {return <AccordionSummary {...props} />}
//(props) => {return <AccordionDetails {...props} />}
const AccordionStyled = styled(Accordion)(({ theme }) => ({
  background: 'linear-gradient(#1589FF, #95B9C7)',
  position: 'static'
}));
const AccordionSummaryStyled = styled(AccordionSummary)(({ theme }) => ({
  background: 'linear-gradient(#1589FF, #95B9C7)',
  position: 'static'
}));
const AccordionDetailsStyled = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor: '#95B9C7',
}));

export { AccordionStyled, AccordionSummaryStyled, AccordionDetailsStyled };
