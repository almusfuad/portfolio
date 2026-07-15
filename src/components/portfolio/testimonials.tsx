import { Box, Text, VStack } from "@chakra-ui/react"
import type { Profile } from "@/lib/profile"
import { Section } from "./section"

export function Testimonials({ profile }: { profile: Profile }) {
  return (
    <Section id="testimonials" command="grep -r praise ./" title="Testimonials" mb={6}>
      <VStack align="stretch" gap={4}>
        {profile.testimonials.map((item) => (
          <Box
            key={item.name}
            borderWidth="1px"
            borderColor="border.matrix"
            bg="bg.canvas"
            p={4}
          >
            <Text fontSize="sm" color="fg.muted" lineHeight="1.8" mb={4}>
              &ldquo;{item.quote}&rdquo;
            </Text>
            <Text fontSize="sm" fontWeight="semibold" color="fg">
              {item.name}
            </Text>
            <Text fontSize="xs" color="accent.primary">
              {item.role}
            </Text>
          </Box>
        ))}
      </VStack>
    </Section>
  )
}
