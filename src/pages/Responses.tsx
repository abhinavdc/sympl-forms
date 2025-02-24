import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import PageLoader from "@/components/ui/PageLoader";
import { useResponsesStore } from "@/data/store";
import { convertDateStringToHumanReadable } from "@/helper/dateHelper";
import { AbsoluteCenter, Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Responses() {
  const { responses, fetchResponses, fetchingResponses } = useResponsesStore();

  useEffect(() => {
    if (!responses) {
      fetchResponses();
    }
  }, [fetchResponses, responses]);

  return (
    <>
      {fetchingResponses ? <PageLoader /> :
      
      responses?.length ? (
        <AccordionRoot collapsible bg="gray.50" variant="enclosed">
          {responses?.map((item, index) => (
            <AccordionItem key={index} value={item.submissionId}>
              <AccordionItemTrigger h="80px">
                {`${item.question[0].meta.label} - ${convertDateStringToHumanReadable(item.submittedDate)}`}
              </AccordionItemTrigger>
              <AccordionItemContent>
                {item.question.slice(1).map(({ id, meta, value }) => (
                  <Box key={id} mb={3}>
                    <Text fontWeight="semibold">{meta.label}</Text>
                    <Text color="gray.600">
                      {value !== undefined && value !== ""
                        ? value
                        : "No response provided"}
                    </Text>
                  </Box>
                ))}
              </AccordionItemContent>
            </AccordionItem>
          ))}
        </AccordionRoot>
      ) : (
        <AbsoluteCenter>No Responses</AbsoluteCenter>
      )}
    </>
  );
}
