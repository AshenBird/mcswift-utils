/**
 * @description 该函数的目的是帮助用户线性的解决 promise 的错误处理
 * 为了方便用户对结果进行解构，并减少不必要的类型检查，我们将返回值索引 1 的类型，断言为传入 promise 的结果类型。
 * 请通过索引 0 的存在性判断是否错误
 * @param promise 一个仁义的 Promise 对象
 * @returns 返回一个元组，索引 0 为捕捉到的异常，索引 1 为正常的结果
 */
export const safeAwait = async <Result = unknown>(
  promise: Promise<Result>
): Promise<SafeResult<Result>> => {
  try {
    const result = await promise
    return [
      null,
      result
    ]

  } catch (error) {
    return [
      error,
      null as Result
    ]
  }
}

export const safeCall = <Args extends any[] = any[], Result extends unknown = unknown>(
  func: (...args: Args) => Result,
  params: Args
): SafeResult<Result> => {
  try {
    const result = func(...params)
    return [null, result]
  } catch (e) {
    return [e, null as Result]
  }
}

export const safeAsyncCall = async <Args extends any[] = any[], Result extends unknown = unknown>(
  func: (...args: Args) => Promise<Result>,
  params: Args
): Promise<SafeResult<Result>> => {
  try {
    const result = await func(...params)
    return [null, result]
  } catch (e) {
    return [e, null as Result]
  }
}

export type SafeResult<Result> = [
  error: null,
  result: Result
] | [
  error: Exclude<any, null>,
  result: Result
]