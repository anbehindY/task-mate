import { TextField } from "@mui/material";
import { FieldHookConfig, useField } from "formik";

type CustomFieldProps = {
  label: string;
  validator?: (value: string) => string | undefined;
};

export default function CustomTextField({
  label,
  validator,
  ...props
}: CustomFieldProps & FieldHookConfig<string>) {
  const [field, meta] = useField<string>({
    ...props,
    validate: validator,
  });

  return (
    <>
      <TextField
        id={props.id}
        {...field}
        label={label}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        fullWidth
      />
    </>
  );
}
