import { Question } from "@/data/types";
import { Box, Heading } from "@chakra-ui/react";
import QuestionViewContainer from "./QuestionViewContainer";

export default function FormHeaderView({ data }: { data: Question }) {
  return (
    <QuestionViewContainer>
      <Box p="5">
        <Heading>{data.meta.label}</Heading>
      </Box>
    </QuestionViewContainer>
  );
}
