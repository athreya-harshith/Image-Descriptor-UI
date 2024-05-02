import { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Switch,
  Text,
} from "@chakra-ui/react";
import { Link as RoutingLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Links = ["Home", "Descriptions", "About Us"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function NavMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Image Descriptor</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
              <NavLink key={"home"}>
                <RoutingLink to={"/"}>Home</RoutingLink>
              </NavLink>
              <NavLink key={"descriptions"}>
                <RoutingLink to={"/descriptions"}>Descriptions</RoutingLink>
              </NavLink>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <HStack alignItems={"center"}>
              <Switch colorScheme="twitter" onChange={toggleColorMode} />
              <Text my={"auto"}>Toggle Mode</Text>
            </HStack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
