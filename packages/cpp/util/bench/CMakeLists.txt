find_package(benchmark REQUIRED)

# add_compile_options(-fno-exceptions) # !
add_executable(
	voltiso-util-bench
	bench.cpp

	allocator.bench.cpp
	Array.bench.cpp
	DynamicArray.bench.cpp
	HashSet.bench.cpp
	map.bench.cpp
)

target_link_libraries(voltiso-util-bench benchmark::benchmark gflags::gflags glog::glog
	cpptrace::cpptrace)

# target_link_libraries(voltiso-util-bench debug stdc++exp)
