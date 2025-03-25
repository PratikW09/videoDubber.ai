"use client";
import { Group, Button } from "@mantine/core";

const ActionButtons = ({ applyStyleToSelection, applyHighlightToSelection }) => {
  return (
    <Group justify="center" mb="md">
      <Button variant="outline" onClick={() => applyStyleToSelection("reset")}>
        Reset
      </Button>
      <Button variant="outline" onClick={() => applyStyleToSelection("bold")}>
        Bold
      </Button>
      <Button variant="outline" onClick={() => applyStyleToSelection("underline")}>
        Underline
      </Button>
      <Button variant="outline" onClick={() => applyHighlightToSelection()}>
        Highlight
      </Button>
    </Group>
  );
};

export default ActionButtons;
