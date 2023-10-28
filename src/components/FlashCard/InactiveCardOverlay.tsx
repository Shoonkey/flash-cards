import { ButtonProps, Button } from "@chakra-ui/react";

function InactiveOverlay(props: ButtonProps) {
  return (
    <Button
      variant="unstyled"
      tabIndex={-1}
      bg="blackAlpha.600"
      _hover={{ cursor: "pointer", bg: "blackAlpha.400" }}
      transition="background-color .4s"
      position="absolute"
      w="100%"
      h="100%"
      borderRadius="inherit"
      {...props}
    />
  );
}

export default InactiveOverlay;