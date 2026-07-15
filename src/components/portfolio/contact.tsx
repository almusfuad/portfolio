import { Link, Text, VStack } from "@chakra-ui/react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import type { Profile } from "@/lib/profile"
import { Section } from "./section"

export function Contact({ profile }: { profile: Profile }) {
  const { contact } = profile

  return (
    <Section id="contact" command="mail -s hello" title="Contact">
      <VStack align="stretch" gap={4}>
        <Text fontSize="sm" color="fg.muted" lineHeight="1.7">
          {contact.note}
        </Text>
        <Link
          href={`mailto:${contact.email}`}
          fontSize="md"
          color="accent.secondary"
          _hover={{ color: "accent.primary", textDecoration: "none" }}
        >
          {contact.email}
        </Link>
        <Link
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          fontSize="sm"
          color="fg.muted"
          display="inline-flex"
          alignItems="center"
          gap={2}
          _hover={{ color: "accent.primary", textDecoration: "none" }}
        >
          <FaGithub />
          GitHub
        </Link>
        <Link
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          fontSize="sm"
          color="fg.muted"
          display="inline-flex"
          alignItems="center"
          gap={2}
          _hover={{ color: "accent.primary", textDecoration: "none" }}
        >
          <FaLinkedin />
          LinkedIn
        </Link>
      </VStack>
    </Section>
  )
}
