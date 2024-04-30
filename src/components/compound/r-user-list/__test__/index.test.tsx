import { render, screen } from "@testing-library/react";
import { RUserList } from "..";
import { EDataTestId } from "@src/types/common";

describe("When UserList has rendered", () => {
  it("Expect render successfully", async () => {
    const { getByTestId } = render(await RUserList()); // ARRANGE
    const myElement = getByTestId(EDataTestId.rUserList);
    // const myElement = screen.getByTestId(EDataTestId.rUserList);
    expect(myElement).toMatchSnapshot();
  });
});
