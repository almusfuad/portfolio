import { Box, Text } from "@chakra-ui/react"
import Link from "next/link"

export default function NotFound() {
  return (
    <Box
      minH="100dvh"
      bg="bg.canvas"
      color="fg"
      fontFamily="mono"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
      p={6}
    >
      <Text fontSize="xs" color="accent.primary">
        $ exit 404
      </Text>
      <Text fontSize="lg">Page not found</Text>
      <Link href="/" style={{ color: "#22d3ee", fontSize: "14px" }}>
        &gt; cd ~
      </Link>
    </Box>
  )
}
