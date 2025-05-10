cmake_minimum_required(VERSION 3.18 FATAL_ERROR)

# Setup vcpkg script with CMake (note: should be placed before project() call)
set(CMAKE_TOOLCHAIN_FILE
	${CMAKE_CURRENT_SOURCE_DIR}/vcpkg/scripts/buildsystems/vcpkg.cmake
	CACHE STRING "Vcpkg toolchain file")

project(voltiso)

set(VOLTISO_NAMESPACE "v" CACHE STRING "Change from `v` to `voltiso` if you have have namespace conflicts")
add_compile_definitions(VOLTISO_NAMESPACE=${VOLTISO_NAMESPACE})

# include_directories(include packages/poker/include)

# GoogleTest requires at least C++14
set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# enable warnings
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra -Werror -Wfatal-errors -Wno-unused-parameter -Winvalid-pch") # -Wshadow
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wno-changes-meaning -Wno-unknown-warning-option") # -Wshadow

set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -Wno-unused-parameter -Wno-unused-variable -Wno-unused-function")
set(CMAKE_CXX_FLAGS_RELWITHDEBINFO "${CMAKE_CXX_FLAGS_RELWITHDEBINFO} -Wno-unused-parameter -Wno-unused-variable -Wno-unused-function")

# set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -D_GLIBCXX_DEBUG")
# set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -D_GLIBCXX_DEBUG_BACKTRACE")
include_directories(util/include)

find_package(gflags REQUIRED)
find_package(glog REQUIRED)
find_package(cpptrace REQUIRED)

# set(CMAKE_VERBOSE_MAKEFILE ON)

# set(CMAKE_BUILD_PARALLEL_LEVEL 1)

# add_link_options("-fuse-ld=gold") # default crashes? OOM?

# cpptrace find_package(cpptrace REQUIRED)
add_subdirectory(util)

#
enable_testing()

# google test
find_package(GTest REQUIRED)
include(GoogleTest)

# add_subdirectory(util)
add_executable(
	voltiso-util-test
	test.cpp

	util/test/Singleton.test.cpp
	util/test/Options.test.cpp
	util/test/Object.test.cpp
	util/test/Entry.test.cpp
	util/test/context.test.cpp
	util/test/is_trivially_relocatable.test.cpp
	util/test/Options.test.cpp
	util/test/Handle.test.cpp
	util/test/Pool.test.cpp
	util/test/Owned.test.cpp
	util/test/Shared.test.cpp
	util/test/Any.test.cpp
	util/test/Function.test.cpp
	util/test/BitArray.test.cpp
	util/test/HashMap.test.cpp
	util/test/HashSet.test.cpp
	util/test/SplayMap.test.cpp
	util/test/SplaySet.test.cpp
	util/test/Heap.test.cpp
	util/test/Runner.test.cpp
	util/test/Subject.test.cpp
	util/test/DynamicArray.test.cpp
	util/test/RawArray.test.cpp
	util/test/ConstStringSlice.test.cpp
	util/test/Path.test.cpp
	util/test/Slice.test.cpp
	util/test/Array.test.cpp
	util/test/String.test.cpp
	util/test/Storage.test.cpp

	# util/test/State.test.cpp # TODO

	# util/test/_InPlace.test.cpp # deprecated for now
)

# google benchmark
find_package(benchmark REQUIRED)
target_link_libraries(voltiso-util-test benchmark::benchmark glog::glog
	GTest::gtest cpptrace::cpptrace)
target_link_libraries(voltiso-util-test debug stdc++exp)

# GTest::gtest_main benchmark::benchmark_main
gtest_discover_tests(voltiso-util-test)

# benchmark add_subdirectory(bench)

# testing add_subdirectory(test)
