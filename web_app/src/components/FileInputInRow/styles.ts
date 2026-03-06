import { styled } from "@/src/styles/stitches";

export const FileInputLabel = styled("label", {
  padding: "1rem",
  border: "1px solid $slate300",
  borderRadius: "8px",

  width: "100%",
});

export const FileInputContent = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  width: "100%",

  div: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",

    header: {
      display: "flex",
      alignItems: "center",
      padding: "0.25rem",
      borderRadius: "4px",
    },

    footer: {
      fontSize: "0.75rem",
      color: "$slate500",
    },
  },

  p: {
    fontSize: "1rem",
    color: "$slate800",
  },

  ">span": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    padding: "0.5rem",
    gap: "1rem",
    fontWeight: 600,

    background: "$white",
    border: "1px solid $slate300",
    borderRadius: "8px",
    outline: 0,
    transition: "0.2s color",
    cursor: "pointer",

    "&:hover": {
      background: "$slate100",
    },
  },
});

export const FileInputStyle = styled("input", {
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
});
