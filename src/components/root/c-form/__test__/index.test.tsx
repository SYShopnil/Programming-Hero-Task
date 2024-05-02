import { render, screen } from "@testing-library/react";
import { EDataTestId } from "@src/types/common";
import { CForm } from "..";
import { FormElementEnum, IForm } from "@src/types/root/c-form";
import { BtnColorSchema } from "@src/types/root";
import { mockProps } from "../_mock_data";

describe("When Form  has rendered", () => {
  it("Expect it renders successfully", () => {
    const { getByTestId } = render(<CForm {...mockProps} />);
    const myElement = getByTestId(EDataTestId.CForm);
    // const myElement = screen.getByTestId(EDataTestId.CIconWithHandlerButtonContainer);
    expect(myElement).toMatchSnapshot();
  });
});
