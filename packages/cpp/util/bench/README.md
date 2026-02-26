Show disassembly for functions containing `maybeInitialize` in their names:

```bash
llvm-objdump-20 -d --demangle build/clang-20_Release/util/bench/voltiso-util-bench | awk -v RS= '/<.*maybeInitialize.*>:/'
```
