import { Box, Flex, Text, HStack, Link, Divider, VStack } from "@chakra-ui/react";
import { FaHospital, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <Box bg="gray.900" color="gray.300" mt="auto">
      <Box maxW="1200px" mx="auto" px={6} py={10}>
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={8}>
          <VStack align="start" maxW="280px">
            <HStack>
              <Box color="blue.400" fontSize="22px"><FaHospital /></Box>
              <Text fontSize="xl" fontWeight="bold" color="white">TeleMed</Text>
            </HStack>
            <Text fontSize="sm" color="gray.400">
              Connecting patients with qualified doctors for seamless online consultations and appointments.
            </Text>
          </VStack>

          <VStack align="start" spacing={2}>
            <Text fontWeight="700" color="white" mb={1}>Quick Links</Text>
            {["Home", "Doctors", "Appointments", "About"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} _hover={{ color: "blue.400" }} fontSize="sm">
                {item}
              </Link>
            ))}
          </VStack>

          <VStack align="start" spacing={2}>
            <Text fontWeight="700" color="white" mb={1}>Services</Text>
            {["Video Consultation", "Chat Consultation", "Book Appointment", "Health Records"].map((s) => (
              <Text key={s} fontSize="sm" color="gray.400">{s}</Text>
            ))}
          </VStack>

          <VStack align="start" spacing={2}>
            <Text fontWeight="700" color="white" mb={1}>Contact</Text>
            <Text fontSize="sm">support@telemed.com</Text>
            <Text fontSize="sm">+1 (800) 123-4567</Text>
            <HStack mt={2} spacing={3}>
              {[FaFacebook, FaTwitter, FaLinkedin].map((Icon, i) => (
                <Box key={i} cursor="pointer" _hover={{ color: "blue.400" }} fontSize="20px">
                  <Icon />
                </Box>
              ))}
            </HStack>
          </VStack>
        </Flex>

        <Divider my={6} borderColor="gray.700" />
        <Text textAlign="center" fontSize="sm" color="gray.500">
          &copy; {new Date().getFullYear()} TeleMed. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
}
