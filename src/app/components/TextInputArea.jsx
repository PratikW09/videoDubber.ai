"use client";
import { useState, useRef, useEffect, forwardRef } from "react";
import { Container, Paper, Box, Divider } from "@mantine/core";
import DarkModeToggle from "./DarkModeToggle";
import ActionButtons from "./ActionButtons";
import ColorPalette from "./ColorPalette";
import CopyButton from "./CopyButton";

// TextEditor Component with forwardRef
const TextEditor = forwardRef(({ handleInput, darkMode }, ref) => {
  return (
    <Paper shadow="xs" p="md" withBorder>
      <Box
        ref={ref}
        contentEditable={true}
        onInput={handleInput}
        style={{
          border: "1px solid #ccc",
          padding: "12px",
          minHeight: "150px",
          outline: "none",
          borderRadius: "8px",
          lineHeight: "1.5",
          whiteSpace: "pre-wrap",
          backgroundColor: darkMode ? "#1e293b" : "#fff",
          color: darkMode ? "#fff" : "#000",
        }}
      />
    </Paper>
  );
});

TextEditor.displayName = "TextEditor"; // Required for forwardRef

// Merged TextInputArea Component
const TextInputArea = () => {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [highlightColor, setHighlightColor] = useState("#ffff00");
  const [darkMode, setDarkMode] = useState(false);
  const editorRef = useRef(null);

  // Handle text input and apply selected color
  const handleInput = () => {
    document.execCommand("foreColor", false, selectedColor);
  };

  // Apply styles or highlights to selected text
  const applyStyleToSelection = (styleType) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!range.collapsed) {
      const span = document.createElement("span");

      switch (styleType) {
        case "bold":
          span.style.fontWeight = "bold";
          break;
        case "underline":
          span.style.textDecoration = "underline";
          break;
        case "highlight":
          span.style.backgroundColor = highlightColor;
          break;
        case "reset":
          span.style.fontWeight = "normal";
          span.style.textDecoration = "none";
          span.style.color = "#000000";
          span.style.backgroundColor = "transparent";
          break;
      }

      span.style.color = selectedColor;
      span.appendChild(range.extractContents());
      range.deleteContents();
      range.insertNode(span);
      selection.removeAllRanges();
    }
  };

  // Apply color to selection
  const applyColorToSelection = () => {
    applyStyleToSelection("color");
  };

  // Apply highlight to selection
  const applyHighlightToSelection = () => {
    applyStyleToSelection("highlight");
  };

  // Handle color change and apply to selection
  const handleColorChange = (color) => {
    setSelectedColor(color);
    applyColorToSelection();
  };

  // Handle highlight change and apply to selection
  const handleHighlightChange = (color) => {
    setHighlightColor(color);
    applyHighlightToSelection();
  };

  // Copy text to clipboard
  const handleCopyToClipboard = () => {
    if (editorRef.current) {
      const textToCopy = editorRef.current.innerHTML;
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Text copied to clipboard!");
      });
    }
  };

  // Initial editor setup with selected color
  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.innerHTML = `<span style="color: ${selectedColor};"></span>`;
    }
  }, []);

  // Define available colors and highlight colors
  const colors = [
    { name: "Red", hex: "#ff0000" },
    { name: "Green", hex: "#00ff00" },
    { name: "Blue", hex: "#0000ff" },
    { name: "Orange", hex: "#ff9900" },
    { name: "Purple", hex: "#9900ff" },
    { name: "Black", hex: "#000000" },
    { name: "Pink", hex: "#ff66b2" },
    { name: "Cyan", hex: "#33cccc" },
  ];

  const highlightColors = [
    { name: "Yellow", hex: "#ffff00" },
    { name: "Light Red", hex: "#ffcccb" },
    { name: "Light Green", hex: "#ccffcc" },
    { name: "Light Blue", hex: "#cce5ff" },
    { name: "Light Orange", hex: "#ffebcc" },
  ];

  return (
    <Container
      size="xl"
      className={`mt-8 relative ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Dark Mode Toggle */}
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Action Buttons for Bold, Underline, Reset, etc. */}
      <ActionButtons
        applyStyleToSelection={applyStyleToSelection}
        applyHighlightToSelection={applyHighlightToSelection}
      />

      {/* Text Editor */}
      <TextEditor handleInput={handleInput} ref={editorRef} darkMode={darkMode} />

      {/* Color and Highlight Palette */}
      <ColorPalette
        colors={colors}
        selectedColor={selectedColor}
        handleColorChange={handleColorChange}
        highlightColors={highlightColors}
        highlightColor={highlightColor}
        handleHighlightChange={handleHighlightChange}
      />

      {/* Copy Button */}
      <CopyButton handleCopyToClipboard={handleCopyToClipboard} />
      <Divider className="my-4" mt="lg" />
    </Container>
  );
};

export default TextInputArea;
