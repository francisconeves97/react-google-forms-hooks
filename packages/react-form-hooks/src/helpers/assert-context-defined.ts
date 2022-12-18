import { useGoogleFormContext } from "../context/google-form-context";

type Context = ReturnType<typeof useGoogleFormContext>;

function assertContextDefined(
  context: Context
): asserts context is NonNullable<Context> {
  if (context === null) {
    throw new Error("You need to wrap your form with a GoogleFormProvider");
  }
}

export { assertContextDefined };
