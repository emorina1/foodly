import React from "react";
import { render, screen } from "@testing-library/react";
import { Rocket } from "lucide-react";
import Card from "@/components/shared/Card";
import "@testing-library/jest-dom"; // for toBeInTheDocument()
import { describe, it } from "node:test";

describe("BlogCard", () => {
  it("duhet të shfaqë titullin dhe përmbajtjen e blogut", () => {
    render(
      <Card
        icon={<Rocket />}
        title="Titulli I Blogut"
        description="Përmbajtja e blogut këtu"
      />
    );

    // Kontrollo që titulli dhe përmbajtja të jenë në dokument
    expect(screen.getByText("Titulli I Blogut")).toBeInTheDocument();
    expect(screen.getByText("Përmbajtja e blogut këtu")).toBeInTheDocument();
  });
});
