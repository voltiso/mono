set(CMAKE_C_COMPILER "clang-22")
set(CMAKE_CXX_COMPILER "clang++-22")

set(CMAKE_CXX_FLAGS "-stdlib=libc++" CACHE STRING "")
set(CMAKE_EXE_LINKER_FLAGS "-stdlib=libc++ -fuse-ld=lld-22" CACHE STRING "")
set(CMAKE_SHARED_LINKER_FLAGS "-stdlib=libc++ -fuse-ld=lld-22" CACHE STRING "")
set(CMAKE_CXX_COMPILER_ID "Clang")

# -----------------------------------------------------------------------------
# WORKAROUNDS: External Library Compatibility
# -----------------------------------------------------------------------------

# Fix for Google Benchmark: Clang 22 treats __COUNTER__ as a C2y extension.
# Since Benchmark uses -Werror and -pedantic, we must ignore these specifically.
string(APPEND CMAKE_CXX_FLAGS " -Wno-c2y-extensions -Wno-error=c2y-extensions")
string(APPEND CMAKE_C_FLAGS " -Wno-c2y-extensions -Wno-error=c2y-extensions")
