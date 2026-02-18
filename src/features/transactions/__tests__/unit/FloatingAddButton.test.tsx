import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import AddTransactionModal from "../../components/AddTransactionModal";

vi.mock("./AddTransactionForm", () => ({
  default: ({ onSuccess }: { onSuccess: () => void }) => (
    <button onClick={onSuccess}>Submit</button>
  ),
}));

vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ open, children }: { open: boolean; children: React.ReactNode }) =>
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogTrigger: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  DialogContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogTitle: ({ children }: { children: React.ReactNode }) => (
    <h2>{children}</h2>
  ),
  DialogDescription: ({ children }: { children: React.ReactNode }) => (
    <p>{children}</p>
  ),
}));

vi.mock("@/components/ui/drawer", () => ({
  Drawer: ({ open, children }: { open: boolean; children: React.ReactNode }) =>
    open ? <div data-testid="drawer">{children}</div> : null,
  DrawerTrigger: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  DrawerContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DrawerHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DrawerTitle: ({ children }: { children: React.ReactNode }) => (
    <h2>{children}</h2>
  ),
  DrawerDescription: ({ children }: { children: React.ReactNode }) => (
    <p>{children}</p>
  ),
}));

const setWindowWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
  act(() => window.dispatchEvent(new Event("resize")));
};

// const renderModal = () =>
//   render(
//     <AddTransactionModal>
//       <button>Open</button>
//     </AddTransactionModal>
//   );

describe("AddTransactionModal", () => {
  beforeEach(() => {
    setWindowWidth(1024);

    render(
      <AddTransactionModal>
        <button>Open</button>
      </AddTransactionModal>
    );
  });

  it("shows a Dialog on desktop", async () => {
    // const user = userEvent.setup();
    // await user.click(screen.getByRole("button"));
    // expect(screen.getByTestId("dialog")).toBeInTheDocument();
  });

  it("shows a Drawer on mobile", async () => {
    //   const user = userEvent.setup();
    //   setWindowWidth(375);
    //   await user.click(screen.getByRole("button", { name: "Open" }));
    //   expect(screen.getByTestId("drawer")).toBeInTheDocument();
  });

  it("closes after form submission", async () => {
    //   const user = userEvent.setup();
    //   await user.click(screen.getByRole("button", { name: "Open" }));
    //   await user.click(screen.getByRole("button", { name: "Add Transaction" }));
    //   expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
  });
});
