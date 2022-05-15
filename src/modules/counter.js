// Ducks 패턴을 사용하여 액션 타입, 액션 생성 함수, 리듀서를 작성한 코드를 ‘모듈’이라고 합니다.
import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeEvery, takeLatest, select} from 'redux-saga/effects'

const INCREASE = 'conter/INCREASE'
const DECREASE = 'conter/DECREASE'

const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';


export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  yield delay(1000);
  yield put(increase());
  const number = yield select(state => state.counter);
  console.log(`현재 값은 ${number}입니다`)
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease())
}

export function* counterSaga() {
  // takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리해 줍니다.
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  // takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리하고
  // 가장마지막으로 실행된 작업만 수행합니다.
  yield takeLatest(DECREASE_ASYNC, decreaseSaga)
}

const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: state => state + 1,
    [DECREASE]: state => state - 1,
  },
  initialState
)

export default counter;