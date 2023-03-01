import React, { JSXElementConstructor } from "react";
import { fireEvent, screen, act } from "@testing-library/react";
import { GoogleFormProvider } from "../src/context/google-form-context";
import { vi } from "vitest";
import { useGoogleForm } from "../src/use-google-form";
import { GoogleForm } from "@gforms-js/types";

const getContextWrapper = (props: any = {}) =>
  function ContextWrapper({ children }: { children?: React.ReactNode }) {
    return <GoogleFormProvider {...props}>{children}</GoogleFormProvider>;
  };

const mockGetField = vi.fn();

const createMockGoogleFormWrapper = ({
  onSubmit,
}: {
  onSubmit: (data: object) => void;
}) => {
  return ({ children }: { children?: React.ReactNode }) => {
    const methods = useGoogleForm({ form: {} as GoogleForm });
    const GoogleFormContext = getContextWrapper({
      ...methods,
      getField: mockGetField,
    });

    return (
      <GoogleFormContext>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {children}
          <button type="submit">submit</button>
        </form>
      </GoogleFormContext>
    );
  };
};

const MockGoogleFormComponent: JSXElementConstructor<any> = ({
  children,
  onSubmit,
}: {
  children?: React.ReactNode;
  onSubmit: (data: object) => void;
}) => {
  const methods = useGoogleForm({ form: {} as GoogleForm });
  const GoogleFormContext = getContextWrapper({
    ...methods,
    getField: mockGetField,
  });

  return (
    <GoogleFormContext>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
        <button type="submit">submit</button>
      </form>
    </GoogleFormContext>
  );
};

const submitForm = async () => {
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "submit" }));
  });
};

export {
  getContextWrapper,
  mockGetField,
  MockGoogleFormComponent,
  submitForm,
  createMockGoogleFormWrapper,
};
