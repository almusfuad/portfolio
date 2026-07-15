import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import type { Profile } from "@/lib/profile"
import { Section } from "./section"

function TechChip({ label }: { label: string }) {
  return (
    <Box
      as="span"
      fontSize="xs"
      px={2}
      py={1}
      borderWidth="1px"
      borderColor="border.matrix"
      color="fg"
      bg="bg.canvas"
    >
      {label}
    </Box>
  )
}

export function TechStack({ profile }: { profile: Profile }) {
  return (
    <Section id="stack" command="ls stack/" title="Languages & Stack" mb={6}>
      <VStack align="stretch" gap={6}>
        {profile.techStack.map((group) => (
          <Box key={group.label}>
            <Text fontSize="xs" color="accent.primary" mb={3} textTransform="uppercase">
              {group.label}
            </Text>
            <Flex gap={2} flexWrap="wrap">
              {group.items.map((item) => (
                <TechChip key={item} label={item} />
              ))}
            </Flex>
          </Box>
        ))}
      </VStack>
    </Section>
  )
}
