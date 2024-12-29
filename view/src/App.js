import { useEffect, useRef, useState } from "react"

/**
 * throttle factory
 */
function makeThrottle(func, delay, tidRef = { current: null }) {
  let lastCall = -Infinity

  return function (...args) {
    const now = Date.now()
    const delta = now - lastCall

    if (delta >= delay) {
      lastCall = now
      tidRef.current = null
      func(...args)
    } else {
      clearTimeout(tidRef.current)
      tidRef.current = setTimeout(() => {
        lastCall = Date.now()
        tidRef.current = null
        func(...args)
      }, delay - delta)
    }
  }
}

/**
 * create a throttled callback func
 * for use within react components.
 */
function useThrottledFunc(func, delay) {
  const [result, setResult] = useState(null)
  const tidRef = useRef(null)

  useEffect(() => {
    setResult(() => makeThrottle(func, delay, tidRef))
    // eslint-disable-next-line
    return () => clearTimeout(tidRef.current)
  }, [func, delay])

  return result
}

/**
 * build up the response data in the background
 * without induce frequent rerenders to the ux.
 *
 * rely on callback to induce rerenders.
 */
function useEventStream(ep, cb) {
  const msgRef = useRef("")
  useEffect(() => {
    const sse = new EventSource(ep)
    sse.onmessage = (e) => {
      msgRef.current += ` ${e.data}`
      cb(msgRef.current)
    }
    return () => {
      sse.close()
    }
  }, [ep, cb])
}

function App() {
  // track rendered message,
  // only source of rerenders:
  const [aggMsg, setAggMsg] = useState("")

  // prevent func from executing more than
  // once per second, regardless of how often
  // it is invoked by the event-stream effect:
  const throttledFunc = useThrottledFunc(setAggMsg, 1000)

  // track event stream from server over time, rely on
  // throttle to induce rerenders only once per second:
  useEventStream("http://localhost:8080", throttledFunc)

  return (
    <div>
      <div>{aggMsg}</div>
    </div>
  )
}

export default App
