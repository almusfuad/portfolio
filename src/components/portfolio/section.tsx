import { Box, type BoxProps } from "@chakra-ui/react"
import type { ReactNode } from "react"

type SectionProps = BoxProps & {
  id: string
  command: string
  title: string
  children: ReactNode
}

export function Section({ id, command, title, children, ...rest }: SectionProps) {
  return (
    <Box
      as="section"
      id={id}
      scrollMarginTop="2rem"
      borderWidth="1px"
      borderColor="border.matrix"
      bg="bg.surface"
      p={{ base: 5, md: 7 }}
      {...rest}
    >
      <Box
        fontFamily="mono"
        fontSize="xs"
        color="accent.primary"
        mb={3}
        letterSpacing="wider"
      >
        $ {command}
      </Box>
      <Box
        as="h2"
        fontSize={{ base: "lg", md: "xl" }}
        fontWeight="semibold"
        color="fg"
        mb={6}
        pb={3}
        borderBottomWidth="1px"
        borderColor="border.matrix"
      >
        {title}
      </Box>
      {children}
    </Box>
  )
}
