import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  loading: false,
};

/** createAsyncThunk
 * 1、可以注册，成为某个 nameSpace下的 异步方法
 * 2、可以拿到store的数据
 * 3、可以 dispatch 调取 任意的 nameSpace下里的方法
 * */
export const asyncIncrement = createAsyncThunk(
  "counter/asyncIncrement",
  async (params, thunkAPI) => {
    console.log("params", params, thunkAPI);
    const { getState, dispatch } = thunkAPI;
    const state = getState();
    console.log("state", state);
    // 普通的 action
    dispatch({
      type: "counter/incrementByAmount",
      payload: 1,
    });
    // // async action --貌似没法这么用？
    // await dispatch({
    //   type: "counter/asyncDecrement",
    // });

    // 本身的async action
    const res = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(20);
      }, 2000);
    });
    return res;
  }
);

export const asyncDecrement = createAsyncThunk(
  "counter/asyncDecrement",
  async (params, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    await new Promise(resolve => {
      setTimeout(() => {
        dispatch({ type: "counter/decrement" });
        resolve();
      }, 1000);
    });
    return "counter/asyncDecrement - ok";
  }
);

/**1、createSlice 是啥？
 * 是 Redux Toolkit 中的一个方法，用于简化 Redux 中的 reducer 和 action 的创建过程
 * */
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      console.log("action", action);
      state.value += 1;
    },
    decrement: state => {
      console.log("decrement - state", state);
      state.value -= 1;
    },
    // 总共就俩参数  state  action
    incrementByAmount: (state, action, ...rest) => {
      console.log("action", action, rest);
      state.value += action.payload;
    },
  },
  // 异步 :这里相当于自定义的loading 和 data
  // extraReducers: builder => {
  //   builder
  //     .addCase(asyncIncrement.pending, (state, action) => {
  //       state.loading = true;
  //       console.log("pending...");
  //     })
  //     .addCase(asyncIncrement.fulfilled, (state, action) => {
  //       state.value += action.payload;
  //       state.loading = false;
  //     });
  // },
  // 异步 :写法2
  extraReducers: {
    // 在这里添加处理额外 action types 的 reducers, 并且如果有需要的话，也在此处理加载状态
    [asyncIncrement.fulfilled]: (state, action) => {
      // 把用户添加到 state 数组中
      state.value += action.payload;
      state.loading = false;
    },
    [asyncIncrement.pending]: (state, action) => {
      // 把用户添加到 state 数组中
      state.loading = true;
    },
    [asyncIncrement.rejected]: (state, action) => {
      // 把用户添加到 state 数组中
      state.loading = false;
      console.error("err", action.payload);
    },
    [asyncDecrement.pending]: (state, action) => {
      console.log("asyncDecrement pending");
    },
    [asyncDecrement.fulfilled]: (state, action) => {
      console.log("asyncDecrement fulfilled", state);
    },
  },
});
//    reducer方法的每一个case都会生成一个Action
/**   2、为什么上边没定义action这里却使用action 且 跟 reducer同名？？、
 *    3、reducer  和 action 的区别
 *
 * 解释：reducer根据传入的旧状态和action，返回新状态。
 * action发出了做某件事的请求，只是描述了要做某件事，并没有去改变state来更新界面，
 * 真正处理这些请求并改变state来更新界面的，就是reducer。
 *
 * 这里的action里的方法，其实就是返回的： {type:'nameSpace/reducerName',paylod:{}}
 *
 * */
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;

console.log("counterSlice", counterSlice);
