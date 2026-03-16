import { styled } from "@/src/styles/stitches";

export const SelectionTypeContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.75rem",

  fontSize: "1rem",
  fontWeight: "bold",

  background: "transparent",
  padding: "0.75rem",
  border: "2px solid transparent",
  borderRadius: "8px",

  cursor: "pointer",
  transition: "all 0.5s",

  variants: {
    isActive: {
      true: {
        background: "$blue100",
        borderColor: "$blue500",
        color: "$blue600",
      },
      false: {
        border: "2px solid $slate300",
        color: "$slate500",
        "&:hover": {
          borderColor: "$slate400",
        },
      },
    },
  },
});
