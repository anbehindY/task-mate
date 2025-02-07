import { TaskArrayType } from "@/types";
import { AddCircleOutline, DeleteForeverOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FieldArray, Form, getIn, useFormikContext } from "formik";

export default function DynamicForm() {
  const {
    values,
    handleBlur,
    handleChange,
    touched,
    errors,
    setFieldValue,
    resetForm,
  } = useFormikContext<TaskArrayType>();

  return (
    <Form className="w-full mt-4 relative">
      <FieldArray name="tasks">
        {({ push, remove }) => (
          <Box className="grid grid-cols-2 gap-x-4 gap-y-24 place-items-center">
            {values.tasks.map((_, index) => (
              <Box key={index} className="flex flex-col gap-8 w-full max-w-md">
                <TextField
                  fullWidth
                  id={`tasks.${index}.taskName`}
                  name={`tasks.${index}.taskName`}
                  label="Task Name"
                  value={values["tasks"][index].taskName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    getIn(touched, `tasks.${index}.taskName`) &&
                    Boolean(getIn(errors, `tasks.${index}.taskName`))
                  }
                  helperText={
                    getIn(touched, `tasks.${index}.taskName`) &&
                    getIn(errors, `tasks.${index}.taskName`)
                  }
                />
                <TextField
                  fullWidth
                  id={`tasks.${index}.assignee`}
                  name={`tasks.${index}.assignee`}
                  label="Assignee"
                  value={values.tasks[index].assignee}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    getIn(touched, `tasks.${index}.assignee`) &&
                    Boolean(getIn(errors, `tasks.${index}.assignee`))
                  }
                  helperText={
                    getIn(touched, `tasks.${index}.assignee`) &&
                    getIn(errors, `tasks.${index}.assignee`)
                  }
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    name={`tasks.${index}.dueDate`}
                    value={values.tasks[index].dueDate}
                    label="Due Date"
                    format="DD/MM/YYYY HH:mm"
                    onChange={(date) =>
                      setFieldValue(`tasks.${index}.dueDate`, date, true)
                    }
                    slotProps={{
                      textField: {
                        error:
                          getIn(touched, `tasks.${index}.dueDate`) &&
                          Boolean(getIn(errors, `tasks.${index}.dueDate`)),
                        helperText:
                          getIn(touched, `tasks.${index}.dueDate`) &&
                          getIn(errors, `tasks.${index}.dueDate`),
                      },
                    }}
                  />
                </LocalizationProvider>

                <FormControl
                  error={
                    getIn(touched, `tasks.${index}.priority`) &&
                    Boolean(getIn(errors, `tasks.${index}.priority`))
                  }
                >
                  <InputLabel id={`tasks.${index}.priority`}>
                    Priority
                  </InputLabel>
                  <Select
                    labelId={`tasks.${index}.priority`}
                    id={`tasks.${index}.priority`}
                    name={`tasks.${index}.priority`}
                    defaultValue="Medium"
                    value={values.tasks[index].priority}
                    label="Priority"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      getIn(touched, `tasks.${index}.priority`) &&
                      Boolean(getIn(errors, `tasks.${index}.priority`))
                    }
                  >
                    <MenuItem value={"Low"}>Low</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                  </Select>
                  <FormHelperText>
                    {getIn(touched, `tasks.${index}.priority`) &&
                      getIn(errors, `tasks.${index}.priority`)}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  error={
                    getIn(touched, `tasks.${index}.status`) &&
                    Boolean(getIn(errors, `tasks.${index}.status`))
                  }
                >
                  <FormLabel id={`tasks.${index}.status`}>Status</FormLabel>
                  <RadioGroup
                    aria-labelledby={`tasks.${index}.status`}
                    id={`tasks.${index}.status`}
                    name={`tasks.${index}.status`}
                    value={values.tasks[index].status}
                    onChange={handleChange}
                    row={true}
                  >
                    <FormControlLabel
                      value="To Do"
                      control={<Radio />}
                      label="To Do"
                    />
                    <FormControlLabel
                      value="In Progress"
                      control={<Radio />}
                      label="In Progress"
                    />
                    <FormControlLabel
                      value="In Review"
                      control={<Radio />}
                      label="In Review"
                    />
                  </RadioGroup>
                  <FormHelperText>
                    {getIn(touched, `tasks.${index}.status`) &&
                      getIn(errors, `tasks.${index}.status`)}
                  </FormHelperText>
                </FormControl>
                {values.tasks.length > 1 && (
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    onClick={() => remove(index)}
                  >
                    <DeleteForeverOutlined fontSize="large" />
                  </Button>
                )}
              </Box>
            ))}
            <Button
              type="button"
              variant="outlined"
              sx={{ borderStyle: "dotted", width: "450px", height: "500px" }}
              onClick={() =>
                push({
                  taskName: "",
                  assignee: "",
                  dueDate: null,
                  priority: "",
                  status: "",
                  completed: false,
                })
              }
            >
              <AddCircleOutline className="mr-4" fontSize="large" />
              Add more
            </Button>
          </Box>
        )}
      </FieldArray>
      <div className="flex justify-end mt-12 pr-10 w-full gap-4">
        <Button
          type="button"
          variant="contained"
          color="inherit"
          onClick={() => resetForm()}
        >
          Reset
        </Button>
        <Button type="submit" variant="contained" color="primary" size="large">
          Submit
        </Button>
      </div>
    </Form>
  );
}
