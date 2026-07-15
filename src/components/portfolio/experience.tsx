import { Box, Text, VStack } from "@chakra-ui/react"
import type { Profile } from "@/lib/profile"
import { Section } from "./section"

export function Experience({ profile }: { profile: Profile }) {
  return (
    <Section id="experience" command="history | work" title="Experience" mb={6}>
      <VStack align="stretch" gap={0}>
        {profile.experience.map((job, index) => (
          <Box
            key={job.company}
            py={5}
            borderBottomWidth={index < profile.experience.length - 1 ? "1px" : "0"}
            borderColor="border.matrix"
          >
            <Text fontSize="xs" color="accent.primary" mb={1}>
              {job.period}
            </Text>
            <Text fontWeight="semibold" color="fg" mb={0.5}>
              {job.role}
            </Text>
            <Text fontSize="sm" color="fg.muted" mb={3}>
              {job.company}
            </Text>
            <Text fontSize="sm" color="fg.muted" lineHeight="1.7">
              <Text as="span" color="accent.secondary">
                &gt;{" "}
              </Text>
              {job.highlight}
            </Text>
          </Box>
        ))}
      </VStack>
    </Section>
  )
}
