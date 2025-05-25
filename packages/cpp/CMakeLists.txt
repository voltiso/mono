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

  util/test/retainer.test.cpp
  util/test/hash.test.cpp
  util/test/entry.test.cpp
  util/test/singleton.test.cpp
  util/test/options.test.cpp
  util/test/object.test.cpp
  util/test/context.test.cpp
  util/test/is-trivially-relocatable.test.cpp
  util/test/is-instantiated-from-same.test.cpp
  util/test/is-derived-from-template.test.cpp
  util/test/options.test.cpp
  util/test/handle.test.cpp
  util/test/owned.test.cpp
  util/test/shared.test.cpp
  util/test/any.test.cpp
  util/test/any-function.test.cpp
  util/test/bit-array.test.cpp
  util/test/hash-map.test.cpp
  util/test/hash-set.test.cpp
  util/test/splay-map.test.cpp
  util/test/splay-set.test.cpp
  util/test/heap.test.cpp
  util/test/dynamic-array.test.cpp
  util/test/raw-array.test.cpp
  util/test/const-string-slice.test.cpp
  util/test/path.test.cpp
  util/test/slice.test.cpp
  util/test/string.test.cpp
  util/test/storage.test.cpp
  util/test/runner.test.cpp
  util/test/pool.test.cpp
  util/test/array.test.cpp
  util/test/subject.test.cpp

  # util/test/state.test.cpp # TODO

  # util/test/_in-place.test.cpp # deprecated for now
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
