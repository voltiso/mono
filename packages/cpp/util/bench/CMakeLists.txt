find_package(benchmark REQUIRED)

# add_compile_options(-fno-exceptions) # !
add_executable(
  voltiso-util-bench
  bench.cpp

  allocator.bench.cpp
  # array.bench.cpp
  # dynamic-array.bench.cpp
  # owned.bench.cpp
  # shared.bench.cpp
  # function.bench.cpp
  # heap.bench.cpp
  # hash-set.bench.cpp
  # map.bench.cpp
)

target_link_libraries(voltiso-util-bench benchmark::benchmark gflags::gflags glog::glog
  cpptrace::cpptrace)

# target_link_libraries(voltiso-util-bench debug stdc++exp)
