import { Button, CRedirectButton } from "@src/components/root/button";
import { EFieldType, IField } from "@src/types/root/c-view-table-dynamic";
import { Select } from "antd";

export const fieldHandler = (field: IField) => {
  switch (field.type) {
    case EFieldType.LABEL: {
      if ("label" in field.payload) {
        return <p>{field.payload.label}</p>;
      }
    }
    case EFieldType.BUTTON_CTA: {
      if (
        "btnText" in field.payload &&
        "colorSchema" in field.payload &&
        "isArrow" in field.payload &&
        "clickHandler" in field.payload
      ) {
        const { btnText, colorSchema, isArrow, clickHandler } = field.payload;
        return (
          <div className={`flex justify-center items-center`}>
            <Button
              btnText={btnText}
              colorSchema={colorSchema}
              isArrow={isArrow}
              clickHandler={clickHandler}
            />
          </div>
        );
      }
    }
    case EFieldType.BUTTON_REDIRECT: {
      if (
        "btnText" in field.payload &&
        "colorSchema" in field.payload &&
        "redirectLink" in field.payload
      ) {
        const { btnText, colorSchema, isArrow, redirectLink } = field.payload;
        return (
          <div className={`flex justify-center items-center`}>
            <CRedirectButton
              btnText={btnText}
              colorSchema={colorSchema}
              isArrow={isArrow}
              redirectLink={redirectLink}
              isOpenNewTab={false}
            />
          </div>
        );
      }
    }
    case EFieldType.OPTION: {
      if ("options" in field.payload && "handler" in field.payload) {
        const { options, handler } = field.payload;
        const generateOptions: { value: string; label: string }[] = options.map(
          (option) => {
            return {
              value: option.userId,
              label: option.userName,
            };
          }
        );
        return (
          <div className={`flex justify-center items-center`}>
            <Select
              defaultValue={generateOptions[0].value}
              style={{ width: 120 }}
              onChange={handler}
              options={generateOptions}
              className="font-bold"
            />
          </div>
        );
      }
    }
  }
};
