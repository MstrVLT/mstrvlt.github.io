---
title: event hooks with mitt
date: 2025-03-08
author: vlt
noreadmore: true
---

Sometimes, you need to call functions from one component in another. A common solution is to use defineExpose, and some libraries, like PrimeVue, rely on it. But is there a better way?

For example, you can use useEventBus from the VueUse library or try the mitt library with a simple wrapper.

```ts
import { getCurrentScope, onScopeDispose } from 'vue'
import mitt, { type EventType, Handler } from 'mitt'

const emitter = mitt()

export function useBus(name: EventType = Symbol()) {

  const onResult = (fn: Handler<unknown>) => {
    emitter.on(name, fn);
    const offFn = () => emitter.off(name, fn)
    if (getCurrentScope()) {
        onScopeDispose(offFn);
    }
    return {
        off: offFn,
    };
  };

  const call = (n: EventType, e: unknown) => emitter.emit(n, e)
  
  return { name, call, onResult }
}
```
[example](https://play.vuejs.org/#eNqdVE1v2zAM/SuCL3EA197QnbKk69p12HbYhqVHX1xHSt3IkiFRaYoi/32k5K8EQRcsQBLLJB8fHym+Rp+bJt06Hs2iuS1N1QCzHFzDZKHWizwCm0dXuarqRhtgr8xwwfZMGF2zCYZNRiZn+Y2zvTXNSo0mWzxInoIdPG8fK7nqnfyJGKBDrkqtLGGVhZQJ0+oPt04CYi5a+HhitIbJlJw7cxyvCiimbHHFXnPFGIFoTCr1unVPmPfI1R6/IUdJeZeP+hmhsagYjONonGdBBawZD8DrRhbA8cTY/MEBaMWuS1mVG9SGSMYTD4QZJsAtESO5GH7oyCi7j81CcAAKCmwvKkEoHRGMnAc50Gue9bmjJDpQElvVa77mcOuM4QqWpW44SeYfvlQWA/jpVtUVQILB8NJwdrfF4Ht8Sti3Qq0kN30Q+Y26wumM5oUHiH0L+M4jCqdKqFCbtkmqqPlsgMaQ5Uv9oGU8nVKLuibB0OEFi4WadRTmTm2UflZXQ1NZlz/VyuMnTKjpx2BqwYT4qgjJR/XuQgz+wb0SLD5SrmVGVvocyhh75C7ZPvwZvCZGHQQJMQskktbTR9DvUDENDXHEYkfSo1ptyQfc6T9WaPbE6dtlZaGk43uCE47jEvp8URdN+mS1woHxLPPWgFd61vHOI0pFL/LoEaCxsyxzqtmsU5y5jGzXl+m79H22qiz4c1o/2U+1XjnJ88jXF5KCxQJFtT5KSaNbYUt/NTQgh6mRvH7+4d/R9WtVoyvBy82J9092F5j+Ntxys0UCvQ0Kgy0N5rvlT77D597Y0X3DiApq6YhjcLtxfhJHfp7td69gpdb39m4HXNmuKCLq1fD+eYQ37vaN0ge6l+mHkYr9Ojx3If9z6561VMMSO3+rdktvtFb/Z3eG5Xxyc/oMR6tztBRzFe3/AjezQzU=)

---