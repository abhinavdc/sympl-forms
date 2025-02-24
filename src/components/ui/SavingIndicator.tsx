import { Text, Center } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

export default function SavingIndicator({ isSaving }: { isSaving: boolean }) {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (!isSaving) {
      setShowSaved(true); // Show "Saved" when saving completes
      const timer = setTimeout(() => setShowSaved(false), 2000); // Hide after 2 seconds
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [isSaving]);

  return (
    <Center>
      <Text
        w="80px"
        justifyItems="start"
        fontSize="sm"
        color={isSaving ? "blue.500" : "green.500"}
        animation={isSaving ? `${blink} 1s infinite ease-in-out` : "none"}
      >
        {isSaving ? "Saving..." : showSaved ? `Auto Saved` : null}
      </Text>
    </Center>
  );
}
