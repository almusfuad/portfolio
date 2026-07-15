import { Text, VStack } from "@chakra-ui/react"
import type { Profile } from "@/lib/profile"
import { Section } from "./section"

export function Education({ profile }: { profile: Profile }) {
  return (
    <Section id="education" command="cat education.json" title="Education" mb={6}>
      <VStack align="stretch" gap={4}>
        {profile.education.map((entry) => (
          <div key={entry.school}>
            <Text fontSize="xs" color="accent.primary" mb={1}>
              {entry.period}
            </Text>
            <Text fontWeight="semibold" color="fg">
              {entry.degree}
            </Text>
            <Text fontSize="sm" color="fg.muted">
              {entry.school}
            </Text>
          </div>
        ))}
      </VStack>
    </Section>
  )
}
