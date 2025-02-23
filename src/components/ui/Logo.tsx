import { Heading, HStack, Image } from "@chakra-ui/react";

export const Logo = () => (
  <HStack w={{ md: "140px", sm: "unset" }}>
    <Image
      height="40px"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADuElEQVR4nO2dT2oUQRjFH6gjLtVNk5iNB8h4Cr2ANxB0kTEu3HgHL6AncBGiiWBcCioaQTL+gSwC2bhIRgQVjSgSKCmoBil6Mt2drq9edX0/qEWSmen3+jdfdybpZABFUdLhEoB1ABMAJvCy21gDMIxdmlnGLwER/jpQKdWsR5BRrkfCT74kmEQU8hk94DSAZQCbbuy73kmhCXHos/tiBGAAYeYBvAv8rA1NyOxjt4/EJiO0DCPQI3T+LalJWRYoYwR6SHRYEuiBN95Gn3Q0niaykONyAcCG95ivIcBPb6M2SBeYxIVYFrzH/AEBQu040wMhIR9XfINGhYTZcbmd1OknRIVAhbRBJ0QPWWEIdQyddPisbbr2CPq3JlSgtYhCHhL0b02oQMNAPzWetew2Fwn6tyZkoKH7ZdG+gIh9NxmLRP1bQRdIGLr+dIGEoetPF0gYuv50gYSh608XSBi6/nSBhKHrTxdIGLr+dIGEoetPF0gYuv50gYSh608XSBi6/nSBhKHrTxeoJicBXAfwHMA3AF/cdVNL7mrMZPvTBarBHICXFdnK9dZdU5Vkf7pAM7BXVe4cIaNc7wGcSbE/XaAOZJTrFhLsTxdoCgWA7QYy7HqGBPvTBWowGR9nCPmOBPvTBao5GasATgG4fcyrT+j60wWqMRmljJI7U4S8QIL96QI1lAH38YeK215Dgv3pAmH2Yep/TgB4MGU67NeS688WaL7hZKxW3HanwV+BsfWnClR0MBlNZLD1pwpURJDB1J8qUBFJBkt/qkBFRBkM/akCFZFlWFQIkQyLCgGPDBUCLhnZCynIZGQtpCCUka2QglRGlkIKYhnZCSnIZWQlZE74p7ZtyUbI4wRkZCPkLIBD4sNUdkKuevfZJpyMrITc9+5zl3AyshKy693nMqmMLIRc9G7/G8B5AFfcpGwTychCyA3v9n8B/Kl4HAYZWQhZOWLnGzIZWQjZqyHi0L1OsS8eY9N7If4J3bhlP3/PfUt8Djz0Xog9eX9yf2K24s4p9kTPSu+FpIZh608XSBi6/nSBhKHrTxdIGLr+dIGEoetPF0gYuv50gYSh608XSBi6/nSBhKHrTxdIGLr+dIGEoetPF0gYuv5NA/V9+agQqBCdEOiEIPYkJHvIyh2jQjIXEurNifuA/+bEXyU2uultdKPBf/TsMwsAnsZ4++6bBCdSk8gaSQix/3R4TFDWkK8tAAMIYa8eVCmYKmMc46K+gRvJVxUn+hzXgTu/jiQnQ1EURVEURUEN/gE50GslFFXaWQAAAABJRU5ErkJggg=="
      alt="task"
    />
    <Heading as="h1" fontSize="sm" display={{ md: "block", sm: "none"}}>
      Sympl Forms
    </Heading>
  </HStack>
);
