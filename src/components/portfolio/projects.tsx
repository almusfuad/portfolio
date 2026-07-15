import { Box, Text, VStack } from "@chakra-ui/react"
import type { CaseStudyDTO } from "@/lib/queries"
import { Section } from "./section"

type ProjectsProps = {
  caseStudies: CaseStudyDTO[]
}

function ProjectCard({ study }: { study: CaseStudyDTO }) {
  return (
    <Box
      borderWidth="1px"
      borderColor="border.matrix"
      bg="bg.canvas"
      p={{ base: 4, md: 5 }}
    >
      <FlexHeader study={study} />
      <VStack align="stretch" gap={3} mt={4}>
        <Field label="problem" value={study.problem} />
        <Field label="architecture" value={study.architecture} />
        <Field label="impact" value={study.impact} />
      </VStack>
      <Box
        mt={4}
        pt={3}
        borderTopWidth="1px"
        borderColor="border.matrix"
        fontSize="xs"
        color="accent.secondary"
      >
        metrics → {study.metrics}
      </Box>
    </Box>
  )
}

function FlexHeader({ study }: { study: CaseStudyDTO }) {
  return (
    <Box>
      <Text fontSize="xs" color="accent.primary" mb={1}>
        {study.category}
      </Text>
      <Text as="h3" fontSize={{ base: "md", md: "lg" }} fontWeight="semibold" color="fg">
        {study.title}
      </Text>
    </Box>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Text fontSize="xs" color="accent.primary" mb={1}>
        {label}
      </Text>
      <Text fontSize="sm" color="fg.muted" lineHeight="1.7">
        {value}
      </Text>
    </Box>
  )
}

export function Projects({ caseStudies }: ProjectsProps) {
  return (
    <Section id="projects" command="git log --projects" title="Projects" mb={6}>
      <VStack align="stretch" gap={4}>
        {caseStudies.map((study) => (
          <ProjectCard key={study.id} study={study} />
        ))}
      </VStack>
    </Section>
  )
}
