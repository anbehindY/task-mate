import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="grid place-items-center h-full">
      <CircularProgress />
    </div>
  );
}
