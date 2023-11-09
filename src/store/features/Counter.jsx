import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncDecrement,
  asyncIncrement,
  decrement,
  incrementByAmount,
} from "./counterSlice";

export function Counter() {
  const { value: countNumber, loading } = useSelector(state => state.counter); //useSelector 这是什么东西？-是用来获取 store离得数据？
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        {/* sync  */}
        <button
          aria-label="Increment value"
          onClick={() => {
            /** 方法1： 这个是toolKit官网推荐的调用方式。
             *  值得注意的是：这里的increment()方法实际不是reducer里定义的，用来处理state的纯函数
             *  实际就是toolKit 的 createSlice方法处理后的action里的新函数，她其实就是：见方法2
             * */
            //  dispatch(increment())

            // 方法2：实际上呢，action里的increment()返回就是方法2里传给dispatch的东西。这样就跟dva一样了。
            dispatch({
              type: "counter/increment",
              payload: {
                addNumber: 10,
              },
            });
          }}
        >
          Increment
        </button>
        <span>{countNumber}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        {/* sync 传参 */}
        <button
          onClick={() => {
            // 方法1：
            dispatch(incrementByAmount(3));
            // // 方法2：
            // dispatch({
            //   type: "counter/incrementByAmount",
            //   payload: 3,
            // });
          }}
        >
          increment By Amount
        </button>

        <button
          disabled={loading}
          onClick={() => {
            dispatch(asyncIncrement({ params01: "111" }));
          }}
          // disabled={loading}
        >
          async increment
        </button>

        <button
          onClick={() => {
            dispatch(asyncDecrement());
            // counter/asyncDecrement
          }}
        >
          async decrement
        </button>

        <button
          onClick={async () => {
            await dispatch(asyncIncrement());
            await dispatch(asyncDecrement());
          }}
        >
          async increment 、 async decrement
        </button>
      </div>
    </div>
  );
}
