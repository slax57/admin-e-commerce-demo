import { NumberField, RaRecord, useRecordContext } from "react-admin";

export const NumberFunctionField = (props: {
  render: (record: RaRecord) => number;
  options: {
    style: string;
    currency: string;
  };
}) => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <NumberField
      options={props.options}
      record={{ data: props.render(record) }}
      source="data"
    />
  );
};
