Show disassembly for functions containing `ingleton.*instance` in their names:

```bash
llvm-objdump-22 -d --demangle build/clang-22_Release/util/bench/voltiso-util-bench | awk -v RS= '/<.*ingleton.*instance.*>:/'
```
