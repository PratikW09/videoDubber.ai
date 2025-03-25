"use client";

import { Title, Container } from "@mantine/core";
import TextInputArea from "./components/TextInputArea";

export default function Home() {
  return (
    <Container size="md">
      <Title order={1} mb="lg" mt="md" fw={500} ta="center">
        Text Highlighter with Custom Colors 🎨
      </Title>
      <TextInputArea />
    </Container>
  );
}
