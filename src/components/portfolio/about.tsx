import { Box, Text, VStack } from "@chakra-ui/react"
import type { Profile } from "@/lib/profile"
import { Section } from "./section"

export function About({ profile }: { profile: Profile }) {
  return (
    <Section id="about" command="cat about.txt" title="About" mb={6}>
      <VStack align="stretch" gap={4}>
        {profile.about.map((paragraph, index) => (
          <Text key={index} fontSize="sm" color="fg.muted" lineHeight="1.8">
            {paragraph}
          </Text>
        ))}
      </VStack>
      <Box
        mt={6}
        pt={4}
        borderTopWidth="1px"
        borderColor="border.matrix"
        fontSize="xs"
        color="fg.muted"
      >
        <Text as="span" color="accent.primary">
          status:
        </Text>{" "}
        {profile.availability}
      </Box>
    </Section>
  )
}
