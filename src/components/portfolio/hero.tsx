import { Box, Flex, Text } from "@chakra-ui/react"
import type { Profile } from "@/lib/profile"

export function Hero({ profile }: { profile: Profile }) {
  return (
    <Box
      id="hero"
      scrollMarginTop="2rem"
      borderWidth="1px"
      borderColor="border.matrix"
      bg="bg.surface"
      p={{ base: 6, md: 10 }}
      mb={6}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="3px"
        bg="linear-gradient(90deg, accent.primary, accent.secondary)"
      />
      <Text fontSize="xs" color="accent.primary" mb={4} letterSpacing="wider">
        $ whoami
      </Text>
      <Text
        as="h1"
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        color="fg"
        lineHeight="1.2"
        mb={3}
      >
        {profile.name}
      </Text>
      <Text fontSize={{ base: "md", md: "lg" }} color="accent.primary" mb={1}>
        {profile.title}
      </Text>
      <Text fontSize={{ base: "sm", md: "md" }} color="fg.muted" mb={6}>
        {profile.subtitle}
      </Text>
      <Flex
        align="center"
        gap={2}
        fontSize="sm"
        color="accent.secondary"
        borderWidth="1px"
        borderColor="border.matrix"
        px={3}
        py={2}
        w="fit-content"
      >
        <Box w="6px" h="6px" borderRadius="full" bg="accent.secondary" />
        {profile.availability}
      </Flex>
      <Text mt={6} fontSize="sm" color="fg.muted">
        <Text as="span" color="accent.primary">
          user@matrix
        </Text>
        :~${" "}
        <Text as="span" color="accent.secondary">
          ./open-portfolio.sh
        </Text>
        <Text as="span" className="terminal-cursor" color="accent.secondary" ml={1}>
          █
        </Text>
      </Text>
    </Box>
  )
}
