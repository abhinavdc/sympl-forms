import { Box } from "@chakra-ui/react";

export default function QuestionViewContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box bg="gray.50" w="100%" rounded="md" p="5">
      <div>{children}</div>
    </Box>
  );
}
