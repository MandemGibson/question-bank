import { Box, Typography } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const Guide = () => {

  return (
    <Box m="20px">

      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMore/>}>
          <Typography color={"#6b6a6a"} variant="h6">
            How to create a new staff 
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra
            nulla id ipsum fermentum, sit amet vestibulum nisl iaculis.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMore/>}>
          <Typography color={"#6b6a6a"} variant="h6">
            How to create a new student
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra
            nulla id ipsum fermentum, sit amet vestibulum nisl iaculis.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMore/>}>
          <Typography color={"#6b6a6a"} variant="h6">
            Random question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra
            nulla id ipsum fermentum, sit amet vestibulum nisl iaculis.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMore/>}>
          <Typography color={"#6b6a6a"} variant="h6">
            Another random question 
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra
            nulla id ipsum fermentum, sit amet vestibulum nisl iaculis.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Guide;
