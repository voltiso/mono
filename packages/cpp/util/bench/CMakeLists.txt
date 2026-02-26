find_package(benchmark REQUIRED)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -march=native -mtune=native") # enable SSE/AVX/...

# set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -falign-functions=64 -falign-loops=64")

# Align blocks (e.g. `for` loop body) to 2^5 = 32 bytes for better SIMD performance
# (5 for AVX, 6 for AVX-512), seems 5 is enough
# add_link_options(-Wl,-mllvm,-align-all-blocks=6) # ⚠️ enable if using both SIMD and exceptions
# add_link_options(-Wl,-mllvm,-align-loops=5) # alternatively - only loops

# add_link_options(-Wl,-mllvm,-align-all-nofallthru-blocks=6)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fno-exceptions") # exceptions can be slow with SIMD
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fno-rtti")

add_executable(
  voltiso-util-bench
  bench.cpp

  singleton.bench.cpp
  # allocator.bench.cpp
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
