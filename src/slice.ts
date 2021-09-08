import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlowElement } from "react-flow-renderer";
import { RootState } from "./store";

interface State {
  selected: FlowElement | null;
}

const initialState: State = {
  selected: null
};

export const slice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    select: (state: State, action: PayloadAction<FlowElement>) => {
      state.selected = action.payload;
    }
  }
});

export const { select } = slice.actions;
export const selectState = (state: RootState) => state.flow;

export default slice.reducer;
