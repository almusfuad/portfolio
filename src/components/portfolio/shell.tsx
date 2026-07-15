import { Box, Flex, Link, Text } from "@chakra-ui/react"
import type { CSSProperties, ReactNode } from "react"
import { navSections, type Profile } from "@/lib/profile"
import type { ThemeSettings } from "@/lib/theme-settings"

export function PortfolioShell({
  children,
  profile,
  theme,
}: {
  children: ReactNode
  profile: Profile
  theme: ThemeSettings
}) {
  const themeVariables = {
    "--portfolio-background": theme.background,
    "--portfolio-surface": theme.surface,
    "--portfolio-border": theme.border,
    "--portfolio-muted": theme.muted,
    "--portfolio-primary": theme.primary,
    "--portfolio-secondary": theme.secondary,
    "--portfolio-text": theme.text,
  } as CSSProperties

  return (
    <Flex minH="100dvh" bg="bg.canvas" fontFamily="mono" style={themeVariables}>
      <Box
        as="aside"
        display={{ base: "none", lg: "flex" }}
        flexDir="column"
        w="220px"
        flexShrink={0}
        borderRightWidth="1px"
        borderColor="border.matrix"
        p={6}
        position="sticky"
        top={0}
        h="100dvh"
      >
        <Text fontSize="sm" color="accent.secondary" mb={1}>
          ~/portfolio
        </Text>
        <Text fontSize="xs" color="fg.muted" mb={8}>
          DevTerminal · Neon
        </Text>
        <Flex as="nav" direction="column" gap={2} flex="1">
          {navSections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              fontSize="sm"
              color="fg.muted"
              _hover={{ color: "accent.primary", textDecoration: "none" }}
              transition="color 0.15s"
            >
              <Text as="span" color="accent.primary" mr={2}>
                &gt;
              </Text>
              {section.label}
            </Link>
          ))}
        </Flex>
        <Text fontSize="xs" color="fg.muted" mt="auto">
          {profile.location}
        </Text>
      </Box>

      <Box as="main" flex="1" minW={0}>
        <Box
          display={{ base: "flex", lg: "none" }}
          borderBottomWidth="1px"
          borderColor="border.matrix"
          px={4}
          py={3}
          gap={4}
          overflowX="auto"
          bg="bg.surface"
        >
          {navSections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              fontSize="xs"
              color="fg.muted"
              whiteSpace="nowrap"
              _hover={{ color: "accent.primary", textDecoration: "none" }}
            >
              {section.label}
            </Link>
          ))}
        </Box>
        <Box maxW="900px" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 6, md: 10 }}>
          {children}
        </Box>
      </Box>
    </Flex>
  )
}
