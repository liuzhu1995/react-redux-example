import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectorCount, selectorUser, increment, decrement, fetchUserById } from "./counterSlice";

// const Counter = ({ dispatch, count }) => {
const Counter = () => {
  // const [count, setCount] = useState(0);
  const count = useSelector(selectorCount);
  const user = useSelector(selectorUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserById(1));
  }, [dispatch])
  console.log(user, 'user');
  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={() => dispatch(increment())}>Increment</button>
      <button type="button" onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  )
}

export default Counter;